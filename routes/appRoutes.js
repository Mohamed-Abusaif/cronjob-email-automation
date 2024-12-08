// Import Necessary Routes
const testRoutes = require("../routes/testRoutes");

// Function to apply routes
module.exports = (app) => {
  app.use("/api", testRoutes);
};
