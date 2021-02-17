// const fs = require('fs');
// eslint-disable-next-line import/no-useless-path-segments
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
// 	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
// 	console.log(`Id do tour: ${val}`);
// 	if (req.params.id * 1 > tours.length) {
// 		return res.status(404).json({
// 			status: 'fail',
// 			message: 'ID inválido'
// 		});
// 	}
// 	next();
// };

// exports.checkNameAndPrice = (req, res, next) => {
// 	if (!req.body.name || !req.body.price) {
// 		return res.status(400).json({
// 			status: 'fail',
// 			message: 'Falta nome e/ou preço'
// 		});
// 	}
// 	next();
// };

exports.getAllTours = async (req, res) => {
	try {
		// BUILD QUERY
		// 1) Filtering
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		const queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((el) => delete queryObj[el]);

		// 2) Advanced Filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);
		console.log();

		const query = Tour.find(JSON.parse(queryStr));

		// EXECUTE QUERY
		const tours = await query;

		// const tours = await Tour.find()
		// 	.where('duration')
		// 	.equals(5)
		// 	.where('dificulty')
		// 	.equals('easy');

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: tours.length,
			requestedAt: req.requestTime,
			data: { tours }
			// results: tours.length,
			// data: {
			// 	tours
			// }
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Dados inválidos'
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		// Tour.findOne({ _id: req.params.id })
		res.status(200).json({
			status: 'success',
			data: { tour }
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'Dados inválidos'
		});
	}
};
exports.createTour = async (req, res) => {
	try {
		// const newTour = new Tour({
		// 	newTour.save()
		// });
		console.log(req.body);
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { tour: newTour }
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		res.status(200).json({
			status: 'success',
			data: { tour }
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Dados inválidos'
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Dados inválidos'
		});
	}
};
