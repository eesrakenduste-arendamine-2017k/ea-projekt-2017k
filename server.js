var fs = require("fs")
var dataBase=JSON.parse(fs.readFileSync("dB.json", "utf8"))


var express = require("express")
	var bodyParser = require('body-parser')
	
	var app = express()
	app.use('/', express.static('./public'))
	app.use(bodyParser.urlencoded({
			extended: false
		}))
	app.use(bodyParser.json())
	app.listen(3000);

app.post('/', function (req, res) {
	res.send("test")
	dataBase.push(req.body)
fs.writeFileSync("dB.json", JSON.stringify(dataBase, null, 2))	
	
})







 