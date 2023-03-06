const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = 8080;
const app = express();

const corsOptions = {
  origin: ["http://localhost:8080/"],
  credentials: true,
  optionSuccessStatus: 200,
  origin: true,
};
app.use(cors(corsOptions));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

require("./backend/services/conn");

const router = require("./backend/routes/router");
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
