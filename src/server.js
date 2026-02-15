require("dotenv").config();
console.log("DEBUG: DB_NAME is", process.env.DB_NAME);
const app = require("./app");
const { sequelize } = require("./models");

// 1. Define configuration
const PORT = process.env.PORT || 3000;

/**
 * 2. Connect to Database and Start Server
 * Using an async function for better error handling
 */
const startServer = async () => {
  try {
    // Test connection and sync models
    // 'alter: true' updates tables to match models without dropping them
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Exit if the database connection fails
  }
};

startServer();