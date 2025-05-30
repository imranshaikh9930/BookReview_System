const express = require("express");
const authRoutes = require("./routes/user.Route");
const bookRoutes = require("./routes/book.route");
const reviewRoutes = require("./routes/review.route");
const connectDb = require("./config/connectDb");
require("dotenv").config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("/api",bookRoutes);
app.use("/api/books",reviewRoutes);

app.listen(PORT,()=>{
    console.log(`Server Running on Post ${PORT}`)
    connectDb();
})