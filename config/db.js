require("dotenv").config();
const sql = require("mssql");

const config = {
  user: "harshaweb",
  password: "Harsh@Singh8576",
  database: "dauqu",
  server: "harshaweb.database.windows.net",
  options: {
    encrypt: true,
    trustedConnnection: true,
    enableArithPort: true,
    instancename: "SQLEXPRESS",
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("SQL Server Connected...");

    //Get all categories
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
