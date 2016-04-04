// 《编写可维护的javascript》读书笔记.js



//1.0
null 是一个特殊值，但我们常常误解它，将它和 undefined 搞混，在下列场景中应当使用null
- 用来初始化一个变量，这个变量可能赋值为一个对象
- 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象
- 当函数的参数期望是对象时，用作参数传入
- 当函数的返回值期望是对象时，用作返回值传出


还有下面一些场景不应当使用null
- 不要使用 null 来检测是否传入了某个参数
- 不要用 null 来检测一个为初始化的变量

//eg
//好的用法
var person = null;
//好的用法
function getPerson(){
	if (condition) {
		return new Person("Nicholas");
	}else{
		return null;
	};
}
//好的用法
var person = getPerson();
if (person != null) {
	doSomething();
};
// 不好的写法：用来和未初始化的变量比较
var person;
if (person != null) {
	doSomething();
};
//不好的写法：检测是否传入了参数
function doSomething(arg1,arg2,arg3,arg4){
	if (arg4 != null) {
		doSomethingElse();
	};
}




//2.0  对象直接量
var book = {
	title:"Maintainable js",
	author:"Nicholas C.Z"
};


//5.1 将HTML从JavaScript 中抽离
方法一：从服务器加载
function loadDialog(name,oncomplete){
	var xhr = new XMLHttpRequest();
	xhr.open("get","/js/dialog" + name, true);

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			var div = document.getElementById("dlg-holder");
			div.innerHTML = xhr.responseText;
			oncomplete();
		}else{
			//处理错误
		};
	};
	xhr.send(null);
}

方法二：简单客户端模板

//1.0 一段用来添加数据项的模板看起来就像下面这样
<li>
	<a href="%s">%s</a>
</li>
//javascript程序会将这些占位符替换为真实数据，然后将结果注入DOM，下面这段代码给出了这样一个函数及其用法
function sprintf(text){
	var i = 1,args = arguments;
	return text.replace(/%s/g,function(){
		return (i < args.length) ? args[i++] : "";
	});
}
//用法
var result = sprintf(templateText,"/item/4","Fourth item");



//2.0  将模板数据嵌入到HTML页面里的第二个方法是使用一个带有自定义type属性的<script>元素，
//浏览器会默认的将<script>元素中的内容识别为Javascript代码，但你可以通过给type赋值为浏览器不识别的类型，
//来告诉浏览器这不是一段Javascript脚本，比如
<script type="text/x-my-template" id="list-item">
	<li><a href="%s">%s</a></li>
</script>
//你可以通过<script>标签的text属性来提取模板文本
var script = document.getElementById("list-item"),
	templateText = script.text;

//这样 addItem() 函数就会变成这样
function addItem(url,text){
	var mylist = document.getElementById("mylist"),
		script = document.getElementById("list-item"),
		templateText = script.text,
		result = sprintf(template,url,text),
		div = document.createElement("div");

	div.innerHTML = result.replace(/^\s*/,"");
	list.appendChild(div.firstChild);

}
//用法
addItem("/item/4","Fourth item");

方法三：复杂客户端模板
{{ url }}




// 6.1  模块化
// AMD
define("my-books",["dependency1","dependency2"],
	function(dependency1,dependency2){
		//模块正文
		var Books = {};
		Books.MaintainableJavaScript = {
			author:"Nicholas C.Z"
		};
		return Books;
	})


//看到第8章   避免空比较（未完待续）





























