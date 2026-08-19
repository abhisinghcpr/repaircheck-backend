const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Request title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Problem description is required"],
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },

    category: {
      type: String,
      required: [true, "Repair category is required"],
      trim: true,
      maxlength: 100,
    },

    images: {
      type: [String],
      default: [],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: 500,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    preferredDate: {
      type: Date,
      default: null,
    },

    preferredTime: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    selectedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    selectedQuote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    cancellationReason: {
      type: String,
      default: null,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Location-based technician/request searching
repairRequestSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model(
  "RepairRequest",
  repairRequestSchema
);