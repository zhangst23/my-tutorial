$(document).ready(function(){
	$("body").text("wait...")
	$("body").load("box.html",function(a,status,c){
		console.log(status);
		if(status == "error"){
			$("body").text("判断加载失败");
		}
	});


	$.getScript("HelloJS.js").complete(function(){
		sayHello();
	})
})