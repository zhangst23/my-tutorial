var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/create", function(req, res,) {
  if (req.query.name === "leo") {
  	res.send("create user");
  }else{
  	res.send("error")
  };
  
});

module.exports = router;
