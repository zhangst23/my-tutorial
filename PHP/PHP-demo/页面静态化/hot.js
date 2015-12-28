
//ajax
$.ajax({
	url:'http://state.com/api/hot.php',
	type:'get',
	dataType:'json',
	error:function(){

	},
	success:function(result){
	  html = '';
		$.each(result.data,function(key,value){
			
			html += '<li><a href="/">'+value.title+'</a></li>';
		});

		$("#hot_html").html(html);
	}
})
