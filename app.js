const fs = require('fs');

const express = require('express');

const app = express();
//express is a function which upon calling will add bunch of methods to our app variable

//Middlewares
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

//Reading a file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Route Handlers for all the Tours

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requstedat: req.requestedTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

//getting a specific tour detail by id
//How to respond to the parameters in the URL
//We get a URL parameters via req object i.e req.params

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //converting the id to a number
  const tour = tours.find((el) => el.id === id);

  //handling the false parameter in the URL
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

//Post Method to create New tour

const createTour = (req, res) => {
  console.log(req.body);
  //here the incoming data is available on a Req object.  we are using a middleware for a post req
  //saving the data to our dummy data base
  const newID = tours[tours.length - 1].id + 1;
  const newtour = Object.assign({ id: newID }, req.body);
  tours.push(newtour);
  //we also have to write the data
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newtour,
        },
      });
    }
  );
};

//Handling Patch request

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tours>',
    },
  });
};

//Handle a delete request

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//creating a server
const port = 3000;
app.listen(port, () => {
  console.log(`The server is listnning at ${port}`);
});

//definning a Routes
