const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const config = require("./../config/db");

// //Get all categories
router.get("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    //Add static Data

    const result = await pool.request().query(`SELECT * FROM PRODUCTS`);
    if (result.recordset.length === 0) {
      res.status(400).send("Number not registered");
    } else {
      res.send(result.recordset);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get categories by page
// router.get("/:page", async (req, res) => {
//   try {
//     const { page } = req.params;
//     const pageSize = 10;
//     const pool = await mssql.connect(config);
//     const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM PRODUCTS";
//     const resultCount = await pool.request().query(totalCountQuery);
//     const totalCount = resultCount.recordset[0].totalCount;

//     const totalPages = Math.ceil(totalCount / pageSize);
//     const currentPage = parseInt(page, 10) || 1;
    
//     if (currentPage < 1 || currentPage > totalPages) {
//       res.status(400).send("Invalid page number");
//       return;
//     }

//     const offset = (currentPage - 1) * pageSize;
//     const query = `SELECT * FROM PRODUCTS ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;

//     const result = await pool.request().query(query);
//     if (result.recordset.length === 0) {
//       res.status(404).send("No products found");
//     } else {
//       res.send({
//         products: result.recordset,
//         currentPage,
//         totalPages,
//         pageSize,
//         totalCount
//       });
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });


//Get all categories
router.post("/", async (req, res) => {
  try {
    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .query(
        `INSERT INTO Products (product_code, name, stock, expiry, vat_per, main_group, generic_name, company, supplier, p_rate, s_rate, margin, manufacturer_code) VALUES ('${req.body.product_code}', '${req.body.name}', '${req.body.stock}', '${req.body.expiry}', '${req.body.vat_per}', '${req.body.main_group}', '${req.body.generic_name}', '${req.body.company}', '${req.body.supplier}', '${req.body.p_rate}', '${req.body.s_rate}', '${req.body.margin}', '${req.body.manufacturer_code}')`
      );

    if (result.rowsAffected[0] === 0) {
     res.send("Number not registered");
    } else {
      res.send("Number registered successfully!");
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
