const express = require('express');

const tourcontrollers = require('../Controllers/tourcontroller');

const router = express.Router();

//using params Middleware

// router.param('id', tourcontrollers.checkId);

//Adding the Top-5-Cheap Tours Midddleware

router
  .route('/top-5-cheap')
  .get(tourcontrollers.cheaproutes, tourcontrollers.getAllTours);

router
  .route('/')
  .get(tourcontrollers.getAllTours)
  .post(tourcontrollers.createTour);

router
  .route('/:id')
  .get(tourcontrollers.getTour)
  .patch(tourcontrollers.updateTour)
  .delete(tourcontrollers.deleteTour);

module.exports = router;
