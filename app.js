const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./Routes/tourroutes');

const userRouter = require('./Routes/userroutes');

const app = express();
//express is a function which upon calling will add bunch of methods to our app variable

//Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//Middleware stand between the Req and Res
// Its just Modify the Incoming Request

//custome Middleware
app.use((req, res, next) => {
  console.log('This is a Middleware running');
  req.requestedTime = new Date().toISOString();
  next();
});

//implemnting Routes

//what is "/api/v1/tours" ?
//This is initial Route for our API ,  where V1 indicates the version of a API .
//"tours" for tours routes

//Mounting a Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//creating a server

module.exports = app;
