const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all promotion
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query("SELECT * FROM V_CUSTOMER");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create table
router.get("/create-table", async (req, res) => {
  const sqlPromotion = `
    CREATE TABLE Customer (
        id INT IDENTITY(1,1) PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
        short_from VARCHAR(50) NOT NULL,
        emirate VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        mobile_no VARCHAR(50) NOT NULL,
        reference_code VARCHAR(50) NOT NULL,
        is_active BIT NOT NULL,
        calculate_vat BIT NOT NULL,
        valid_till DATE NOT NULL,
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
        emirate,
        address,
        mobile_no,
        reference_code,
        is_active,
        calculate_vat,
        valid_till,
    } = req.body;
    
    try {
        let pool = await mssql.connect(config);
        let promotion = await pool
        .request()
        .input("description", mssql.VarChar, description)
        .input("short_from", mssql.VarChar, short_from)
        .input("emirate", mssql.VarChar, emirate)
        .input("address", mssql.VarChar, address)
        .input("mobile_no", mssql.VarChar, mobile_no)
        .input("reference_code", mssql.VarChar, reference_code)
        .input("is_active", mssql.Bit, is_active)
        .input("calculate_vat", mssql.Bit, calculate_vat)
        .input("valid_till", mssql.Date, valid_till)
        .query(
            "INSERT INTO Customer (description, short_from, emirate, address, mobile_no, reference_code, is_active, calculate_vat, valid_till) VALUES (@description, @short_from, @emirate, @address, @mobile_no, @reference_code, @is_active, @calculate_vat, @valid_till)"
        );
        res.status(200).send("Customer added");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

//Delete promotion
router.delete("/:id", async (req, res) => {
    try {
        let pool = await mssql.connect(config);
        let promotion = await pool
        .request()
        .input("id", mssql.Int, req.params.id)
        .query("DELETE FROM Customer WHERE id = @id");
        res.json(promotion.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
