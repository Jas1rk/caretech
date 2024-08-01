const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDb = require("./Config/Database/db");
connectDb();
const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/',userRoute)
app.use('/admin',adminRoute)

app.listen(process.env.PORT, () => console.log("server is running"));
