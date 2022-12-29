const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');
const errorMiddleware = require('./Middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Handling Uncaught Exception********************************************************************************
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//connection**************************************************************************************************
connection();

//middlewares************************************************************************************************
app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//for routes************************************************************************************************
const product = require('./routes/product');
const user = require('./routes/users');

app.use('/api/v1', product);
app.use('/api/log', user);

//Errors Middleware******************************************************************************************
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
