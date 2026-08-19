const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "RepairCheck API",
      version: "1.0.0",
      description:
        "RepairCheck Customer and Technician Backend API",
    },

 servers: [
  {
    url: "http://localhost:5000",
    description: "Local Development Server",
  },
  {
    url: "https://repaircheck-backend.onrender.com",
    description: "Production Server",
  },
],

    tags: [
      {
        name: "Authentication",
        description: "Customer and Technician authentication APIs",
      },
      {
        name: "Repair Requests",
        description: "Customer repair request APIs",
      },
      {
        name: "Technician",
        description: "Technician repair request APIs",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "6a84095bf691fc411c0ac082",
            },
            name: {
              type: "string",
              example: "Test Customer",
            },
            email: {
              type: "string",
              example: "test@repaircheck.com",
            },
            phone: {
              type: "string",
              example: "9876543210",
            },
            role: {
              type: "string",
              example: "customer",
            },
            profileImage: {
              type: "string",
              nullable: true,
              example: "/uploads/profile-image.jpg",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Lucknow, Uttar Pradesh",
            },
            isVerified: {
              type: "boolean",
              example: false,
            },
            isActive: {
              type: "boolean",
              example: true,
            },
          },
        },

        RepairRequest: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "68a84095bf691fc411c0ac082",
            },
            customer: {
              type: "string",
              example: "6a84095bf691fc411c0ac082",
            },
            title: {
              type: "string",
              example: "AC is not cooling",
            },
            description: {
              type: "string",
              example: "AC is running but not cooling properly.",
            },
            category: {
              type: "string",
              example: "AC Repair",
            },
            images: {
              type: "array",
              items: {
                type: "string",
              },
            },
            address: {
              type: "string",
              example: "Lucknow, Uttar Pradesh",
            },
            location: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  example: "Point",
                },
                coordinates: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                  example: [80.9462, 26.8467],
                },
              },
            },
            preferredDate: {
              type: "string",
              format: "date",
              nullable: true,
              example: "2026-08-22",
            },
            preferredTime: {
              type: "string",
              nullable: true,
              example: "11:00 AM",
            },
            status: {
              type: "string",
              enum: [
                "pending",
                "assigned",
                "in_progress",
                "completed",
                "cancelled",
              ],
              example: "pending",
            },
          },
        },
      },
    },
  },

  apis: [
    "./src/config/swaggerDocs.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;