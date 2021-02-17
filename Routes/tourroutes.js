const express = require('express');

const tourcontrollers = require('../Controllers/tourcontroller');

const router = express.Router();

//using params Middleware

router.param('id', tourcontrollers.checkId);

router
  .route('/')
  .get(tourcontrollers.getAllTours)
  .post(tourcontrollers.CheckBody, tourcontrollers.createTour);

router
  .route('/:id')
  .get(tourcontrollers.getTour)
  .patch(tourcontrollers.updateTour)
  .delete(tourcontrollers.deleteTour);

module.exports = router;
