const express = require("express");
const router = express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all promotion
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query("SELECT * FROM Promotion");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Create table
router.get("/create-table", async (req, res) => {
  const sqlPromotion = `
    CREATE TABLE Promotion (
        id INT IDENTITY(1,1) PRIMARY KEY,
        promotion_code VARCHAR(50) NOT NULL,
        description VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        remarks VARCHAR(100) NOT NULL,
        offer_from DATE NOT NULL,
        offer_to DATE NOT NULL,
        scheme_type VARCHAR(50) NOT NULL,
        offer_product VARCHAR(50) NOT NULL,
        scheme_qty INT NOT NULL,
        scheme_discount DECIMAL(5,2) NOT NULL,
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
    promotion_code,
    description,
    date,
    remarks,
    offer_from,
    offer_to,
    scheme_type,
    offer_product,
    scheme_qty,
    scheme_discount,
  } = req.body;

  try {
    let pool = await mssql.connect(config);
    let promotion = await pool
      .request()
      .input("promotion_code", mssql.VarChar, promotion_code)
      .input("description", mssql.VarChar, description)
      .input("date", mssql.Date, date)
      .input("remarks", mssql.VarChar, remarks)
      .input("offer_from", mssql.Date, offer_from)
      .input("offer_to", mssql.Date, offer_to)
      .input("scheme_type", mssql.VarChar, scheme_type)
      .input("offer_product", mssql.VarChar, offer_product)
      .input("scheme_qty", mssql.Int, scheme_qty)
      .input("scheme_discount", mssql.Decimal, scheme_discount)
      .query( 
        "INSERT INTO Promotion (promotion_code, description, date, remarks, offer_from, offer_to, scheme_type, offer_product, scheme_qty, scheme_discount) VALUES (@promotion_code, @description, @date, @remarks, @offer_from, @offer_to, @scheme_type, @offer_product, @scheme_qty, @scheme_discount)"
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
      .query("DELETE FROM Promotion WHERE id = @id");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
