const RepairRequest = require("../models/RepairRequest");

const createRepairRequest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      address,
      latitude,
      longitude,
      preferredDate,
      preferredTime,
    } = req.body;

    // Required fields
    if (
      !title ||
      !description ||
      !category ||
      !address ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category, address, latitude and longitude are required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    // Validate coordinates
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude",
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: "Invalid longitude",
      });
    }

    const repairRequest = await RepairRequest.create({
      customer: req.user._id,

      title: title.trim(),

      description: description.trim(),

      category: category.trim(),

      images: [],

      address: address.trim(),

      location: {
        type: "Point",
        coordinates: [lng, lat],
      },

      preferredDate: preferredDate || null,

      preferredTime: preferredTime || null,

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Repair request created successfully",
      data: {
        request: repairRequest,
      },
    });
  } catch (error) {
    console.error("Create repair request error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getMyRepairRequests = async (req, res) => {
  try {
    const requests = await RepairRequest.find({
      customer: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate(
        "customer",
        "name email phone profileImage"
      )
      .populate(
        "selectedTechnician",
        "name email phone profileImage"
      );

    res.status(200).json({
      success: true,
      message: "Repair requests fetched successfully",
      count: requests.length,
      data: {
        requests,
      },
    });
  } catch (error) {
    console.error(
      "Get my repair requests error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getRepairRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RepairRequest.findOne({
      _id: id,
      customer: req.user._id,
    })
      .populate(
        "customer",
        "name email phone profileImage"
      )
      .populate(
        "selectedTechnician",
        "name email phone profileImage"
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Repair request fetched successfully",
      data: {
        request,
      },
    });
  } catch (error) {
    console.error(
      "Get repair request by id error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const updateRepairRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      address,
      latitude,
      longitude,
      preferredDate,
      preferredTime,
    } = req.body;

    const request = await RepairRequest.findOne({
      _id: id,
      customer: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
      });
    }

    // Only pending requests can be updated
    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending repair requests can be updated",
      });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }

      request.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          success: false,
          message: "Description cannot be empty",
        });
      }

      request.description = description.trim();
    }

    if (category !== undefined) {
      request.category = category.trim();
    }

    if (address !== undefined) {
      request.address = address.trim();
    }

    if (
      latitude !== undefined ||
      longitude !== undefined
    ) {
      const lat = Number(
        latitude ?? request.location.coordinates[1]
      );

      const lng = Number(
        longitude ?? request.location.coordinates[0]
      );

      if (
        Number.isNaN(lat) ||
        Number.isNaN(lng)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid latitude or longitude",
        });
      }

      if (lat < -90 || lat > 90) {
        return res.status(400).json({
          success: false,
          message: "Invalid latitude",
        });
      }

      if (lng < -180 || lng > 180) {
        return res.status(400).json({
          success: false,
          message: "Invalid longitude",
        });
      }

      request.location = {
        type: "Point",
        coordinates: [lng, lat],
      };
    }

    if (preferredDate !== undefined) {
      request.preferredDate =
        preferredDate || null;
    }

    if (preferredTime !== undefined) {
      request.preferredTime =
        preferredTime || null;
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: "Repair request updated successfully",
      data: {
        request,
      },
    });
  } catch (error) {
    console.error(
      "Update repair request error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const cancelRepairRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const request = await RepairRequest.findOne({
      _id: id,
      customer: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending repair requests can be cancelled",
      });
    }

    request.status = "cancelled";
    request.cancelledAt = new Date();
    request.cancellationReason =
      reason?.trim() || "Cancelled by customer";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Repair request cancelled successfully",
      data: {
        request,
      },
    });
  } catch (error) {
    console.error(
      "Cancel repair request error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const deleteRepairRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RepairRequest.findOne({
      _id: id,
      customer: req.user._id,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
      });
    }

    // Sirf pending/cancelled request delete kar sakte hain
    if (!["pending", "cancelled"].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message:
          "Only pending or cancelled repair requests can be deleted",
      });
    }

    await RepairRequest.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Repair request deleted successfully",
    });
  } catch (error) {
    console.error("Delete repair request error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  createRepairRequest,
  getMyRepairRequests,
    getRepairRequestById,
      updateRepairRequest,
  cancelRepairRequest,
  deleteRepairRequest,


};