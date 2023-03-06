require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

mongoose
  .connect(
    `mongodb+srv://${process.env.dbusername}:${process.env.dbpass}${process.env.dbhost}`,
    { useNewUrlParser: true }
  )
  .then(console.log("Connected successfully"))
  .catch((err) => {
    console.log(err);
  });

