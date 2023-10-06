const express=require("express");
const app=new express();
const router=require("./src/route/api");
const bodyparser=require("body-parser");
const mongoose=require('mongoose');

//security middlewire
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

//env
const dotEnv=require("dotenv");
dotEnv.config();

//body parser implements
app.use(bodyparser.json());

//Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
});
app.use(limiter);

//database
const url=`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@products.rjrwwqd.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("Connected successfully"))
    .catch((err)=>{
        console.log(err);
    });
app.use("/api",router);
module.exports=app;