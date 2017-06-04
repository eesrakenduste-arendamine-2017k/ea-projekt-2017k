// node.js + express
var fs = require("fs")
	var express = require("express")
	var bodyParser = require('body-parser')
	var dataBase = JSON.parse(fs.readFileSync("dB.json", "utf8"))

	var app = express()
	app.use('/', express.static('./public'))
	app.use(bodyParser.urlencoded({
			extended: false
		}))
	app.use(bodyParser.json())
	app.listen(3000);
//andmete salvestamine dB.json faili
app.post('/', function (req, res) {
	res.send("test")
	dataBase.push(req.body)
	dataBase.sort(function (a, b) {
		return b.score - a.score;
	});

	fs.writeFileSync("dB.json", JSON.stringify(dataBase, null, 2))

})

//dB.json failist andmete lugemine kliendi poolele
app.get('/top', function (req, res) {
	console.log("request")
	res.send(dataBase.slice(0, 10))

})
console.log(dataBase);