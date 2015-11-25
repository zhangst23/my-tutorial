AngularTips 开发中的问题.js
1.0  
// angular中controller通过service获取后台数据报错？
// 用factory试试：
angular.module('starter.ForgetService',[])
	.factory('ForgetService',['$rootScope','$timeout','$ionicLoading','$ionicPopup',function($rootScope,$timeout,$ionicLoading,$ionicPopup){
		return{
			sendData:function(message)
			{
				console.log('{"tell":"'+message.phone'"."id":"'+message.id+'"}');
				console.log(window.localStorage.wsurl);
				$ajax({
					url:window.localStorage.wsurl + "/ECourierServe/servlet/RetPassWord",
					type:"POST",
					contentType:"application/x-www-form-urlencoded",
					data:'json='+'{"tell":"'+message.phone+'","id":"'+message.id+'"}',
					dataType:"json",
					success:function(result){
						console.log(result);
						$ionicLoading.hide();
						$ionicPopup.alert({
							title:'提示',
							template:result.returnMessage
						});
					},
					error:function(xhr,ajaxOptions,thrownError){
						console.log("错误信息"+thrownError,'error');
						$ionicLoading.hide();
						$ionicPopup.alert({
							title:'提示',
							template:'联网异常'
						});
					}
				});
			}
		}
	}]);

来源：http://segmentfault.com/q/1010000004020435





2.0    单页面应用是如何进行部署的？
// 单页面应用既然能实现前后端端对端地开发，那具体到部署的时候是如何进行的呢？目前是把前端资源依旧像以前一样放在后端框架下面的静态资源目录下吗？
// 单页面应用的前端能不能真正实现前后端分开独立部署？
// 答：使用代理比如
(1)nginx代理   : 你的静态资源在~/static/目录下，而你的后端服务端口是8080，你可以在nginx下配置如下

//静态文件，请求静态文件代理带`static`目录下
location ~ ^/(images|javascript|js|css|flash|media|static)/{
	root ~/static;
}
//接口代理到api下
location ~ ^/(api){
	root location:8080/api;
}

(2)node代理    :node的代理有多种选择方式，我贴个gulp的
var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('proxy-middleware');
var url = require('url');
gulp.task('connect',function(){
	connect.server({
		root:'./',
		port:3000,
		middleware:function(connect,opt){
			var proxyOptions = url.parse('http://localhost:8080/api/');
			proxyOptions.route = '/api/';
			return[
				proxy(proxyOptions)
			]
		}
	})
});



3.0    关于在angular里异步加载百度地图API的问题

// 答：百度地图api里调用的是全局的回调方法，而我原来的写在指令的作用域里的，所以无法获取到，把回调定义到全局或者绑定到$window全局对象即可
// 给你一个实际demo吧：
angular.module('demo',[])
.service('BaiduMap',function($window,$document,$q){
	var promise;

	this.load = function(){
		if (promise) {
			return promise;
		};
		promise = $q(function(resolve,reject){
			$window.initMap = function(){
				resolve();
				return;
			};
			var script = document.createElement("script");
			script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=E4805d16520de693a3fe707cdc962045&callback=initMap";
			$document[0].body.appendChild(script);
		});
		return promise;
	};
});



4.0  如何能知道用户在我的textarea中输入了多少个空格
// 我想做一个像发微博时候一样的字符限制，微博的做法是输入两个空格算一个字，那我该如何知道用户输入了多少个空格，length只能知道获得的字符的数量
(1)空格个数：textreaValue.split(' ').length-1;
// 这招高！学习了~
// 我试了一下：
alert(textreaValue.split(' ').length-1) //NaN
alert(（textreaValue.split(' ').length-1）) //正确显示

(2)这个东西当然是做输入的实时监听了...propertychange 或者考虑keydown
<body>
<textarea>
</textarea>
<label id="hint"></label>
</body>
<script>
    $('textarea').bind('input propertychange', function() {
      var textObj = $(this);
      var text    = textObj.val();
      num = 0;
      for(var i=1; i< text.length; i++){
        if(text.charAt(i)==' '){
            num ++;
        }
      }
      $("#hint").html("空格有" + num);
    });
</script>

</html>



5.0   
// controller 本应该设计成相互独立的，如需要通信，要使用一个单独的 service 。controller 貌似没有层级关系， 
// scope 是有的。一定要这么做，可以试试把方法放到 scope 上，然后 $scope.$parent.function

6.0   两个表格控件
 ng-table
 ui-grid.info


7.0     $http是如何使用的
$http({method: $scope.method, url: $scope.url, cache: $templateCache}).
    success(function(data, status) {
      $scope.status = status;
      $scope.data = data;
    }).
    error(function(data, status) {
      $scope.data = data || "Request failed";
      $scope.status = status;
  });



8.0       前端使用input使用ng-model绑定数据，控制前中一直无法得到映射的值
// 前端代码：
<ion-view view-title="Forget" hide-nav-bar="true">
<ion-content id="registerBg" scroll="true">
		// 第一个标题
<div id="loginFirstTitle"></div>
<div id="loginSecTitle"></div>
		//表单
<div id="registerForm">
	<ion-list>
		<ion-item class="item-icon-left item-input-inset" style="color:white;">
			<div class="row">
				<div class="col" style="text-align:center;">
					<-找回密码->
				</div>
			</div>
		</ion-item>
		<ion-item class="item-icon-left item input inset">
			<label class="item-input-wrapper">
				<input type="text" ng-model="sendData.phone" placeholder="请输入手机号">
			</label>
		</ion-item>
		 <ion-item class="item-icon-left item-input-inset">
                <label class="item-input-wrapper">
                    <input type="text"  placeholder="请输入身份证号" ng-model="sendData.id">
                </label>
            </ion-item>
		<ion-item class="item-icon-left item-input-inset">
			<div id="RegisterButton" ng-click="submitMessage()">提交</div>
		</ion-item>
	</ion-list>
</div>
</ion-content>
</ion-view>

//控制器
angular.module('starter.ForgetCtrl',[])
.controller('ForgetCtrl',function($scope,ForgetService){
	$scope.submitMessage=function()
	{
		console.log($scope.phone);
		console.log($scope.id);
		//格式验证
		console.log(checkPhone($scope.phone));
	}

	$scope.sendData={
		phone:"",
		id:""
	};
});

//后台通过
$scope.sendData.phone
$scope.sendData.id
//就能获取到值



9.0    angular路由不同页面中数据保存?
//
// 答：  1.封装一个Service,为这个Service绑定当前的要跨路由访问的数据(建议)
// 		2.定义rootScope存（建议只存储全局相关属性）
// 		3.通过url hash在列表页的路由中传递
// 		4.有Parent Controller时可存其中
//
// 答：如果你用的是 ui-router 的话，还有个更加简单的方法哦。你可以把你的数据放在路由跳转的数组参数中来传递，这样你
// 就不用封装 service 拉，特别是对少量的数据传递，这个方法超超好用的。给你一个 ui-router api文档的链接：
//  [ui-router]: http://angular-ui.github.io/ui-router/site/#/api/ui.router



10.0    如何来让directive修改controller的scope。

// 一、首先从directive内部属性说起。
// directive的scope属性，它的三种方法都可以修改controller的scope。
	// ~1.scope不定义或者scope:false。它是直接用的controller的scope
	// ~2.scope:true。它是继承controller的scope。这时候，你要修改的内容最好定义为一个对象。
	// ~3.scope：{key:'=key'}。它是独立出一个scope。修改方法同上，最好定义为对象
// 然后再讲一个。使用 iAttrs,将它定义给指令上的一个属性。
var model = $parse(iAttrs.addTaskClassBoxDisplay);
iElement.on('click', '#addTaskClass', function(event) {
model.assign(scope,true);
scope.$apply();

// 二、使用广播。具体百度。

// 三、使用service来传递。

// 四、指令调用$rootScope 然后让controller的scope属性等于$rootScope的属性。（千万别这么做）
// 要上班了，后边的你自己百度吧。



11.0   Javascript中call与apply区别是什么，用在什么地方，在angularjs、reactjs中有没有应用？

// 在JS中，this的指向是动态变化的，很可能在写程序的过程中，无意中破坏掉this的指向，所以我们需要一种可以把this的含义固定的技术，于是就有了call,apply和bind这三个方法

apply：应用某一对象的一个方法，用另一个对象替换当前对象。
call：调用一个对象的一个方法，以另一个对象替换当前对象。

// △它们的共同之处：
// 都可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。

// △它们的不同之处：
// ①apply：最多只能有两个参数——新this对象和一个数组 argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，当然，即使只有一个参数，也要写进数组里面。如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj，并且无法被传递任何参数。

// 代码示例

fun.call(thisArg[, arg1[, arg2[, ...]]])

function f(x,y){
  console.log(x+y);
}
f.call(null, 1, 1)
//return 2

// ②call：则是直接的参数列表，主要用在js对象各方法互相调用的时候，使当前this实例指针保持一致,或在特殊情况下需要改变this指针。如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

// 代码示例

fun.apply(thisArg, [argsArray])

function f(x,y){
  console.log(x+y);
}
f.call(null, [1,1])
//return 2

// △总结：
// apply和call功能一样，只是传入的参数列表形式不同



12.0   angularjs 依赖注入的写法问题
// 首先格式化一下你的代码：

// 显示注入，代码过长，不容易阅读，代码压缩不出错
app.controller('PhoneListCtrl', ['$scope', '$http', function（$scope, $http){
     //do something
}]);

// 隐示注入，书写简单，但是在js进行压缩时候会出错，因为变量名变短，而依赖注入是基于其服务的名称的
app.controller('PhoneListCtrl', function（$scope, $http){
     //do something
});

// 大家推荐$inject的方式,你可以参考JohnPapa的 Angular Style Guide
app.controller('PhoneListCtrl', PhoneListCtrl);

PhoneListCtrl.$inject = ['$scope', '$http'];

function PhoneListCtrl($scope, $http){

}

// 另外多说一句，无论你采用那一种，在代码压缩时，其实是不用担心的，因为有插件会帮我们进行依赖注入，无论你使用的是gulp还是grunt，会有一个插件 ng-annotate 帮助你进行依赖注入的添加。

// 举个例子

app.controller('PhoneListCtrl', PhoneListCtrl);

/* @ngInject */
function PhoneListCtrl($scope, $http){

}


13.0   angularjs: ng-repeat 如何实现嵌套？

// 直接的答案：

<div ng-repeat="links in slides">
    <div ng-repeat="link in links track by $index">{{link.name}}</div>
</div>
// Error: [ngRepeat:dupes]这个出错提示具体到题主的情况，意思是指数组中有2个以上的相同数字。ngRepeat不允许collection中存在
// 两个相同Id的对象

For example: item in items is equivalent to item in items track by $id(item). This implies that the 
DOM elements will be associated by item identity in the array.
// 对于数字对象来说，它的id就是它自身的值，因此，数组中是不允许存在两个相同的数字的。为了规避这个错误，需要定义自己的track by表达式。
// 例如：item in items track by item.id或者item in items track by fnCustomId(item)。嫌麻烦的话，
// 直接拿循环的索引变量$index来用item in items track by $index




14.0    angular 多个controller之间如何协调开发工作
// 感觉应该有人问过，但没搜索出来。

// 如示例所示，数据是很简单，现在业务上是这样的。
// 1.首先，已经用了一层的view，但是现在一层view里面又有很多层的业务，我们称为子业务ABCD
// 2.原来我们设计的时候ABCD是不同的人做的，所以是独立的HTML，独立的controll
// 3.所以我又做了一个大的control0，把各个control包含进来，用switch切换，发现是好用的，如示例代码
// 4.现在问题是，原来各页面是独立的HTML哦，能不能指定URL就把HTML载入进来呢（指定到ng-controller="ctrl1"的DIV的某个attr，或者其他方式)？这样就不用机械地把每个人原来制作的HTML拷贝粘贴
// 5.项目中包含着requirejs，应该可以利用。


答：动态的引入html 官方提供两种方式：
<div ng-view></div>
// 这种方式需要你配置路由来切换
// 适用常用整屏幕切换

<div  ng-include src='xxxx'>
// xxx 可以是动态改变的地址
// 在不同子页面直接绑定不同 controller 就可以了。
// 适用场景， 子页面中不同页面的切换。


15.0    angularjs中的controller.js 要不要分开成多个js文件？
// 各位：问个问题,求指点迷津，情况是这样，有个app项目使用了angularjs，目前只有一个controllerJs文件，
// 三千多行代码，不好维护，想根据不同模块，分成不同的js文件，好吗？
// 著作权归作者所有。
// 商业转载请联系作者获得授权，非商业转载请注明出处。
// 作者：徐飞
// 链接：http://www.zhihu.com/question/36315832/answer/66927460
// 来源：知乎

// 拆分代码一般对可维护性是有好处的，但要注意这些事情：
(1)从理念上讲，拆的是逻辑而不是文件，如果你把逻辑拆分理清了，拆不拆文件的重要性
并不大。如果对可维护性的提升是100%，逻辑的部分至少要占90%。

(2)写Angular应用，最重要的事情是分层。很多人写不好Angular代码，原因就是没有分层的观念，所以症状就是controller又大又乱。简单的原则是：
~远程请求，数据缓存等等一律放进service
~不得以而产生的DOM操作，一律放进directive（在Angular应用里，需要你手动去操作DOM的场景其实很少了）
~数据的格式化，一律做成filter
~剩下的东西才是controller应该做的事情，在这里，又有一些事情要考虑：
		~~~视图是需要分块、分层的，如果你控制能力不足，最好把controller和视图块按照一对一的关系维护，每块单独都能跑，然后拼起来
		~~~嵌套的视图，作用域的关系需要好好考虑，这部分的相关机制可以参考我写的这篇：AngularJS实例教程（二）——作用域与事件 · Issue #18 · xufei/blog · GitHub
		~~~有一些东西并不应当在视图分块（姑且称为组件）的树状结构里，而是独立在外，跟这部分东西的交互，应当视情况使用service来通信，不要尝试在$scope体系上过多纠缠。



16.0    你用AngularJS 做过项目后，下一个项目还用AngularJS吗？

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：徐飞
链接：http://www.zhihu.com/question/26938742/answer/34640330
来源：知乎

对应到一个Web前端项目，也就是要考虑：
1 这是一个什么类型项目？（页面型还是应用型，是否需要SEO）
2 给什么人用的？（如果还要适应低版本IE，那不用想了）
3 不可否认，使用Angular对整体规划能力需求较高，而且如果是不熟悉的人，搞出问题的概率很高，能否承担？
4 团队的现有技能如何，js技能偏弱的团队用起来可能有些痛苦

如果上面这几个问题都能慎重考虑到，都能回答适合的话，那使用Angular将会是一种很愉悦的体验，并且，当你的项目规模增大的时候，更是如此。

优势非常明显：
分层导致业务逻辑特别清晰，在逻辑中不混杂视图操作，UI层有很大自主权。
依赖注入导致组件化程度很高，可单独测试，容易从整体上总览所有模块的依赖关系。
数据绑定导致上层代码大量简化，常规操作基本无需写额外代码。

劣势主要是SEO方面，另外由于监控机制的实现方式，对于大数组和深层数据的绑定性能不够高，这个可以通过一些细节优化来解决。更细节的我在这篇里回答过：



17.0

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：Alan Wang
链接：http://www.zhihu.com/question/33474922/answer/57268213
来源：知乎

// 本人基本没有什么js的基础。。。花了一周时间上手参与一个angularjs开发的web app。我的建议是多看文档，尝试自己从头开始搭一个小app，
// 一点点学着使用。比如先写一个controller，试着用data-binding 做一点小的交互，你也用到了ng-click和ng-repeat, 然后试着写
// 一个filter，用在之前的数据展示上，加上样式以后写一点ng-class和ng-style之类的东西，接下来用router写一下路由，多做几个页面，
// 用ng-view写一点子页面，试一下ui-router插件，给不同的页面加不同的controller，然后写resource，尝试从后台拿了数据以后展示出来，
// 再用watch什么的加强一下你的交互blabla...如果js不熟，对angularjs的代码风格可能短时间难以习惯，那就多写写吧。写了以后你或许
// 就慢慢有自信了，在此基础上有空的时候完整刷一遍文档，恩，加油






























