const RepairRequest = require("../models/RepairRequest");

const getNearbyRepairRequests = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radius = 20,
      category,
      page = 1,
      limit = 10,
    } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    const radiusKm = Number(radius);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const filter = {
      status: "pending",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radiusKm * 1000,
        },
      },
    };

    if (category) {
      filter.category = category;
    }

    const requests = await RepairRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select(
        "title description category images address location preferredDate preferredTime status createdAt"
      );

    const total = await RepairRequest.countDocuments({
      status: "pending",
      ...(category ? { category } : {}),
    });

    res.status(200).json({
      success: true,
      message: "Nearby repair requests fetched successfully",
      data: {
        requests,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Nearby repair requests error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getTechnicianRepairRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RepairRequest.findOne({
      _id: id,
      status: "pending",
    }).populate(
      "customer",
      "name phone profileImage"
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found or no longer available",
      });
    }

    res.status(200).json({
      success: true,
      message: "Repair request details fetched successfully",
      data: {
        request,
      },
    });
  } catch (error) {
    console.error(
      "Technician repair request details error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const acceptRepairRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RepairRequest.findOne({
      _id: id,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found or already assigned",
      });
    }

    request.selectedTechnician = req.user._id;
    request.status = "assigned";

    await request.save();

    const updatedRequest = await RepairRequest.findById(request._id)
      .populate("customer", "name email phone profileImage")
      .populate(
        "selectedTechnician",
        "name email phone profileImage businessName"
      );

    res.status(200).json({
      success: true,
      message: "Repair request accepted successfully",
      data: {
        request: updatedRequest,
      },
    });
  } catch (error) {
    console.error("Accept repair request error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const rejectRepairRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const request = await RepairRequest.findOne({
      _id: id,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found or already assigned",
      });
    }

    res.status(200).json({
      success: true,
      message: "Repair request rejected successfully",
      data: {
        requestId: request._id,
        rejectedBy: req.user._id,
        reason: reason?.trim() || "Rejected by technician",
      },
    });
  } catch (error) {
    console.error("Reject repair request error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  // existing functions...
  getNearbyRepairRequests,
  getTechnicianRepairRequestById,
    acceptRepairRequest,
      rejectRepairRequest,


};