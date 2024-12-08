// Import Necessary Routes
const authRoutes = require("../routes/authRoutes");

// Function to apply routes
module.exports = (app) => {
  app.use("/api/auth", authRoutes);
};
