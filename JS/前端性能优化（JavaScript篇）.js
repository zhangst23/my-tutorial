前端性能优化（JavaScript篇）.js

// 优化循环
// 如果现在有个一个data[]数组，需要对其进行遍历，应当怎么做？最简单的代码是：
for(var i = 0; i < data.length; i++){
	//do something
}

// 这里每次循环开始前都需要判断i是否小于data.length，JavaScript并不会对data.length进行缓存，
// 而是每次比较都会进行一次取值。如我们所知，JavaScript数组其实是一个对象，里面有个length属性，
// 所以这里实际上就是取得对象的属性。如果直接使用变量的话就会少一次索引对象，如果数组的元素很多，
// 效率提升还是很可观的。所以我们通常将代码改成如下所示：
for(var i = 0, m = data.length; i < m; i++){
	// do something
}


for(var i = data.length; i--;){
	//
}

//
var i = data.length;
while(i--){
	//
}

// 运算结果缓存


// 不要在循环中创建函数
// 这个很好理解，每创建一个函数对象是需要大批量空间的。所以在一个循环中创建函数是很不明智的，尽量将函数移动到循环之前创建，比如如下代码：
for(var i = 0, m = data.length; i < m; i++){
	handlerData(data[i], function(data){
		//
	});
}

// 修改为
var handler = function(data){
	//
}

for(var i = 0, m = data.length; i < m; i++){
	handleData(data[i], handler);
}












