const { match } = require('assert');
const { json } = require('express');
const fs = require('fs');

//Tour is a mongoose model schema that we have written in a tourmodel file
const Tour = require('./../models/tourmodels');
//creating a Router specifically for Tour Route

//creating a CRUD operations using a mongoose schema

exports.getAllTours = async (req, res) => {
  //to get all the data we have to use find() mehtod on a document
  //It will return as the promise and we have to mark the function as a async
  try {
    //we have to exclude all the functionality like paging sorting lmit etc.So we make
    // copy of a req.query and query the database only with a valid query

    //Building a Query
    const queryobj = { ...req.query };

    const excludedfields = ['page', 'limit', 'sort', 'fields'];

    //now remove all the fields from the queryobj
    excludedfields.forEach((el) => delete queryobj[el]);

    console.log(req.query, queryobj);
    //Advanced Filtering

    let querystring = JSON.stringify(queryobj);

    querystring = querystring.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    //awating a query

    let query = Tour.find(JSON.parse(querystring));

    //Sorting

    //Sort by a Avrerage

    //Here we are Sorting the Api by the price, ratinavrge
    if (req.query.sort) {
      const Sortby = req.query.sort.split(',').join(' ');

      query = query.sort(Sortby);
    } else {
      //by default sort by a created data i.e newest first
      query = query.sort('-createdAt');
    }

    //Field Limiting
    //field Limiting is a process where we limit some fields from API.

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit; //from StackOverflow

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numoftours = await Tour.countDocuments();

      if (skip >= numoftours) throw new Error('This page does not exists');
    }

    //Executing query
    const tours = await query;

    //sending response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//getting a specific tour detail by id
//How to respond to the parameters in the URL
//We get a URL parameters via req object i.e req.params

exports.getTour = async (req, res) => {
  try {
    //we will use find to find the one tour
    //Tour.findone({_id: req.params.id})
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//Post Method to create New tour

exports.createTour = async (req, res) => {
  //creating a new Tour
  //to create a new tour / new data in a documents we can make
  //use of a .create(). It will return us a promise and and now we have to mark the function as a aysnc
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//Handle a delete request

exports.deleteTour = async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  try {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
