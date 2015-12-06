var router = require("express").Router();

//原代码
// router.get("/",function(req,res){
// 	res.locals.user = {
// 		name:'leo',
// 		age:22
// 	}
// 	res.locals.page = {
// 		title:"jsera.net 专注于H5 & NodeJS 技术推广"
// 	}
// 	res.render("user");
// })


//改进后的代码
function page(req,res,next){
	res.locals.page = {
		title:"jsera.net 专注于H5 & NodeJS 技术推广"
	}
	next();
}
function user(req,res,next){
	res.local.user = {
		name:'leo',
		age:22
	}
	next();
}
router.get("/",page,user,function(req,res){
	res.render("user");
})


// 不要极端

// 上述代码，感觉路由器本身就是一行渲染代码res.render，其实这里可以是一个 action 或叫 controller ，所以逻辑代码可以放在这里，下面的伪代码说明如何掌握这个度：

// var router = require("express").Router();

// router.get("/",page,user,function action(req,res){

//     if(locals.user.name === "leo"){
//         locals.user.admin = true;
//     }else{
//         locals.user.admin = false;
//     }

//     if(locals.user.age > 18){
//         locals.user.adults = true;
//     }

//     res.render("user");
// })

// module.exports = router;
// 上面代码说明了，逻辑代码要放在路由器当中，进入路由器之前的 验证和数据 需要和路由器分离。（这么说有些武断，我认为这种分离是最合理的，并不是强制一定要这样，可根据自己的理解对这种分离技巧，进行优化）





module.exports = router;