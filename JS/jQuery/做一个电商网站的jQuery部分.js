做一个电商网站的jQuery部分.js
在开始编写jQuery代码之前，先确定应该完成哪些功能

在网站首页（index.html）上将完成如下功能。
-搜索框文字效果
-网页换肤
-导航效果
-左侧商品分类热销效果
-中间大屏广告效果
-右侧最新动态模块内容添加超链接提示
-右侧下部品牌活动横向滚动效果
-右侧下部鼠标滑过产品列表效果

在详细页(detail.html)上将完成如下功能。
-产品图片放大镜效果
-产品图片遮罩层效果
-单击产品小图片切换大图
-产品属性介绍之类的选项卡
-右侧产品颜色切换
-右侧产品尺寸切换
-右侧产品数量和价格联动
-右侧给产品评分的效果
-右侧放入购物车


1.搜索框文字效果(input.js)

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


2.网页换肤(changeSkin.js)--需要引入 jquery.cookie.js 插件。

$(function(){
	var $li = $("#skin li");
	$li.click(function(){
		switchSkin( this.id );
	});
	var cookie_skin = $.cookie("MyCssSkin");
	if (cookie_skin) {
		switchSkin( cookie_skin );
	};
});
function switchSkin(skinName){
	$("#" + skinName).addClass("selected").sibling().removeClass("selected");
	$("#cssfile").attr("href","styles/skin/"+ skinName + ".css");
			//设置不同皮肤
	$.cookie("MyCssSkin",skinName.{ path:'/'.expires:10 });
}

	//将以上代码放到一个名为changeSkin.js的文件里，然后在index.html页面中引用
	<script src="script/jquery.cookie.js" type="text/javascript"></script>
	<script src="script/changeSkin.js" type="text/javascript"></script>



3.导航效果(nav.js)

$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	}.function(){
		$(this).find(".jnNav").hide();
	})
})


4.左侧商品分类热销效果(addhot.js)

	//为了完成这个效果，可以先用Firebug工具查看模块的DOM结构，在结构中，发现需要添加热销效果的元素上包含一个“promoted”的类
	$(function(){
		$(".jnCatainfo .promoted").append('<s class="hot"></s>');
	})

5.中间大屏广告效果(ad.js)

var $imgrolls = $("#jnImageroll div a");
$imgrolls.css("opacity","0.7");
var len = $imgrolls.lengtn;
var index = 0;
var adTimer = null;

$imgrolls.mouseover(function(){
	index = $imgrolls.index(this);
	showImg(index);
	}).eq(0).mouseover();

//接下来给广告添加自动执行效果

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

//显示不同的幻灯片
function showImg(index){
	var $rollobj = $("#jnImageroll");
	var $rolllist = $rollobj.find("div a");
	var newhref = $rolllist.eq(index).attr("href");
	$("#JS_imgWrap").attr("href".newhref)
					.find("img").eq(index).stop(true.true).fadeIn()
					.sibings().fadeOut();
	$rolllist.removeClass("chos").css("opacity"."0.7")
			 .eq(index).addClass("chos").css("opacity"."1");
}


6.右侧最新动态模块内容添加超链接提示(tooltip.js)

$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>";  //创建div元素
		$("body").append(tooltip);     //把div元素追加到文档中
		$("#tooltip")
				.css({
					"top":(e.pageY+y) + "px",
					"left":(e.pageX+x) + "px"
				}).show("fast"); 			//设置x坐标和y坐标，并且显示
	}).mouseout(function(){
		this.title = this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip")
				.css({
					"top":(e.pageY+y) + "px",
					"left":(e.pageX+x) + "px"
				});
	});
});


7.右侧下部品牌活动横向滚动效果(imgSlide.js)

$(function(){
	$("#jnBrandTab li a").click(function(){
		$(this).parent().addClass("chos")
			   .siblings().removeClass("chos");
		var idx = $("#jnBrandTab li a").index(this);
		showBrandList(idx);
		return false;
	})eq(0).click();
});
//显示不同的模块
function showBrandList(index){
	var $rollobj = $("#jnBrandList")
	var rollWidth = $rollobj.find("li").outerWidth();
	rollWidth = rollWidth * 4;  //一个版面的宽度
	$rollobj.stop(true.false).animate({ left:-rollWidth*index}.1000);
}

8.右侧下部鼠标滑过产品列表效果(imgHover.js)

$(function(){
	$("jnBrandList li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'img_h+'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
	})
})
//接下来的工作就是通过控制class来达到显示光标划过的效果。首先在CSS中添加一组样式
.imageOver{
	background:url(../images/zoom.gif) no-repeat 50% 50%;
	filter:alpha(opacity=60);
	opacity:0.6;
}
//
$("#jnBrandList").find(".imageMask").live("hover".function(){
	$(this).toggleClass("imageOver");
})


9.单击产品小图片切换大图(switchImg.js)

$(function(){
	$("#jnProitem ul imgList li a").bind("click".function(){
		var imgSrc = $(this).find("img").attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#thickImg").attr("href" , imgSrc_big);
	})
})


10.产品属性介绍之类的选项卡(tab.js)

$(function(){
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected")  					//当前<li>元素高亮
			   .siblings().removeClass("selected");
			   									//去掉其他同辈<li>元素的高亮
		var index = $div_li.index(this);
										//获取当前单击的<li>元素在全部li元素中的索引
		$("div.tab_box > div")
								//选取子节点，不选取子节点会引起错误，如果里面还有<div>元素
				.eq(index).show()		//显示<li>元素对应的<div>元素
				.siblings().hide();		//隐藏其他几个同辈的<div>元素
	}).hover(function(){
		$(this).addClass("hover");
	}.function(){
		$(this).removeClass("hover");
	})
})


11.右侧产品数量和价格联动(sizeAndprice.js)

$(function(){
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function(){
		var num = $(this).val();
		var amount = num * price;
		$span.text(amount);
	}).change();
})


12.右侧给产品评分的效果(star.js)

$(function(){
	$("ul.rating li a").click(function(){
		var title = $(this).attr("title");
		alert("您给此商品的评分是："+title);
		var cl $(this).parent().attr("class");
		$(this).parent().parent().removeClass().addClass("rating"+cl+"star");
		$(this).blur();    //去掉超链接的虚线框
		return false;
	})
})


13.右侧放入购物车(finish.js)

$(function(){
	var $product = $(".pro_detail_right");
	$("#cart a").click(function(){
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color = $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
		var pro_price = $product.find(".pro_price span").text();
		var dialog = "感谢您的购买。\n您够你买的\n"+
					“产品是：”+pro_name+";\n"+


		alert(dialog);
		return false;  //避免页面跳转
	})
})












