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
app.post('/save', function (req, res) {
	res.send("serveri pool: salvestamine")
	dataBase.push(req.body)
	dataBase.sort(function (a, b) {
		return b.score - a.score;
	});

	fs.writeFileSync("dB.json", JSON.stringify(dataBase, null, 2))

})


app.post('/load', function (req, res) {
	
    res.send(dataBase.slice(0, 10))

})