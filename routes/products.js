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
  
  try {
    const pool = await mssql.connect(config);
    //Add static Data 
    
    const result = await pool.request().query(`INSERT INTO Products (cProductName, nBranchId, nActive) VALUES ('test', 1, 1)`);
    if (result.recordset.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.recordset);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
