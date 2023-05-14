const mssql = require("mssql");
const config = require("./config/db");

const CreateProduct = async () => {
  try {
    const pool = await mssql.connect(config);

    const sqlQuery = `
            CREATE TABLE Products (
                id INT IDENTITY(1,1) PRIMARY KEY,
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

    await pool.request().query(sqlPromotion);

    console.log("Table created successfully!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = CreateProduct;
