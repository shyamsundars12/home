const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the routers
const custRouter = require('./router/customerRouter');
const empRouter = require('./router/employeeRouter');
const empSerRouter = require('./router/employeeServiceRouter');
const feedbackRouter = require('./router/feedbackRouter');
const promocodeRouter = require('./router/promocodeRouter');
const serviceRouter = require('./router/serviceRouter');
const orderRouter = require('./router/orderRouter');
const addOnRouter = require('./router/addOnRouter');
const loginRouter = require('./router/loginRouter');
const adminRouter = require('./router/adminRouter');

// Initialize express app
const app = express();

// Enable CORS for frontend access
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// Define MongoDB connection URL
const url = "mongodb+srv://shyam41550:shyam123@cluster0.igt1l.mongodb.net/janani?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(url)
    .then(() => {
        console.log("Connected to DB");

        // Start the server after DB connection is successful
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Use the other routers
app.use("/customer", custRouter);
app.use("/employee", empRouter);
app.use("/empser", empSerRouter);
app.use("/feedback", feedbackRouter);
app.use("/promocode", promocodeRouter);
app.use("/service", serviceRouter);
app.use("/order", orderRouter);
app.use("/addOn", addOnRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);

