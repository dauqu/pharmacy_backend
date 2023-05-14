const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all promotion
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query("SELECT * FROM Manufacturer");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create table
router.get("/create-table", async (req, res) => {
  const sqlPromotion = `
    CREATE TABLE Manufacturer (
        id INT IDENTITY(1,1) PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
        short_from VARCHAR(50) NOT NULL,
        alias_code VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        emails VARCHAR(100) NOT NULL,
        mobile_no VARCHAR(50) NOT NULL,
        reference_code VARCHAR(50) NOT NULL,
        is_active BIT NOT NULL,
        )`;

  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query(sqlPromotion);
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create promotion
router.post("/", async (req, res) => {
    const {
        description,
        short_from,
        alias_code,
        address,
        emails,
        mobile_no,
        reference_code,
        is_active,
    } = req.body;
    
    try {
        let pool = await mssql.connect(config);
        let promotion = await pool
        .request()
        .input("description", mssql.VarChar, description)
        .input("short_from", mssql.VarChar, short_from)
        .input("alias_code", mssql.VarChar, alias_code)
        .input("address", mssql.VarChar, address)
        .input("emails", mssql.VarChar, emails)
        .input("mobile_no", mssql.VarChar, mobile_no)
        .input("reference_code", mssql.VarChar, reference_code)
        .input("is_active", mssql.Bit, is_active)
        .query(
            "INSERT INTO Manufacturer (description, short_from, alias_code, address, emails, mobile_no, reference_code, is_active) VALUES (@description, @short_from, @alias_code, @address, @emails, @mobile_no, @reference_code, @is_active)"
        );
        res.json(promotion.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

//Delete promotion
router.delete("/:id", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool
      .request()
      .input("id", mssql.Int, req.params.id)
      .query("DELETE FROM Manufacturer WHERE id = @id");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
