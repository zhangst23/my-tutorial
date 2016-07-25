// js-demo-pra.js
1.0    js轮播


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>taobao首页轮播原生js面对对象封装版</title>/
<style>

body, ul, li, p {
	margin: 0;
	padding: 0;
}
ul{
	list-style-type:none;
}
body {
	font-family:"Times New Roman", Times, serif;
}
#box {
	position:relative;
	width:492px;
	height:172px;
	margin:10px auto;
}
#box .imgList{
	position:relative;
	width:490px;
	height:170px;
	overflow:hidden;
}
#box .imgList li{
	position:absolute;
	top:0;
	left:0;
	width:490px;
	height:170px;
}
#box .countNum{
	position:absolute;
	right:0;
	bottom:5px;
}
#box .countNum li{
	width:20px;
	height:20px;
	float:left;
	color:#fff;
	border-radius:20px;
	background:#f90;
	text-align:center;
	margin-right:5px;
	cursor:pointer;
	opacity:0.7;
	filter:alpha(opacity=70);
}
#box .countNum li.current{
	background:#f60;
	font-weight:bold;
	opacity:1;
	filter:alpha(opacity=70);
}

</style>/
<script>
function runImg(){}
runImg.prototype={
	bigbox:null,
	boxul:null,
	imglist:null,
	numlist:null,
	prov:0,
	index:0,
	timer:null,
	play:null,
	imgurl:[],
	count:0,
	$:function(obj){
		if(typeof(obj)=="string"){
			if(obj.indexof("#")>=0){
				obj=obj.replace("#","");
				if (document.getElementById(obj)) {
					return document.getElementById(obj);
				}else{
					alert("没有容器"+obj);
					return null;
				}

			}else{
				return document.createElement(obj);
			}
		}else{
			return obj;
		}
	}

//初始化
info:function(id){
	this.count=this.count<=5?this.count:5;
	this.bigbox=this.$(id);
	for (var i = 0; i < 2; i++) {
		var ul=this.$("ul");
		for (var j = 0; j < this.count; j++) {
			var li=this.$("li");
			li.innerHTML=i==0?this.imgurl[j-1]:j;
			ul.appendChild(li);
		};
		this.bigbox.appendChild(ul);
	};
	this.boxul=this.bigbox.getElementsByTagName("ul");
	this.boxul[0].className="imgList";
	this.boxul[1].className="countNum";
	this.imglist=this.boxul[0].getElementsByTagName("li");
	this.numlist=this.boxul[1].getElementsByTagName("li");
	for (var i = 0; i < this.imglist.length; i++) {
		this.alpha(j,0);
	};
	this.alpha(0,100);
	this.numlist[0].className="current";
}
//封装程序入口
action:function(id){
	this.autoplay();
	this.mouseouverout(this.bigbox,this.numlist);
}
//图片切换效果
imgshow:function(num,numlist,imglist){
	this.index=num;
	var pralpha=100;
	var inalpha=0;
	for (var i = 0; i < numlist.length; i++) {
		numlist[i].className="";
	};
	numlist[this.index].className="current";
	clearInterval(this.timer);
	for (var j = 0; j < this.imglist.length; j++) {
		this.alpha(j,0);
	};
	this.alpha(this.prov,100);
	this.alpha(this.index,0);
	var $this=this;
	//利用透明度来实现切换图片
	this.timer = setInterval(function(){
		inalpha+=2;
		pralpha-=2;
		if (inalpha>100) {inalpha=100};//不能大于100
		if (pralpha<0) {pralpha=100};
		//为兼容性赋样式
		$this.alpha($this.prov,pralpha);
		$this.alpha($this.index,inalpha);
		if (inalpha==100&&prapha==0) {clearInterval($this.timer)};//当等于100的时候就切换完成了
	},20)//经测试20是我认为最合适的值
}，
//设置透明度
alpha:function(i,opacity){
	this.imglist[i].style.opacity=opacity/100;
	this.imglist[i].style.filter="alpha(opacity="+opacity+")";
},
//自动播放
autoplay:function(){
	var $this=this;
	this.play=setInterval(function(){
		$this.prov=$this.index;
		$this.index++;
		if ($this.index>$this.imglist.length-1) {$this.index=0};
		$this.imgshow($this.index,$this.numlist,$this.imglist);
	}.2000)
},
//处理鼠标事件
mouseouverout:function(box,numlist){
	var $this=this;
	box.onmouseover=function(){
		clearInterval($this.play);
	}
	box.onmouseout=function(){
		$this.autoplay($this.index);
	}
	for (var i = 0; i < numlist.length; i++) {
		numlist[i].index=i;
		numlist[i].onmouseover=function(){
			$this.prov=$this.index;
			$this.imgshow(this.index,$this.numlist,$this.imglist);
		}
	};
}
}
window.onload=function(){
	var runimg=new runImg();
	runimg.count=5;
	runimg.imgurl=[
		"<img src=\"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg\"/>",
		"<img src=\"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png\"/>",
		"<img src=\"http://i.mmcdn.cn/simba/img/T1OVOUXeNjXXXXXXXX.jpg\"/>",
		"<img src=\"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg\"/>",
		"<img src=\"http://img03.taobaocdn.com/tps/i3/T1ITuTXbRnXXXXXXXX-490-170.png\"/>"];
	runimg.info("#box");
	runimg.action("#box");
}

</script>
</head>

<body>
<center><h1>Author:wyf</h1><p>2012/2/25</p></center>
<div id="box"></div>
</body>
</html>/


2.0    焦点图轮播jq
$(function(){
	var contaimer = $('#container');
	var list = $('#list');
	var buttons = $('#buttons span');
	var prev = $('#prev');
	var next = $('#next');
	var index = 1;
	var len = 5;
	var interval = 3000;
	var timer;

	function animate(offset){
		var left = parseInt(list.css('left')) + offset;
		if (offset>0) {
			offset = '+=' + offset;
		}else{
			offset = '-=' + Math.abs(offset);
		};
		list.animate({'left':offset},300,function(){
			if (left > -200) {
				list.css('left',-600 * len);
			};
			if (left < (-600 * len)) {
				list.css('left',-600)
			};
		});

	}
	function showButton(){
		buttons.eq(index-1).addClass('on').siblings().removeClass('on');
	}
	function play(){
		timer = setTimeout(function(){
			next.trigger('click');
			play();
		},interval);
	}
	function stop(){
		clearTimeout(timer);
	}
	next.bind('click',function(){
		if (list.is(':animated')) {
			return;
		};
		if (index == 5) {
			index = 1;
		}else{
			index += 1;
		};
		animate(-600);
		showButton();
	});
	prev.bind('click',function(){
		if (list.is(':animated')) {
			return;
		};
		if (index == 1) {
			index = 5;
		}else{
			index -= 1;
		}
		animate(600);
		showButton();
	});
	buttons.each(function(){
		$(this).bind('click',function(){
			if (list.is(':animated') || $(this).attr('class') == 'on' {
				return;
			};
			var myIndex = parseInt($(this).attr('index'));
			var offset = -600 * (myIndex - index);

			animate(offset);
			index = myIndex;
			showButton();
		})
	})
		container.hover(stop,play);

		play();



});










