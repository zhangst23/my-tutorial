



// $(document).ready(function(){
// 	$("#btn").on("click",function(){
// 		$.get("Server.php",{name:$("#namevalue").val()},function(data){
// 			$("#result").text(data);
// 		})
// 	})
// })






$(document).ready(function(){
	$("#btn").on("click",function(){
		$("#result").text("请求数据中，请稍后...")
		$.post("Server.php",{name:$("#namevalue").val()},function(data){
			$("#result").text(data);
		}).error(function(){
			$('#result').text('通讯有问题');
		});
	})
})




































