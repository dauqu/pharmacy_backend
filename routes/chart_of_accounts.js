const express  = require('express');
const router =  express.Router();

const mssql = require("mssql");
const config = require("./../config/db");

//Get all promotion
router.get("/", async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    let promotion = await pool.request().query("SELECT * FROM V_ACCOUNT_HEADS");
    res.json(promotion.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
