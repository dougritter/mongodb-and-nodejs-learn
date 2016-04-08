var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./model/mongo");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/", function(req,res) {
	res.json({"error" : false, "message" : "Hello, World"});
});


router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req, res) {
    	var db = new mongoOp();
    	var response = {};

    	db.userEmail = req.body.email;
    	db.userPassword = req.body.password
		
		db.save(function(err) {
			if (err) {
				response = {"error" : true, "message" : "Error adding data"};
			} else {
				response = {"error" : false, "message" : "Data added"};
			}
			res.json(response);
		});
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");


