《DOM编程艺术》读书笔记

//5个DOM常用方法
getElementById
getElementByTagName
getElementByClassName
getAttribute
setAttribute


//案例研究：javaScript图片库
//1.0  有错误
function showPic(whichpic)
whichpic.getAttribute("href")
var source = whichpic.getAttribute("href");
document.getElementById("placeholder");
var placeholder = document.getElementById("placeholder");
placeholder.setAttribute("src",source);


//2.0
function showPic(whichpic){
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	//添加文本内容
	var text = whichpic.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;
}

//5.6性能考虑
// 5.6.1尽量访问DOM和尽量减少标记
if (document.getElementByTagName("a").length > 0) {
	var links = document.getElementByTagName("a");
	for(var i=0;i<links.length;i++){
		//对每个链接做点处理
	}
};

//上面代码可以运行，但不是最优的性能，因为它使用了两次getElementByTagName方法执行相同的操作
//浪费了一次搜索，更好的办法是把第一次搜索的结果保存在一个变量中，然后在循环里重用该结果
var links = document.getElementByTagName("a");
if (links.length > 0) {
	for (var i = 0; i < links.length; i++) {
		//对每个链接做点处理
	};
};
//这样一来，代码没变，但搜索DOM的次数由两次降低到了一次

// 5.6.2 合并和放置脚本
// 5.6.3 压缩脚本


//6.0 案例研究：图片库改进版
function prepareGallery(){
	if (!document.getElementByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			return showPic(this) ? false : true;
		}
	};
}

function showPic(whichpic){
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if(placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		};
	};
	return true;
}


//7.2.2  appendChild方法
var para = document.createElement("p");
var testdiv = document.getElementById("testdiv");
testdiv.appendChild(para);

// 7.2.3 createTextNode
window.onload = function(){
	var para = document.createElement("p");
	var txt = document.createTextNode("Hello world");
	para.appendChild(txt);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);

}

// 7.2.4 一个更复杂的组合
window.onload = function(){
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is");
	para.appendChild(txt1);
	var emphasis = document.createElement("em");
	var txt2 = document.createTextNode("my");
	emphasis.appendChild(txt2);
	para.appendChild(emphasis);
	var txt3 = document.createTextNode(" content. ");
	para.appendChild(txt3);

	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);

}

// 7.2.4 一个更复杂的组合  改进
window.onload = function(){
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is");
	var emphasis = document.createElement("em");
	var txt2 = document.createTextNode("my");
	var txt3 = document.createTextNode(" content. ");

	para.appendChild(txt1);
	emphasis.appendChild(txt2);
	para.appendChild(emphasis);
	para.appendChild(txt3);
	
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);

}

// 7.3.1 在已有元素前插入一个新元素
var gallery = document.getElementById("imagegallery");
gallery.parentNode.insertBefore(placeholder,gallery);

// 7.3.2 在现有方法后插入一个新元素
//利用已有的DOM方法和属性编写一个insertAfter函数
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement,nextSibling);
	};
}
//使用insertAfter函数
function preparePlaceholder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id",placeholder);
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder.gallery);
	insertAfter(description,placeholder);
}


// 8.4.1 编写displayAbbreviations 函数
function displayAbbreviations(){
	//取得所有缩略词
	var abbreviations = document.getElementByTagName("abbr");
	if (abbreviations.length < 1) return false;
	var defs = new Array();
	//遍历这些缩略词
	for (var i = 0; i < abbreviations.length; i++) {
		var definition = abbreviations[i].getAttribute("title");
		var key = abbreviations[i].laseChild.nodeValue;
		defs[key] = definition;

	};
	//创建定义列表
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		//创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		//creat the definition description
		var ddesc = document.createElement("dd");
		var dtitle_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		//把他们添加到定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	//创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbrebiations");
	header.appendChild(header_text);
	//把标题添加到页面主体
	document.body.appendChild(header);
	//把定义列表添加到页面主体
	document.body.appendChild(dlist);
}


// 8.5.1 编写displayCitations 函数
function displayCitations(){
	//取得所有引用
	var quotes = document.getElementByTagName("blockquote");
	//遍历引用
	for (var i = 0; i < quotes.length; i++) {
		//如果没有cite属性，继续循环
		if(!quotes[i].getAttribute("cite")) continue;
		//保存cite属性
		var url = quotes[i].getAttribute("cite");
		//取得引用中的所有元素节点
		var quoteChildren = quotes[i].getElementByTagName('*');
		//如果没有元素节点，继续循环
		if (quoteChildren.length < 1) continue;
		//取得引用中的最后一个元素节点
		var elem = quoteChildren[quoteChildren.length - 1];
		//创建标记
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript.appendChild(link);
		superscript.appendChild(link);
		//把标记添加到引用中的最后一个元素节点
		elem.appendChild(superscript);
	};
}



// 10.1  动画
// 10.1.1  位置
function moveMessage(){
	var elem = document.getElementById("message");
	elem.style.left = "200px";
}

// 10.1.2  时间
function positionMessage(){
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "500px";
	elem.style.top = "1000px";
	movement = setTimeout("moveMessage()",5000);
}



// 12.1  幻灯片
function moveElement(elementID,final_x,final_y,interval){
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	};
	if (!elem.style.left) {
		elem.style.top = "0px";
	};
	if (!elem.style.top) {
		elem.style.top = "0px";
	};
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	};
	if (xpos < final_x) {
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	};
	if (xpos > final_x) {
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	};
	if (ypos < final_y) {
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	};
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y/10));
		ypos = ypos - dist;
	};
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);

}



// 完成后的prepareSlideshow函数如下：
function prepareSlideshow(){
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmoseover = function(){
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			};
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			};
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			};
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			};
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			};

		}
	};

addLoadEvent(prepareSlideshow);
}































