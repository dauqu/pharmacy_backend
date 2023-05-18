const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all users
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let users = await pool.request().query("SELECT * FROM V_USERS");
    res.json(users.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create table
router.get("/create-table", async (req, res) => {
  const sqlUsers = `
        CREATE TABLE Users (
            id INT IDENTITY(1,1) PRIMARY KEY,
            code VARCHAR(50) NOT NULL,
            login_id VARCHAR(20) NOT NULL,
            password VARCHAR(50) NOT NULL,
            employee_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            remarks VARCHAR(100) NOT NULL,
            assigned_role VARCHAR(10) NOT NULL,
            status VARCHAR(50) NOT NULL,
            added_by VARCHAR(50) NOT NULL,
            modified_by VARCHAR(50) NOT NULL,
            pda_user VARCHAR(50) NOT NULL
        );
    `;

  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query(sqlUsers);
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Create Users
router.post("/", async (req, res) => {
  const {
    code,
    login_id,
    password,
    employee_name,
    email,
    remarks,
    assigned_role,
    status,
    added_by,
    modified_by,
    pda_user,
  } = req.body;

  try {
    let pool = await mssql.connect(config);
    let promotion = await pool
      .request()
      .input("code", mssql.VarChar, code)
      .input("login_id", mssql.VarChar, login_id)
      .input("password", mssql.VarChar, password)
      .input("employee_name", mssql.VarChar, employee_name)
      .input("email", mssql.VarChar, email)
      .input("remarks", mssql.VarChar, remarks)
      .input("assigned_role", mssql.VarChar, assigned_role)
      .input("status", mssql.VarChar, status)
      .input("added_by", mssql.VarChar, added_by)
      .input("modified_by", mssql.VarChar, modified_by)
      .input("pda_user", mssql.VarChar, pda_user)
      .query(
        "INSERT INTO Users VALUES (@code, @login_id, @password, @employee_name, @email, @remarks, @assigned_role, @status, @added_by, @modified_by, @pda_user)"
      );
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Delete Users
router.delete("/:id", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool
      .request()
      .input("id", mssql.Int, req.params.id)
      .query("DELETE FROM Users WHERE id = @id");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
