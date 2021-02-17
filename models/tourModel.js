const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Um tour precisa ter um nome'],
		unique: true,
		trim: true
	},
	duration: {
		type: Number,
		required: [true, 'Um tour precisa de uma duração']
	},
	maxGroupSize: {
		type: Number,
		required: [true, 'Um tour precisa de um tamanho de grupo']
	},
	difficulty: {
		type: String,
		required: [true, 'Um tour precisa de dificuldade']
	},
	price: {
		type: Number,
		required: [true, 'Um tour precisa ter um preço']
	},
	ratingsAverage: {
		type: Number,
		default: 4.5
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true,
		required: [true, 'Um tour precisa de uma descrição']
	},
	description: {
		type: String,
		trim: true
	},
	imageCover: {
		type: String,
		required: [true, 'Um tour precisa de uma imagem de capa']
	},
	images: [String],
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false
	},
	startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
