const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoute');
const app = express();  //create an instance for express

app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

// Middleware => It can access all types of method requests
//app.use((req, res, next) => {
//    console.log(`Path: ${req.path}\nMethod: ${req.method}`);
//    next();
//})

// middleware with get method => It only accepts the get method
// app.get('/', async (req, res) => {
//     res.send('<h1>Hello world</h1>');
// })

// DB Connection and run the server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        // To Run the server
        app.listen(PORT, () => {
            console.log(`The Database was connected Successfully\nThe Server was running in: http://localhost:${PORT}`);
        })
    }).catch((err) => console.log(err))

    app.use('/api/tasks', taskRoutes);