const express = require("express");

const {
  getNearbyRepairRequests,
  getTechnicianRepairRequestById,
    acceptRepairRequest,
  rejectRepairRequest,
} = require("../controllers/technicianController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// ==========================================
// Technician - Nearby Repair Requests
// ==========================================
router.get(
  "/nearby-requests",
  protect,
  authorizeRoles("technician"),
  getNearbyRepairRequests
);


// ==========================================
// Technician - Repair Request Details
// ==========================================
router.get(
  "/requests/:id",
  protect,
  authorizeRoles("technician"),
  getTechnicianRepairRequestById
);

router.put(
  "/requests/:id/accept",
  protect,
  authorizeRoles("technician"),
  acceptRepairRequest
);

router.put(
  "/requests/:id/reject",
  protect,
  authorizeRoles("technician"),
  rejectRepairRequest
);
module.exports = router;