const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const config = require("./../config/db");

//Get all categories
router.get("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    //Add static Data

    const result = await pool.request().query(`SELECT * FROM Products`);
    if (result.recordset.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.recordset);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get all categories
router.get("/add", async (req, res) => {
  // product_id INT IDENTITY(1,1) PRIMARY KEY,
  // product_code VARCHAR(50) NOT NULL,
  // name VARCHAR(100) NOT NULL,
  // stock INT NOT NULL,
  // expiry DATE NOT NULL,
  // vat_per DECIMAL(5,2) NOT NULL,
  // main_group VARCHAR(50) NOT NULL,
  // generic_name VARCHAR(100) NOT NULL,
  // company VARCHAR(100) NOT NULL,
  // supplier VARCHAR(100) NOT NULL,
  // p_rate DECIMAL(10,2) NOT NULL,
  // s_rate DECIMAL(10,2) NOT NULL,
  // margin DECIMAL(5,2) NOT NULL,
  // manufacturer_code VARCHAR(50) NOT NULL
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .query(
        `INSERT INTO Products (product_code, name, stock, expiry, vat_per, main_group, generic_name, company, supplier, p_rate, s_rate, margin, manufacturer_code) VALUES ('${req.body.product_code}', '${req.body.name}', '${req.body.stock}', '${req.body.expiry}', '${req.body.vat_per}', '${req.body.main_group}', '${req.body.generic_name}', '${req.body.company}', '${req.body.supplier}', '${req.body.p_rate}', '${req.body.s_rate}', '${req.body.margin}', '${req.body.manufacturer_code}')`
      );

    if (result.rowsAffected[0] === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.rowsAffected[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Delete product
router.delete("/:id", async (req, res) => {
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .query(`DELETE FROM Products WHERE product_id = ${req.params.id}`);

    if (result.rowsAffected[0] === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.rowsAffected[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Update product
router.put("/:id", async (req, res) => {
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .query(
        `UPDATE Products SET product_code = '${req.body.product_code}', name = '${req.body.name}', stock = '${req.body.stock}', expiry = '${req.body.expiry}', vat_per = '${req.body.vat_per}', main_group = '${req.body.main_group}', generic_name = '${req.body.generic_name}', company = '${req.body.company}', supplier = '${req.body.supplier}', p_rate = '${req.body.p_rate}', s_rate = '${req.body.s_rate}', margin = '${req.body.margin}', manufacturer_code = '${req.body.manufacturer_code}' WHERE product_id = ${req.params.id}`
      );

    if (result.rowsAffected[0] === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.rowsAffected[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
