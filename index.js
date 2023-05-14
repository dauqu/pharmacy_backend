const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
// const CreateProduct = require('./create_tables');
connectDB();

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://admin-for-all.vercel.app",
  "https://dauqunews.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use(express.json({ extended: false }));

// CreateProduct();

app.get('/', (req, res) => {
    res.send('API Running');
});

// Define Routes
app.use('/api/products', require('./routes/products')); 
app.use('/api/categories', require('./routes/categories'));
app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/api/auth'));


app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));