const mongoose = require("mongoose");

async function connectToDB(DB_URL) {
  try {
    const connection = await mongoose.connect(DB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("DB Error", error);
  }
}

module.exports = connectToDB;
