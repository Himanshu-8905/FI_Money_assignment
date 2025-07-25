const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 


const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');


const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Inventory Management API is running...');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
