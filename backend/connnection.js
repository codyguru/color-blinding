const mongoose = require("mongoose");
const { NamedModulesPlugin } = require("webpack");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB has been connected");
};

//==LOCAL ===========================
// const connectDB = async () => {
//     await mongoose.connect(URI,
//         { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//     console.log("MongoDB has been connected");
// }

module.exports = connectDB;
