const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

exports.Port = process.env.PORT || 3000;

exports.NodeEnv = process.env.NODE_ENV || "DEVELOPMENT";
