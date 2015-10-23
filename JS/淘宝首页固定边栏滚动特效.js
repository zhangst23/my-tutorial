// 淘宝首页固定边栏滚动特效.js


//jquery技术实现
var jWindow = $(window);
jWindow.scroll(function(){
	var scrollHeight = jWindow.scrollTop();
	var scrollHeight = jWindow.height();
	var sideHeight = $('#J_BdSide').height();
	if (scrollHeight+scrollHeight>sideHeight) {
		$('#J_BdSide').css({
			'position':'fixed',
			'top':-(sideHeight-screenHeight),
			'right':0
		})
	}else{
		$('#J_BdSide').css({
			'position':'static'
		})
	};
})


window.onload = function(){
	jWindow.trigger('scroll');
};
jWindow.resize(function(){
	jWindow.trigger('scroll');
})



//javascript 技术实现
var $ = function(id){
	return document.getElementById(id);
}

var addEvent = function(obj,enent,fn){
	if (obj.addEventListener) {
		obj.addEventListener(event,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+event,fn);
	};
}

var domSider = $('#J_BdSide');
addEvent(window,'scroll',function(){
	var sideHeight = domSider.offsetHeight;
	var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;
	var scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
	if (scrollHeight+screenHeight>sideHeight) {
		domSider.style.cssText = 'position:absolute;right:0px;top:'+(-(sideHeight-screenHeight))+'px';
	}else{
		domSider.style.position='static';
	};
})
addEvent(window,'scroll',function(){
	scrollEvent();
});
addEvent(window,'resize',function(){
	scrollEvent();
})




























