const express = require('express');
const {
	getMonthlyPlan,
	aliasTopTours,
	getTourStats,
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);

router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/tour-stats').get(getTourStats);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
