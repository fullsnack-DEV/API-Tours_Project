//importing development data

const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const Tour = require('../../models/tourmodels');
const e = require('express');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('db connection successful!');
  });

//REad the JSon file here

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//importing the data

const importdata = async () => {
  try {
    await Tour.create(tour);
    console.log('Data Successfully Crated');
  } catch (err) {
    console.log(err);
  }
};

//Deleting a data

const deletedata = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedata();
}

console.log(process.argv);
