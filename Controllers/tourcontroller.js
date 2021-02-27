const fs = require('fs');

const Tour = require('./../models/tourmodels');
//creating a Router specifically for Tour Route

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requstedat: req.requestedTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

//getting a specific tour detail by id
//How to respond to the parameters in the URL
//We get a URL parameters via req object i.e req.params

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //converting the id to a number
  // const tour = tours.find((el) => el.id === id);

  // //handling the false parameter in the URL

  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

//Post Method to create New tour

exports.createTour = async (req, res) => {
  //creating a new Tour
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid data set',
    });
  }
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
