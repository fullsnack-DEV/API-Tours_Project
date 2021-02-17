const fs = require('fs');
//creating a Router specifically for Tour Route

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};
exports.CheckBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name and price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //converting the id to a number
  const tour = tours.find((el) => el.id === id);

  //handling the false parameter in the URL

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

//Post Method to create New tour

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tours>',
    },
  });
};

//Handle a delete request

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
