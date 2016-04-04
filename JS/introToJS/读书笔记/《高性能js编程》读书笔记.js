// 《高性能js编程》读书笔记.js

// 1.0 
// 1.1脚本位置
要放置在body结束标签后面
// 1.2 成组脚本
减少引用外部脚本文件的数量，合并js


// 1.2.0 非阻塞脚本
// 1.2.1 延期脚本 
defer 
// 1.2.2 动态脚本元素

// LazyLoad  懒加载
LazyLoad.js(["first-file.js","the-rest.js"],function(){
		Application.init();
});



// 2.0 数据访问
js中四种基本的数据访问位置：直接量   变量   数组  对象成员




使用其他类库：（1）YUI 3的方式（2）lazyLoad类库，同时下载多个JavaScript文件，并保持正确的执行顺序。
（3）LABjs，对加载过程有更精细的控制，可以用wait()方法来指定哪些文件需要等待其他文件。 

数据访问：



1、数据类型：直接量：字符串，数字，布尔值，null，undefined，对象，数组，函数，正则表达式；
变量：var定义的数据存储单元；
数组元素：存储在数组对象内部，以数字为索引；
对象成员：存储在JavaScript对象内部，以字符串作为索引。访问对象成员比直接量或变量要慢。



2、减少跨作用域访问：函数的作用域链从上到下是当前函数的活动对象，外层函数活动对象，最外层是全局作用域。
访问跨作用域的标识符会有性能损失，标识符的位置越深速度越慢（优化过的JavaScript引擎除外，如Chrome和Safari）。
如果某个跨作用域的值在函数中被引用一次以上，那么就把它存储到局部变量。



3、避免改变作用域：with语句和try…catch…的catch可以改变作用域。例如with(document)是将document对象
推入作用域的顶端，catch是将异常对象推入作用域链顶部。这样一来，函数的活动对象处于作用域链的第二位，给访问
带来很大影响。



4、避免动态作用域：with语句，try…catch…中的catch，eval()的函数，都被认为是动态作用域。
动态作用域，只存在于代码执行过程中，因此无法通过静态分析检测出来。这样一来一些引擎的优化方法就没有起作用，
所以只有确实必要时才使用动态作用域。



5、谨慎使用闭包：通常函数的活动对象会随同运行期上下文一同销毁。
但是由于引用仍存在于闭包的[[Scope]]属性中，因此激活对象无法销毁，闭包会比非闭包函数占用更多内存。
同时，因为闭包经常访问大量跨作用域的标识符，每次访问都会有性能损失。



6、原型：对象有两种成员：实例成员和原型成员，原型成员由对象原型继承而来，所有实例共享。
可以用in操作符来确定对象是否包含特定的属性，可以用hasOwnProperty()方法判断是否是实例属性。
继承里面有原型链，不过对象在原型链中的位置越深，找到它就越慢。



7、缓存嵌套对象成员：嵌套成员会导致JavaScript搜索所有对象成员。对象嵌套越深，
访问速度就越慢（window.location.href比location.href要慢）。如果不是实例属性，
那么成员解析还要搜索原型链。在一个函数中没必要多次访问同一个对象成员，可以将其保存到局部变量中。
使用命名空间例如YUI是导致频繁访问嵌套属性的起因之一。不过这种方法不适合对象成员的方法，
因为将方法缓存之后（用变量代替方法名），this的指代对象会出错。

DOM编程：



1、减少DOM与JavaScript的相互操作：浏览器中通常会把DOM和JavaScript独立实现
（IE中JavaScript实现为JScript，位于jscript.dll，DOM实现存在于mshtml.dll，
名为Trident；Chrome中由WebCore来实现DOM和渲染，JavaScript用V8；
Firefox的JavaScript引擎名为SpiderMonkey，与名为Gecko的渲染引擎独立），
这个分离能够使用其他技术和语言，但缺点就是两个独立的功能通过接口互相连接，产生一定的性能损耗。



2、DOM修改：修改DOM元素代价很高，它会导致浏览器重新计算页面的几何变化。所以减少访问DOM的次数，
把运算尽量留在JavaScript这一端处理。



3、innerHTML与DOM方法：若不考虑标准，innerHTML（innerHTML是非ECMA标准的属性）
与DOM原生方法相差无几，但除最新webkit内核的浏览器（Chrome和Safari）外，innerHTML会快一点。
用哪种方法要根据用户经常使用的浏览器还有可读性，稳定性，团队习惯，代码风格来综合决定。



4、cloneNode()：大多数浏览器中，element.cloneNode()比document.createElement()更有效率，稍快一点。



5、HTML Collection与数组：document.getElementsByName()、document.getELementsByTagName()、document.getElementsByClassName()、document.images、document.links、document.forms、document.forms[0].elements这些方法或属性都返回一个HTML Collection的值，是一个类数组对象。他们具有类似数组的length属性，还能以数字索引的方式访问元素，但是没有push()和pop()等方法。而HTML Collection一直与文档保持联系，每次需要最新的信息，都会重复执行查询过程，因而这个过程比使用数组要慢得多。有时候为了提高效率，可以将类数组对象转换为数组对象，也可以将需要用到的数据存在局部变量。



6、遍历DOM：通常需要从一个DOM元素开始，操作周围的元素，或递归查找所有的子节点。
可以使用childNodes或者nextSibling。不同浏览器中这两种方法效率相当，但在老版本IE中nextSibling速度比childNodes快很多。



7、元素节点：DOM属性如childNodes、firstChild和nextSibling不区分元素节点和其他类型节点，
而大多情况下只需访问元素节点，这个时候推荐使用浏览器提供的只返回元素节点的API，因为遍历的节点数少，
所以速度更快。如children代替childNodes，childElementCount代替childNodes.length，
firstElementChild代替firstChild，lastElementChild代替lastChild，nextElementSibling代替
nextSibling，previousElementSibling代替previousSibling。



8、querySelectorAll()：现代浏览器提供querySelectorAll()的原生DOM方法，
返回的值是NodeList类型（包含匹配节点的类数组对象）。这个方法不会返回HTML Collection，
返回的节点不会对应实时的文档结构，避免了HTML Collection引起的性能。如果浏览器支持，
尽量使用选择器API（querySelectorAll()、querySelector()）。



9、重绘与重排：浏览器下载完页面的所有组件会解析并生成两个内部结构：DOM树（表示页面结构）
和渲染树（表示DOM节点如何显示）。DOM树中需要显示的节点在渲染树中至少存在一个对应的节点
（隐藏的DOM元素在渲染树中没有对应的节点）。DOM树和渲染树构建完毕之后，浏览器开始绘制（paint）
页面元素。如果DOM的变化影响了几何尺寸，其他元素的几何属性因此受到影响，那么浏览器会是受到影响的这部分在渲染书中失效，
并重新构造渲染树，这个过程为重排。重排完成后，浏览器重新绘制受到影响的部分，这个过程叫重绘。
有时候只发生重绘（例如改变背景色，但是布局没有改变）。添加或删除可见DOM元素，元素位置、尺寸或内容变化，
页面渲染器初始化，浏览器窗口尺寸变化，出现滚动条等都会触发重排。



10、渲染队列：大多数浏览器通过队列化修改和批量执行来优化重排过程，但获取布局信息会导致渲染队列刷新。
例如以下属性和方法：offsetTop/Left/Width/Height，scrollTop/Left/Width/Height，
 clientTop/Left/Width/Height，getComputedStyle()（currentStyle in IE）需要返回最新的布局信息。
 所以不要在布局信息改变时查询它。同时可以用局部变量缓存布局信息（缓存的是值而不是引用时才有作用）。



11、最小化重排和重绘：合并所有的改变然后依次处理，这样只会修改一次DOM，可以使用cssText实现或者修改class名称。



12、批量修改DOM：如果要对DOM元素进行一系列操作，可以通过以下步骤来减少重绘和重排次数：
（1）是元素脱离文档流（隐藏元素、使用文档片段、拷贝原始元素到一个脱离文档的节点中作为副本）；
（2）对其进行多重改变；
（3）把元素带回文档（隐藏元素重新显示、把文档片段拷贝回文档、副本修改完成后替换原始元素）。
推荐使用文档片段。



13、让元素脱离动画流：绝对定位页面上的动画元素，将其脱离文档流，然后让其进行动画，动画完成之后恢复定位。



14、事件委托：如果页面中存在大量元素，而且每一个都要一次或多次绑定事件处理器，这种情况会影响性能，
可以使用事件委托来进行优化，它基于这样的一个事实：事件逐层冒泡并能被父级元素捕获。
只需给外层元素绑定事件处理器，然后检查事件是否来自预期的元素。



算法和流程控制：



1、循环：有四种循环，for、do…while…、while、for…in…，for循环有四部分：初始化、前测条件、后执行体、循环体。
前三种性能相似，而for-in需要搜索实例或原型属性，速度较慢。所以尽量避免使用for-in循环来遍历对象属性，
而不要用for-in来遍历数组。



2、减少迭代工作量：例如for循环，将一些属性缓存在初始化中，
如：for(var i = 0, len = items.length;i<len;i++)，这样避免每次查找items的length属性。
另外可以颠倒数组顺序来提高循环性能：for(var i = items.length;i;i–)，这里控制条件只需要比较一次，
i是否为true（非0数转换为true），而前面要比较两次（(i<len) == true）。



快速响应用户界面：



1、浏览器UI线程：共用于执行JavaScript和更新用户界面的进程通常被称为“浏览器UI线程”。
UI线程的工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。一旦空闲，
队列中的下一个任务就被重新提取出来并运行。不过在JavaScript运行时，浏览器会停止
把新任务加入UI线程的队列中，所以JavaScript任务要尽快结束。



2、浏览器对JavaScript的限制：浏览器对JavaScript有两个限制：
调用栈大小限制和长时间运行脚本限制。不同浏览器对脚本运行时间的限制不一样。
Firefox为10秒，Safari为5秒，Chrome没有单独的限制。一般情况下，JavaScript运行时间不要超过100ms，
如果超过100ms，用户就会感觉失去了对界面的控制。



3、使用定时器让出时间片段：如果JavaScript不能在100ms内完成，
这个时候最理想的办法是让出UI线程的控制权，使得UI可以更新，这意味着停止JavaScript，
UI更新后，再执行JavaScript。JavaScript中可以使用setTimeout和setInterval创建定时器。
它们的第二个参数都表示任何会在何时被添加到UI队列，而不是一定会在这段时间后执行。
创建一个定时器会造成UI线程暂停，同时会重置所有相关的浏览器限制，包括长时间运行脚本，
调用栈也在定时器的代码中重置为0。这使得定时器称为长时间运行JavaScript的理想跨浏览器解决方案。



4、定时器处理数组：综合各个浏览器，建议延迟的最小值为25ms，
即setTimeout(function(){},25)。对一个数组来说，如果处理过程不需要同步，
而且数组不需要按顺序处理，那么可以使用定时器将其分解为多个小任务，
但这样做的副作用是处理数组的总时长增加了。









































