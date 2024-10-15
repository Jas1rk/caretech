const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
dotenv.config();
const connectDb = require("./Config/Database/db");
connectDb();
const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute")
const doctorRoute = require("./Routes/doctorRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())
app.use('/',userRoute)
app.use('/admin',adminRoute)
app.use('/doctor',doctorRoute)

app.listen(process.env.PORT, () => console.log("server is running"));
