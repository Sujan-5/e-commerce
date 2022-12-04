const mongoose = require('mongoose');
require('dotenv').config();

// var MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
  try {
    await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error.message);
  }
};
