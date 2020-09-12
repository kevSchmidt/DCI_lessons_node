const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// ======== Top 5 Cheapest Tours ===
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// ======== Tours Statistics ===
router.route('/tour-stats').get(tourController.getTourStats);

// ======== Tours Planning (for a given year) ===
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// ======== Root Route ===
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// ======== By ID ===
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
