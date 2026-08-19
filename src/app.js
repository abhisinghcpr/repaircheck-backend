const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const repairRequestRoutes = require("./routes/repairRequestRoutes");
const authRoutes = require("./routes/authRoutes");
const technicianRoutes = require("./routes/technicianRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/auth", authRoutes);

app.use(
  "/api/repair-requests",
  repairRequestRoutes
);

app.use(
  "/api/technicians",
  technicianRoutes
);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RepairCheck API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;