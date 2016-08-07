var app = process.env.app;
var chunkConfig=require("./config"+app+"Config.js");
module.exports = chunkConfig;