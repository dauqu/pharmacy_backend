const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
// const CreateProduct = require('./create_tables');
// CreateProduct();
connectDB();

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://admin-for-all.vercel.app",
  "https://pharmacy-hjmr.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/users", require("./routes/users"));
app.use("/api/promotion", require("./routes/promotion"));
app.use("/api/manufacturer", require("./routes/manufacturer"));
app.use("/api/supplier", require("./routes/supplier"));
app.use("/api/customer", require("./routes/customer"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/salesman", require("./routes/salesman"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/group", require("./routes/group"));
app.use("/api/chart-of-accounts", require("./routes/chart_of_accounts"));
app.use("/api/account-groups", require("./routes/accounts_groups"));

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
