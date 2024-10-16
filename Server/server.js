const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const centerRoutes = require('./routes/center');
const bookingRoutes = require('./routes/booking');
const courtRoutes = require('./routes/court');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB(process.env.DATABASE_URL);

app.use('/center', centerRoutes);
app.use('/booking', bookingRoutes);
app.use('/court',courtRoutes);

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
