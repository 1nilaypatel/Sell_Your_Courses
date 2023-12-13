const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin.js');
const userRouter = require('./routes/user.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/user', userRouter);

mongoose.connect('mongodb+srv://nilaypatel:nPedSbtL8KRxTv%23@cluster0.8a6gpvj.mongodb.net/Sell-Your-Courses');


app.listen(3000, () => {console.log('Server running on port 3000')});