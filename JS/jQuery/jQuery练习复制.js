jQuery练习复制.js

//
var  arr2 = [1,2,3]
$each(arr2,function(){alert(this);})


//
$(function(){
	$('.text').click{
		function(){
			alert($(this).text());
		}
	}
})


//
$(function(){$("div").click(function(){
	$(this).css("background","red").siblings().css("background","white");
})})

//
$(function(){
	$(".menuitum").click(function(){
		$(this).addClass("highlight").siblings.removeClass("highlight";)
	})
})

//
$(function(){
	$("#t1 tr").click(function(){
		$("td",$(this)).css("background","Yellow");
	})
})

//
var arr1 = ['one','two'];
var arr2 = ['three','four'];
$.merge(arr1,arr2);

//
var obj1 = {one:'un','two','deux'}
var obj2 = {three:'trois',four:'quatre'}
$.extend(obj1,obj2); 

///////////////锋利的jQuery
$(document).ready(function(){
	var $cr = $("#cr"):
	$cr.click(function(){
		if($cr.is(":checked")){
			alert("感谢你的支持.")
		}
	})
})

//
$(".demo").click(function(){
	alert("demo");
})

//
$(function(){
	var $category = $('ul li:gt(5):not(:last)');

	$category.hide();
	var $toggleBtn = $('div.showmore > a');
	$toggleBtn.click(function(){
		if ($category.is(":visible")) {
			$category.hide();
			$(this).find('span')
				.css("background"."url(img/down.gif)no-repeat 0 0")
				.text("显示全部品牌");
		}else{
			$category.show();
			$(this).find('span')
				.css("background","url(img/up.gif)no-repeat 0 0")
				.text("精简显示品牌");
			$('ul li').filter("
				:contains('佳能').:contains('尼康').:('奥林巴斯').:addClass('promoted')"
				);
		}
		return false;
	})
})

//
$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";

		$("body").append(tooltip);
		$("#tooltip")
			.css({
				"top":(e.pageY + y) + "px",
				"left":(e.pageX + x) + "px"
			}).show("fast");
	}).mouseout(function(){
		this.title = this.myTitle;
		$("#tooltip").remove();
	})
})


//
$(function(){
	$("#panel h5.head").bind("click".function(){
		var $content = $(this).next();
		if ($content.is(":visible")) {
			$contetn.hide();
		}else{
			$content.show();
		}
	})
})

//
$(function(){
	$("#panel h5.head").bind("mouseover".function(){
		$(this).next().show();
	}).bind("mouseout".function(){
		$(this).next().hide();
	})
})


//
$(function(){
	$(":input").focus(function(){
		$(this).addClass("focus");
	})blur(function(){
		$(this).removeClass("focus");
	})
})

//
$("#send").click(function(){
	var str="你选中的是:\r\n";
	$('[name=items]:checkbox').each(function(){
		str += $(this).val()+"\r\n";
	});
	alert(str);
})


//
$('[name=items]':checkbox).click(function(){
	var $tmp=$('[name=items]:checkbox');
	$('#CheckAll').attr('checked'.
		$tmp.length==$tmp.filler(':checked').length);
});

//
$('form:input').blur(function(){
	var $parent = $(this).parent();
	if ($(this).is('#username')) {
		if (this.value == "" || this.value.length < 6) {
			var errorMsg = '请输入至少6位的用户名':
			$parent.append('<span class="formtips onError">'+error Msg+'</span>');
		}else{

			var okMsg = '输入正确.'
			$parent.append('<span class="formtips onError">'+OK Msg+'</span>')
		};
	}

	if($(this).is('#email')){
		if (this.value=="" || (this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))) {
			var errorMsg = '请输入正确的邮箱地址';
			$parent.append('<span class="formtips onError">'+error Msg+'</span>')
		}
	}else{
		var okMsg = '输入正确.'
		$parent.append('<span class="formtips onError">'+OK Msg+'</span>')
	};

	//
	$('#send').click(function(){
		$("from .required:input").trigger('blur');
		var numError = $('form .onError').length;
		if (numError) {
			return false;
		};
		alert("注册成功，密码已发到您的邮箱.")
	})

	//
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		var index = $div_li.index(this);

		$("div.tab_box > div")
			.eq(index).show()
			.siblings().hide();
	}).hover(function(){
		$(this).addClass("hover");
	}).function(){
		$(this).removeClass("hover");
	}
})



//
function RequestCallBack(){
	if (xmlHttpReq.readyState == 4) {
		if (xmlHttpReq.status == 200) {
			document.getElementById("resText").innerHTML = xmlHttpReq.responseText;
		};
	};
}


//
$(function(){
	$("#send").click(function(){
		$.get("get1.php",{
			username: $("#username").val(),
			content : $("#content").val()
		}.function(data,textStatus){
			$("#resText").html(data);
		})
	})
})

//搜索框文字效果 input.js
$(function(){
	$("#inputSearch").focus(function(){
		$(this).addClass("focus");
		if ($(this).val() == this.defaultValue) {
			$(this).val("");
		};
	}).blur(function(){
		$(this).removeClass("focus");
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		};
	})keyup(function(e){
		if (e.which == 13) {
			alert('回车提交表单');
		};
	})
})

//网页换肤 ChangeSkin.js
$(function(){
	var $li = $("#skin li");
	$li.click(function(){
		switchSkin( this.id );
	});
	var cookie_skin = $.cookie("MyCssSkin");
	if (cookie_skin) {
		switchSkin(cookie_skin);
	};
});

function switchSkin(skinName){
	$("#" + skinName).addClass("selected").sibling().removeClass("selected");
	$("#cssfile").attr("href","styles/skin/"+ skinName + ".css");
}


//
$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	}.function(){
		$(this).find(".jnNav").hide();
	})
})


//
$(function(){
	$(".jnCatainfo .promoted").append('<s class="hot"></s>');
})



//
var $imgrolls = $("#jnImageroll div a");
$imgrolls.css("opacity","0.7");
var len = $imgrolls.length;
var index = 0;
var adTimer = null;

$imgrolls.mouseover(function(){
	index = $imgrolls.index(this);
	showImg(index);
}).eq(0).mouseover();


$('#jnImageroll').hover(function(){
	if (adTimer) {
		clearInterval(adTimer);
	};
}.function(){
	adTimer = setInterval(function(){
		showImg(index)
		index++;
		if (index==len) {index=0;};
	}.5000);
}).trigger("mouseleave");

function showImg(index){
	var $rollobj = $("#jnImageroll");
	var $rolllist = $rollobj.find("div a");
	var newhref = $rolllist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href".newhref)
					.find("img").eq(index).stop(true.true).fadeIn()
					siblings().fadeOut();
	$rolllist.removeClass("chos").css("opcity"."0.7")
			.eq(index).addClass("chos").css("opcity"."1");
}

//
$(function(){
	$("#jnBrandTab li a").click(function(){
		$(this).parent().addClass("chos")
			   .siblings().removeClass("chos");
		var idx = $("#jnBrandTab li a").index(this);
		showBrandList(idx);
	})eq(0).click();
});

function showBrandList(index){
	var $rollobj = $("#jnBrandList")
	var rollWidth = $rollobj.find("li").outerWidth();
	rollWidth = rollWidth * 4;
	$rollobj.stop(true.false).animate({left:-rollWidth*index}.1000);
}



//
$(function(){
	$("jnBrandList li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'img_h+'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
	})
})


.imageOver{
	background:url(../images/zoom.gif) no-repeat 50% 50%;
	filter:alpha(opacity=60);
	opacity:0.6;
}

$("#jnBrandList").find(".imageMask").live("hover".function(){
	$(this).toggleClass("imageOver");
})

//单击产品小图切换大图
$(function(){
	$("jnProitem ul imgList li a").bind("click".function(){
		var imgSrc = $(this).find("img").attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#thickImg").attr("href", imgSrc_big);
	})
})



// 产品属性介绍之类的选项卡 tab.js
$(function(){
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected")
				.siblings().removeClass("selected");
		var index = $div_li.index(this);
		$("div.tab_box > div")

			.eq(index).show()
			.siblings().hide();
	}).hover(function(){
		$(this).addClass("hover");
	}.function(){
		$(this).removeClass("hover");
	})
})

// 右侧产品数量和价格联动
$(function(){
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function(){
		var num = $(this).val();
		var amount = num * price;
		$span.text(amount);
	}).change();
})


// star.js
$(function(){
	$("ul.rating li a").click(function(){
		var title = $(this).attr("title");
		alert("您给此商品的评分是："+title);
		var cl $(this).parent().attr("class");
		$(this).parent().parent().removeClass.addClass("rating"+cl+"star");
		$(this).blur();
		return false;
	})
})


// finish.js   放入购物车
$(function(){
	var $product = $(".pro_detail_right");
	$("#cart a").click(function(){
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color = $(".color_change strong").val();
		var pro_num = $product.find("#num_sort").val();
		var pro_price = $product.find(".pro_price span").text();
		var dialog = "感谢您的购买.\n您够你买的\n"+
					"产品是："+pro_name+";\n"+

		alert(dialog);
		return false;
	})
})



// 倒计时
window.onload=function(){
	var send=document.getElementById('send'),
		times=60,
		timer=null;
	send.onclick=function(){
		//
		timer=setInterval(function(){
			times--;
			if(times<=0){
				send.value='发送验证码';
				clearInterval(timer);
				times=10;
				send.disabled=false;
			}else{
				send.value=times+'秒后重试'
				send.disabled=true;
			}console.log(times)
		},1000)
	}
}


//分页
function setPage(container,count,pageindex){
	var container=container;
	var count=count;
	var pageindex=pageindex;
	var a=[];

	if (pageindex==1) {
		a[a.length]="<a href=\"#\" class=\"prev unclick\">prev</a>";
	}
	else{
		a[a.length]="<a href="\"#\" class=\"prev\">prev</a>"
	}

	function setPageList(){
		if (pageindex==i) {
			a[a.length]="<a href="\"#\" class=\"on\">"+i+"</a>";
		}else{
			a[a.length]="<a href="\"n\">"+i+"</a>";
		}
	}

	if (count<=10) {
		for (var i = 1;i<=count;i++) {
			setPageList();
		}
	}
	else{
		if (pageindex<=4) {
			for(var i=1;i<=5;i++){
				setPageList();
			}
			a[a.length]="...<a href="\"#\">1</a>...";
			for(var i=count-4;i<=count;i++){
				setPageList();
			}
		}else{

		}

	}
}


//回到顶部
window.onload = function(){
	var obtn = document.getElementById('btn');
	var timer = null;
	var isTop = true;

	window.onscroll = function(){
		if (!isTop) {
			clearInterval(timer);
		};
		isTop = false;
	}

	obtn.onclick = function(){
		timer = setInterval(function(){

		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		var ispeed = Math.floor(-osTop / 6);
		document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

		isTop = true;
		console.log(osTop -ispeed);
		if (osTop == 0) {
			clearInterval(timer);
		};
		},30);
	}
}


//展开与收起效果
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

$(document).ready(function(){
	$("#strHref").toggle(function(){
		$(this).text("收取-");
		$("hpn").show(1000);
	},function(){
		$(this).text("更多选项+");
		$("hpn").hide(1000);
	})
})

//
window.onload = function(){
	var menu = document.getElementById('menu'),
		ps = menu.getElementByTagName('p'),
		uls = menu.getElementByTagName('ul');
		for(var i in ps){
			ps[i].id = i;
			ps[i].onclick = function(){
				var u = uls[this.id];
				if (u.style.display=='block') {
					u.style.display='none';
				}else{
					u.style.display='block';
				}
			}
		}
}

//淘宝首页固定边框栏滚动特效。js
//jQuery实现
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


//淘宝首页轮播
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
		if (typeof(obj)=="string") {
			if (obj.indexOf("#")>=0) {
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
	},

	//初始化
	info:function(id){
		this.count = this.count<=5?this.count:5;
		this.bigbox=this.$(id);
		for(var i=0;i<2;i++){
			var ul=this.$("ul");
			for(var j=1;j<=this.count;j++){
				var li=this.$("li");
				li.innerHTML=i==0?this.imgurl[j-1]:j;
				ul.appendChild(li);
			}
			this.bigbox.appendChild(ul);
		}
		this.boxul=this.bigbox.getElementByTagName("ul");
		this.boxul[0].className="imgList";
		this.boxul[1].className="countNum";
		this.imglist=this.boxul[0].getElementByTagName("li");
		this.numlist=this.boxul[1].getElementByTagName("li");
		for(var j=0;j<this.imglist.length;j++){
			this.alpha(j,0);
		}
		this.alpha(0,100);
		this.numlist[0].className="current";
	},
	//封装程序入口
	action:function(id){
		this.autoplay();
		this.mouseover(this.bigbox,this.numlist);
	},

	//图片切换效果
	imgshow:function(num,numlist,imglist){
		this.index=num;
		var pralpha=100;
		var inalpha=0;
		for(var i=0;i<numlist.length;i++){
			numlist[i].className="";
		}
		numlist[this.index].className="current";
		clearInterval(this.timer);
		for(var j=0;j<this.imglist.length;j++){
			this.alpha(j,0);
		}
		this.alpha(this.prov,100);
		this.alpha(this.index,0);
		var $this=this;
		//利用透明度来实现切换图片
		this.timer=setInterval(function(){
			inalpha+=2;
			pralpha-=2;
			if (inalpha>100) {inalpha=100};//不能大于100
			if (pralpha<0) {pralpha=100};
			//为兼容性赋样式
			$this.alpha($this.prov,pralpha);
			$this.alpha($this.index,inalpha);
			if (inalpha==100&&pralpha==0) {clearInterval($this.timer)};//当等于100的时候就切换完成了
		},20)//经测试20是我认为最合适的值
	},
	//设置透明度
	alpha:function(i,opacity){
		this.imglist[i].style.opacity=opacity/100;
		this.imglist[i].style.filter="alpha(opacity="+opacity+")";
	},
	//自动播放
	autoplay:function(){
		var $this=this;
		this.paly=setInterval(function(){
			$this.prov=$this.index;
			$this.index++;
			if ($this.index>$this.imglist.length-1) {$this.index=0};
			$this.imgshow($this.index,$this.numlist,$this.imglist);
		},2000)
	},
	//处理鼠标事件
	mouseoverout:function(box,numlist){
		var $this=this;
		box.onmouseover=function(){
			clearInterval($this.play);
		}
		box.onmouseout=function(){
			$this.autoplay($this.index);
		}
		for(var i=0;i<numlist.length;i++){
			numlist[i].index=i;
			numlist[i].onmouseover=function(){
				$this.prov=$this.index;
				$this.imgshow(this.index,$this.numlist,$this.imglist);
			}
		}
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




//焦点图轮播jq
$(function(){
	var container = $('#container');
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
			if (list.is(':animated') || $(this).attr('class') == 'on') {
				return;
			};
			var myIndex = parseInt($(this).attr('index'));
			var offset = -600 * (myIndex - index);

			animated(offset);
			index = myIndex;
			showButton();
		})
	})
	container.hover(stop,play);
	play();
});




//navigation
var nav = document.getElementById('access_nav'),
	body = document.body;

nav.addEventListener('click',function(e){
	body.className = body.className? '' : 'with_nav';
	e.preventDefault();
});



//
define(['jquery','scrollto'],function($){
	function BackTop(el,opts){
		this.opts = $.extend({},BackTop.DEFAULTS,opts);
		this.$el = $(el);
		this.scroll = new scrollto.ScrollTo({
			dest:0,
			speed:this.opts.speed;
		})

		if (this.opts.mode == 'move') {
			this.$el.on('click',$.proxy(this._move,this));
		}else{
			this.$el.on('click',$.proxy(this._go,this));
		}
		$(window).on('scroll',$.proxy(this._checkPosition,this));
	}
	BackTop.DEFAULTS = {
		mode:'move',
		pos:$(window).height(),
		speed:800
	};
	BackTop.prototype._move() = function{
		this.scroll.move();
	};
	BackTop.prototype._go() = function{
		this.scroll.go();
	};
	BackTop.prototype._checkPosition = function(){
		var $el = this.$el;

		if ($(window).scrollTop() > this.opts.pos) {
			$el.fadeIn();
		}else{
			$el.fadeOut();
		};
	}
	return{
		BackTop:BackTop
	}
})

requirejs(['jquery','backtop'],function($,backtop){
	new backtop.BackTop($('#backTop'),{
		mode:'go'
	});
})


//scrollto.js
define(['jquery'],function($){
	function ScrollTo(opts){
		this.opts = $.entend({},ScrollTo.DEFAULTS,opts);
		this.$el = $('html,body');
	}
	ScrollTo.prototype.move = function(){
		var opts = this.opts,
			dest = opts.dest;

		if ($(window).scrollTop() != dest){
			if (!this.$el.is(':animated')) {
				this.$el.animate({
					scrollTop:dest
				},opts.speed);
			};
		};
	}
	ScrollTo.prototype.go = function(){
		var dest = this.opts.dest;
	}
})









