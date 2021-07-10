import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import "./db/mongoConnection.js";
import reports from './routes/reports.js'
dotenv.config();
const app = express();

//basic middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/reports', reports)

//basic home route
app.get("/", (req, res) => {
  res.send({ message: "welcome to the homepage" });
});

app.get("*", function (req, res) {
  res.status(404).json({ message: "Sorry, this page doesn't exist" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
