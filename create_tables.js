const mssql = require("mssql");
const config = require("./config/db");

const CreateProduct = async () => {
  try {
    const pool = await mssql.connect(config);

    const sqlQuery = `
            CREATE TABLE products (
                product_id INT IDENTITY(1,1) PRIMARY KEY,
                product_code VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                stock INT NOT NULL,
                expiry DATE NOT NULL,
                vat_per DECIMAL(5,2) NOT NULL,
                main_group VARCHAR(50) NOT NULL,
                generic_name VARCHAR(100) NOT NULL,
                company VARCHAR(100) NOT NULL,
                supplier VARCHAR(100) NOT NULL,
                p_rate DECIMAL(10,2) NOT NULL,
                s_rate DECIMAL(10,2) NOT NULL,
                margin DECIMAL(5,2) NOT NULL,
                manufacturer_code VARCHAR(50) NOT NULL
            );
        `;

    await pool.request().query(sqlQuery);

    console.log("Table created successfully!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = CreateProduct;
