const express = require('express');

const userController = require('../Controllers/usercontroller');

const router = express.Router();

router
  .route('/')
  .get(userController.getalluser)
  .post(userController.createuser);

router
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

module.exports = router;
