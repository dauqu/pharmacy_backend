const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all users
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let users = await pool.request().query("SELECT * FROM Users");
    res.json(users.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Insert static users
router.post("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const {
      CODE,
      LoginID,
      Password,
      EmployeeName,
      Email,
      Remarks,
      AssignedRole,
      Status,
      AddedBy,
      ModifiedBy,
      PDAUser,
    } = req.body;
    const result = await pool
      .request()
      .input("code", mssql.NVarChar(50), CODE)
      .input("loginID", mssql.VarChar(20), LoginID)
      .input("password", mssql.VarChar(50), Password)
      .input("employeeName", mssql.VarChar(50), EmployeeName)
      .input("email", mssql.VarChar(50), Email)
      .input("remarks", mssql.VarChar(100), Remarks)
      .input("assignedRole", mssql.VarChar(10), AssignedRole)
      .input("status", mssql.VarChar(50), Status)
      .input("addedBy", mssql.VarChar(50), AddedBy)
      .input("modifiedBy", mssql.VarChar(50), ModifiedBy)
      .input("pdaUser", mssql.VarChar(50), PDAUser)
      .query(`INSERT INTO Users (CODE, LoginID, Password, EmployeeName, Email, Remarks, AssignedRole, AddedOn, ModifiedOn, Status, AddedBy, ModifiedBy, PDAUser) 
                VALUES (@code, @loginID, @password, @employeeName, @email, @remarks, @assignedRole, 
                        GETDATE(), GETDATE(), @status, @addedBy, @modifiedBy, @pdaUser)`);
    res.json({ message: "Static users added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
