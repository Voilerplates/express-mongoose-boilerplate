/* NPM Packages */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
})

if(process.env.NODE_ENV !== 'production')
    require("dotenv").config()

/* Write Stream for Morgan Logs */
const morganLogs = fs.createWriteStream(path.join(__dirname, "../logs/web.log"));

/* Express Instance */
const app = express();

/* Express Configurations */
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(morgan("dev", { stream: morganLogs }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(express.static(path.join(__dirname, "../public")));

/* Express Route Definitions */
const indexRouter = require("../routes/index");
/* Express Routing */
app.use("/", indexRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
