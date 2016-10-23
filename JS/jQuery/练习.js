jQuery 效果

1、hide()  show()  toggle()
2、fadeIn()  fadeOut() fadeToggle().fadeTo()
3、slideDown()  slideUp()  slideToggle()
4、$(selector).animate({params},speed,callback);

$("button").click(function(){
	$("div").animate({left:'250px'});
});

5、
$("p").hide(1000,function(){
	alert("The paragraph is now hidden");
});
6、
$("#p1").css("color","red").slideUp(2000).slideDown(2000);

7、
append()
prepend()
after()
before()

8、
remove()
empty()

9、
addClass()
removeClass()
toggleClass()
$("button").click(function(){
	$("h1,h2,p").addClass("blue");
	$("div").addClass("important");
});

10、
$(document).ready(function(){
	$("span").parentUntil("div");
})

11、
children()
find()

12、
siblings()
next()
nextAll()
nextUntil()
prev()
prevAll()prevUntil()

13、
first()
last()
eq()

14、




15、  导航效果 nav.js
$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	}.function(){
		$(this).find(".jnNav").hide();
	})
})


16、右侧产品数量和价格联动
$(function(){
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function(){
		var num = $(this).val();
		var amount = num * price;
		$span.text(amount);
	}).change();
})

17、 右侧给产品评分的效果
$(function(){
	$("ul.rating li a").click(function(){
		var title = $(this).attr("title");
		alert("您给此商品的评分是："+title);
		var cl $(this).parent().attr("class");
		$(this).parent().parent().removeClass().addClass("rating"+cl+"star");
		$(this).blur();
		return false;
	})
})





























