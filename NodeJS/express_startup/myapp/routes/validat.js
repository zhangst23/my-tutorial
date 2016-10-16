var router = require("express").Router();

router.get("/create",function(req,res,next){
	if (req.query.name === "leo") {
		next();
	}else{
		res.send("error!");
	};
})

module.exports = router;