const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Um tour precisa ter um nome'],
		unique: true
	},
	price: {
		type: Number,
		required: [true, 'Um tour precisa ter um preço']
	},
	rating: {
		type: Number,
		default: 4.5
	}
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
