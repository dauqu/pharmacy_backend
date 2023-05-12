const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API Running');
});

// Define Routes
app.use('/api/products', require('./routes/products')); 
app.use('/api/categories', require('./routes/categories'));
// app.use('/api/auth', require('./routes/api/auth'));


app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));