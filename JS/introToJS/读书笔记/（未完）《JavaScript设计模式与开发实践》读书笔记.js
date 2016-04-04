// 《JavaScript设计模式与开发实践》读书笔记.js


1.0 面向对象的Javascript

2.0 this call 和 apply
2.1.1 this 的指向:
			(1):作为对象的方法调用：
			// 当函数作为对象的方法被调用时，this指向该函数：
			var obj = {
				a:1,
				getA:function(){
					alert(this === obj);  //输出 ture
					alert(this.a);    //输出：1
				}
			};
			obj.getA();

			(2):作为普通函数调用:
			// 当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的this总指向全局对象，这个全局对象是window对象
			window.name = 'globalName';
			var getName = function(){
				return this.name;
			};
			console.log(getName());		//输出：globalName
			或者
			window.name = 'globalName';
			var myObject = {
				name:'sven',
				getName:function(){
					return this.name;
				}
			};
			var getName = myObject.getName;
			console.log(getName());       //globalName
			(3)构造器调用
			var MyClass = function(){
				this.name = 'seven';
			};
			var obj = new MyClass();
			alert(obj.name);
			(4)function.prototype 或 function.prototype.apply  调用
			可以动态的改变传入函数的this
			var obj1 = {
				name:'seven',
				getName:function(){
					return this.name;
				}
			};
			var obj2 = {
				name:'anne'
			};

			console.log( obj1.getName() );     //输出：sven
			console.log( obj1.getName.call(obj2) );     //输出：anne


2.2.1  call和call的用途：
	(1)改变this指向：
		var obj1 = {
			name:'sven'
		};
		var obj2 = {
			name:'anne'
		};
		window.name = 'window';
		var getName = function(){
			alert(this.name);
		}
		getName();
		getName.call(obj1);
		getName.call(obj2);
	(2)Function.prototype.bind
		// 用来指定函数内部的this指向
	(3)借用其他对象的方法
		var A = function(name){
			this.name = name;
		};
		var B = function(){
			A.apply(this.arguments);
		}
		B.prototype.getName = function(){
			return this.name;
		};
		var b = new B('seven');
		console.log(b.getName());



// 3.1   闭包
// 		--变量的作用域
// 		--变量的生存周期
//  		--闭包的更多作用:
// 			--封装变量
// 			--延续局部变量的寿命

// 3.2   高阶函数
// 		是指至少满足下列条件之一的函数：(1)函数可以作为参数被传递---a:回调函数   b:Array.prototype.sort
// 								  (2)函数可以作为返回值输出---a:判断数值类型   b:getSingle


4.0   单例模式
	// 定义：保证一个类仅有一个实例，并提供一个访问他的全局访问点

4.1   实现单例模式
	var Singleton = function(name){
		this.name = name;
	};
	Singleton.prototype.getName = function(){
		alert(this.name);
	};
	Singleton.getInstance = (function(){
		var instance = null;
		return function(name){
			if (!instance) {
				instance = new Singleton(name);
			};
		}
	})();

	// 我们通过Singleton.getInstance来获取Singleton类的唯一对象，这种方式相对简单，但有一个问题，就是增加了这个类的“不透明性”，
	// Singleton类的使用者必须知道这是一个单例类，跟以往通过new XXX 的方式来获取对象不同，这里偏要使用Singleton.getInstance 来获取对象。


4.2  透明的单例模式
		// 我们将使用CreateDiv单例类，它的作用是负责在页面中创建唯一的div节点
		var CreateDiv = (function(){
			var instance;
			var CreateDiv = function(html){
				if (instance) {
					return instance;
				};
				this.html = html;
				this.init();
				return instance = this;
			};
			CreateDiv.prototype.init = function(){
				var div = document.CreateElement('div');
				div.innerHTML = this.html;
				document.body.appendChild(div);
			};
			return CreateDiv;
		})();
		var a = new CreateDiv('sven1');
		var b = new CreateDiv('sven2');

		alert(a === b);    //true

		// 为了把instance封装起来，我们使用了自执行的匿名函数和闭包，并且让这个匿名函数返回真正的Singleton构造方法，这增加了一些程序的复杂度，阅读起来不舒服。
		// 其中：CreateDiv的构造函数实际负责了两件事：一是创建对象和执行初始化init方法，二是保证只有一个对象。不好的做法，构造函数看起来很奇怪


4.3  代理实现单例模式
     // 仍使用上面的代码，首先在CreateDiv构造函数中，把负责管理单例的代码移除出去，使它成为一个普通的创建div的类
     var CreateDiv = function(html){
     	this.html = html;
     	this.init();
     };
     CreateDiv.prototype.init = function(){
     	var div = document.createElement('div');
     	div.innerHTML = this.html;
     	document.body.appendChild(div);
     }
     // 接下来引入代理类proxySingletonCreateDiv
     var proxySingletonCreateDiv = (function(){
     	var instance;
     	return function(html){
     		if (!instance) {
     			instance = new Create(html);
     		};
     		return instance;
     	}
     })();
     var a = new ProxySingletonCreateDiv('sven1');
     var b = new ProxySingletonCreateDiv('sven2');

     alert(a === b);

     // 我们把负责管理单例的逻辑移到了代理类ProxySingletonCreateDiv中，这样一来，CreateDiv就变成了一个普通的类，
     // 他跟ProxySingletonCreateDiv组合起来可以达到单例模式的效果



4.4  JavaScript中的单例模式
	 // 单例模式的核心是确保只有一个实例，并提供全局访问。
	 // 以下有几种可以相对降低全局变量带来的命名污染：
	 // 	1.使用命名空间
	 			// 最简单的方法依然是用对面字面量的方式：
	 			var namespace1 = {
	 				a:function(){
	 					alert(1);
	 				},
	 				b:function(){
	 					alert(2)
	 				}
	 			};
	 			// 把 a b 都定义为namespace1的属性，这样可以减少变量和全局作用域打交道的机会。另外我们还可以动态的创建命名空间
	 			var MyApp = {};
	 			MyApp.namespace = function(name){
	 				var parts = name.split('.');
	 				var current = MyApp;
	 				for(var i in parts){
	 					if (!current[parts[i]]) {
	 						current[parts[i]] = {};
	 					};
	 					current = current[parts[i]];
	 				}
	 			};
	 			MyApp.namespace('event');
	 			MyApp.namespace('dom.style');

	 			console.dir(MyApp);
	 			// 上述代码等价于
	 			var MyApp = {
	 				enent:{},
	 				dom:{
	 					style:{}
	 				}
	 			};
	 // 	2.使用闭包封装私有变量
	 				// 把一些变量封装在闭包的内部，只暴露一些接口跟外界通信
	 				var user = (function(){
	 					var __name = 'sven',
	 						__age = 29;

	 					return {
	 						getUserInfo:function(){
	 							return __name + '-' + __age;
	 						}
	 					}
	 				})();
	 				//我们用下划线来约定私有变量__name和__age，它们被封装在闭包产生的作用域中，外部是访问不到这两个变量的，这就避免了对全局的命令污染。




4.5  惰性单例
		//第一种解决方案：页面加载完成的时候便创建好这个div浮窗，这个浮窗一开始肯定是隐藏状态的，当用户点击登录按钮的时候，它才开始显示：
		<html>
		<body>
			<button id="loginBtn">登录</button>
		</body>
		

		<script>
			var loginLayer = (function(){
				var div = document.createElement('div');
				div.innerHTML = '我是登陆浮窗';
				div.style.display = 'none';
				document.body.appendChild(div);
				return div;
			})();

			document.getElementById('loginBtn').onclick = function(){
				loginLayer.style.display = 'block';
			};
		</script>
		</html>
		//问题，进入webQQ是看天气，不登陆。则登陆浮窗一开始就被创建好，可能白白浪费一些DOM节点
		<html>
		<body>
			<button id="loginBtn">登录</button>
		</body>
		

		<script>
			var createLoginLayer = function(){
				var div = document.createElement('div');
				div.innerHTML = '我是登陆浮窗'；
				div.style.displaly = 'none';
				document.body.appendChild(div);
				return div;
			};

			document.getElementById('loginBtn').onclick = function(){
				var loginLayer = createLoginLayer();
				loginLayer.style.display = 'block';
			};
		</script>
		</html>
		//达到了惰性的目的，但是去了单例的效果.当我们每次点击登录按钮的时候，都会创建一个新的登陆浮窗div
		//用一个变量来判断是否已经创建过登录浮窗
		var createLoginLayer = (function(){
			var div;
			return function(){
				if (!div) {
					div = document.createElement('div');
					div.innerHTML = '我是登陆浮窗'；
					div.style.displaly = 'none';
					document.body.appendChild(div);
				};
				return div;
			}
		})();

		document.getElementById('loginBtn').onclick = function(){
				var loginLayer = createLoginLayer();
				loginLayer.style.display = 'block';
			};


4.6  通用的惰性单例


// ？？？未完待续



5.0  策略模式
		// 定义：定义一系列的算法,把它们一个个封装起来，并且使他们可以相互替换。
5.1  使用策略模式计算奖金
5.1.1  最初代码实现

		var calculateBonus = function(performanceLevel,salary){
			if (performanceLevel === 'S') {
				return salary * 4;
			};
			if (performanceLevel === 'A') {
				return salary * 3;
			};
			if (performanceLevel === 'B') {
				return salary * 2;
			};

		}
		calculateBonus('B',20000);   //输出：40000
		calculateBonus('S',6000);   //输出：24000

5.1.2  重构：使用组合函数重构代码
		var performanceS = function(salary){
			return salary * 4;
		};
		var performanceA = function(salary){
			return salary * 3;
		};
		var performanceB = function(salary){
			return salary * 2;
		};
		var calculateBonus = function(performanceLevel1,salary){
			if (performanceLevel === 'S') {
				return performanceS(salary);
			};
			if (performanceLevel === 'A') {
				return performanceA(salary);
			};
			if (performanceLevel === 'B') {
				return performanceB(salary);
			};
		};
		calculateBonus('A',10000);   //输出：30000

5.1.3   使用策略模式重构代码
		//我们先把每种绩效的计算规则都封装在对应的策略类里面
		var performancesS = function(){}

		performanceS.prototype.calculate = function(salary){
			return salary * 4;
		};

		var performanceA = function(){};

		performanceA.prototype.calculate = function(salary){
			return salary * 3;
		};

		var performanceB = function(){};

		performanceB.prototype.calculate = function(salary){
			return salary * 2;
		}
		//接下来定义奖金类Bonus:
		var Bonus = function(){
			this.salary = null;			//原始工资
			this.strategy = null;		//绩效等级对应的策略对象
		};

		Bonus.prototype.setSalary = function(salary){
			this.salary = salary;			//设置员工的原始工资
		};

		Bonus.prototype.setStrategy = function(strategy){
			this.strategy = strategy;		//设置员工绩效等级对应的策略对象
		}；

		Bonus.prototype.getBonus = function(){ 	//取得奖金数额
			return this.strategy.calculate(this.salary);   	//把计算奖金的操作委托给对应的策略对象
		}
		//完善剩下代码：先创建一个bonus对象，并且给bonus对象设置一些原始的数据，比如员工的原始工资。接下来把某个计算奖金的策略
		// 对象也传入bonus对象内部保存起来。当调用bonus.getBonus()来计算奖金的时候，bonus对象本身没有能力进行计算，
		// 而是把请求委托给了之前保存好的策略对象
		var bonus = new Bonus();

		bonus.setSalary(10000);
		bonus.setStrategy(new performanceS());  //设置策略对象

		console.log(bonus.getBonus());   //输出：40000

		bonus.setStrategy(new performanceA());    //设置策略对象
		console.log(bonus.getBonus());		//输出：30000



5.2		JavaScript版本的策略模式
		// 函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数
		var strategies ={
			"S":function(salary){
				return salary * 4;
			},
			"A":function(salary){
				return salary * 3;
			},
			"B":function(salary){
				return salary * 2;
			}
		};
		//Context 也没有必要必须用 Bonus 类来表示,我们依然可以用 calculateBonus 函数充当Context 来接受用户的请求,
		var calculateBonus = function(level,salary){
			return strategies[level](salary);
		};

		console.log(calculateBonus('S',20000));	   //输出：80000
		console.log(calculateBonus('A',10000));	   //输出：30000

5.3   多态在策略模式中的体现

5.4   使用策略模式实现缓存动画
5.5   更广义的“算法”
5.6	  表单校验
5.6.1   表单校验的第一个版本
<html>
<body>
	<form action="http://xxx.com/register" id="registerForm" method="post">
		请输入用户名：<input type="text" name="userName"/>
		请输入密码：<input type="text" name="password"/>
		请输入手机号：<input type="text" name="phoneNumber"/>
		<button>提交</button>
	</form>
	<script>
		var registerForm = document.getElementById('registerForm');

		registerForm.onsubmit = function(){
			if (registerForm.userName.value === '') {
				alert('用户名不能为空');
				return false;
			};
			if (registerForm.password.value.length < 6) {
				alert('密码不能小于6位');
				return false;
			};
			if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value) ) {
				alert('手机号码格式不正确');
				return false;
			};
		}

	</script>
</body>
</html>
registerForm.onsubmit函数比较庞大，包含很多if-else语句。
registerForm.onsubmit函数缺乏弹性，如果增加了一种新的校验规则（如密码6位改8位），得要深入内部趋势线
算法的复用性差。

5.6.2   用策略模式重构表单校验


























