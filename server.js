var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mammals');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function callback(){
	})



var mammalSchema = new mongoose.Schema({
	name: String,
	type: String,
	year_extinct: Number
})

var Mammal = mongoose.model('Mammals', mammalSchema);

// var dolphin = new Mammal({name: 'Something else', type: 'mammal', years_extinct: 2003})

// dolphin.save(function (err, dolphin){
// 	if (err) return console.log(err);
// });


function GetMammals() {}
GetMammals.prototype.find = function(id) {}
GetMammals.prototype.findIndex = function(id) {}
GetMammals.prototype.findAll = function(id) {
	return this.mammals;
}
GetMammals.prototype.save = function(mammals) {}
GetMammals.prototype.remove = function(id) {}


//ENDPOINT
app.get('/mammals', function (req, res){
	console.log('Get endpoint request...')
	Mammal.find(function (error, mammals){
		try {
			res.json(mammals.sort());
		} catch (exception) {
			res.send(404);
		}
	});
});


app.post('/mammals', function (req, res){
	console.log('Post mammals...')
	var newMammal = new Mammal({
		name: req.body.name,
		type: req.body.type,
		year_extinct: req.body.year_extinct
	});
	console.log(newMammal);
	newMammal.save(function (err, newMammal){
		console.log('mammals saved it')
		if (err) {
			return console.log(err)
		} else {
			res.send({success: true})
		}
	});
});
	// app.get('/mammals', function (req, res) {
	// 	var filter = {};
	// 	mammalSchema.find(filter);
	// 	.sort('name')
	// 	.exec(function(err, mammals){
	// 		res.send(mammals);
	// 	})
	// })

// app.save('/mammals', function (req, res){
// 	console.log('saved mams');
// })

//var Customer = mongoose.model('Customer', CustomerSchema)

//var acme = new Customer({business_name: "Evenote"});
//acme.save();


app.use(express.static(__dirname + '/public'));


app.listen(3000);