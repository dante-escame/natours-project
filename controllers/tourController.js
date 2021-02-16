// const fs = require('fs');
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
		const tours = await Tour.find();
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
			message: 'Dados inválidos'
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
