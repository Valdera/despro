// Module import
const mongoose = require("mongoose");

// File import
const config = require("./config");
const app = require("./app");

// Connect to mongoDB database
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection successfull"));

// Starting the server
app.listen(config.Port, () => {
  console.log(`App running on port ${config.Port}...`);
});
