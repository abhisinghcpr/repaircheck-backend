const express = require("express");

const {
  createRepairRequest,
  getMyRepairRequests,
  getRepairRequestById,
    updateRepairRequest,
    cancelRepairRequest,
      deleteRepairRequest,


} = require("../controllers/repairRequestController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Repair Request
router.post(
  "/",
  protect,
  createRepairRequest
);

// Get My Repair Requests
router.get(
  "/",
  protect,
  getMyRepairRequests
);
router.get(
  "/:id",
  protect,
  getRepairRequestById
);
router.put(
  "/:id",
  protect,
  updateRepairRequest
);
router.put(
  "/:id/cancel",
  protect,
  cancelRepairRequest
);
router.delete("/:id", protect, deleteRepairRequest);
module.exports = router;