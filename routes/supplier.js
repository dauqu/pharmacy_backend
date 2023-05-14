const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all promotion
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query("SELECT * FROM Supplier");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create table
router.get("/create-table", async (req, res) => {
  const sqlPromotion = `
    CREATE TABLE Supplier (
        id INT IDENTITY(1,1) PRIMARY KEY,
        description VARCHAR(100) NOT NULL,
        short_from VARCHAR(50) NOT NULL,
        alias_code VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        emails VARCHAR(100) NOT NULL,
        mobile_no VARCHAR(50) NOT NULL,
        reference_code VARCHAR(50) NOT NULL,
        is_active BIT NOT NULL,
        website_im_detail VARCHAR(100) NOT NULL,
        owner_info VARCHAR(100) NOT NULL,
        trade_license VARCHAR(100) NOT NULL,
        trade_license_expiry_date DATE NOT NULL,
        payment_type VARCHAR(100) NOT NULL,
        credit_days INT NOT NULL,
        credit_limit INT NOT NULL,
        payment_terms VARCHAR(100) NOT NULL,
        warehouse_info VARCHAR(100) NOT NULL,
        delivery_info VARCHAR(100) NOT NULL,
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
        website_im_detail,
        owner_info,
        trade_license,
        trade_license_expiry_date,
        payment_type,
        credit_days,
        credit_limit,
        payment_terms,
        warehouse_info,
        delivery_info,
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
        .input("website_im_detail", mssql.VarChar, website_im_detail)
        .input("owner_info", mssql.VarChar, owner_info)
        .input("trade_license", mssql.VarChar, trade_license)
        .input(
            "trade_license_expiry_date",
            mssql.Date,
            trade_license_expiry_date
        )
        .input("payment_type", mssql.VarChar, payment_type)
        .input("credit_days", mssql.Int, credit_days)
        .input("credit_limit", mssql.Int, credit_limit)
        .input("payment_terms", mssql.VarChar, payment_terms)
        .input("warehouse_info", mssql.VarChar, warehouse_info)
        .input("delivery_info", mssql.VarChar, delivery_info)
        .query(
            "INSERT INTO Supplier VALUES (@description, @short_from, @alias_code, @address, @emails,"
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
        .query("DELETE FROM Supplier WHERE id = @id");
        res.json(promotion.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
