const express = require("express");

const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const uploadProfileImage = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==============================
// PUBLIC APIs
// ==============================

router.post("/register", register);

router.post("/login", login);
router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);
// ==============================
// PROTECTED APIs
// ==============================

router.get("/me", protect, getMe);

router.put(
  "/profile",
  protect,
  uploadProfileImage.single("profileImage"),
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;