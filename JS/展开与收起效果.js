// 展开与收起效果.js
function showdiv(){
	document.getElementById("hpn").style.display = "block";
	document.getElementById("strHref").innerHTML = "收起-";
	document.getElementById("strHref").href = "javascript:hidediv()";
}

function hidediv(){
	document.getElementById("hpn").style.display = "none";
	document.getElementById("strHref").innerHTML = "更多选项+";
	document.getElementById("strHref").href = "javascript:showdiv()";
}


//jQuery实现点击按钮展开和收起运动功能
$(document).ready(function(){
	$("#strHref").toggle(function(){
		$(this).text("收起-");
		$("hpn").show(1000);
	},function(){
		$(this).text("更多选项+");
		$("hpn").hide(1000);
	})
})


//使用js实现文字内容展开效果
function showdiv(obj){
	var x = obj.parentNode;  //摘要
	var y = x.nextSibling;   //正文
	y.style.display = "block";
	x.style.display = "none";
}

function hidediv(obj){
	var y = obj.parentNode.parentNode;  //正文
	var x = y.previousSibling;  //摘要
	x.style.display:"block";
	y.style.display:"none";
}




































