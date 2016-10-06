var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({
	nama_node:{
		type:String,
		required:true
	},
	posisi_x:{
		type:String,
		required:true
	},
	posisi_y:{
		type:String,
		required:true
	},
	konsentrasi_gas:{
		type:Number,
		required:true
	},
	waktu_kirim:{
		type: String,
		default:new Date().toUTCString()
	}
});

module.exports = mongoose.model('Data_node',DataSchema);
