angular笔记.js
//1.0
<body ng-controller="PhoneListCtrl">

  <ul>
    <li ng-repeat="phone in phones">
      {{phone.name}}
    <p>{{phone.snippet}}</p>
    </li>
  </ul>
</body>

在<li>标签里面的ng-repeat="phone in phones"语句是一个AngularJS迭代器。这个迭代器告诉AngularJS用
第一个<li>标签作为模板为列表中的每一部手机创建一个<li>元素


尽管控制器看起来并没有起到什么控制的作用，但是它在这里起到了至关重要的作用。通过给定我们数据模型的语境，控制器允许我们建立模型和视图之间的数据绑定。我们是这样把表现层，数据和逻辑部件联系在一起的：

PhoneListCtrl——控制器方法的名字（在JS文件controllers.js中）和<body>标签里面的ngController指令的值相匹配。
手机的数据此时与注入到我们控制器函数的作用域（$scope）相关联。当应用启动之后，会有一个根作用域被创建出来，而控制器的作用域是根作用域的一个典型后继。这个控制器的作用域对所有<body ng-controller="PhoneListCtrl">标记内部的数据绑定有效。
AngularJS的作用域理论非常重要：一个作用域可以视作模板、模型和控制器协同工作的粘接器。AngularJS使用作用域，同时还有模板中的信息，数据模型和控制器。这些可以帮助模型和视图分离，但是他们两者确实是同步的！任何对于模型的更改都会即时反映在视图上；任何在视图上的更改都会被立刻体现在模型中。




//2.0
模块和注入器

每个AngularJS应用都有一个唯一的注入器。注入器提供一个通过名字查找对象实例的方法。它将所有对象缓存在内部，所以如果重复调用同一名称的对象，每次调用都会得到同一个实例。如果调用的对象不存在，那么注入器就会让实例工厂(instance factory)创建一个新的实例。

一个模块就是一种配置注入器实例工厂的方式，我们也称为“提供者(provider)”。

注入器真正强大之处在于它可以用来调用方法和实例化的类型。这个精妙的特性让方法和类型能够通过注入器请求到他们依赖的组件，而不需要自己加载依赖。

// You write functions such as this one.
function doSomething(serviceA, serviceB) {
  // do something here.
}

// Angular provides the injector for your application
var $injector = ...;

///////////////////////////////////////////////
// the old-school way of getting dependencies.
var serviceA = $injector.get('serviceA');
var serviceB = $injector.get('serviceB');

// now call the function
doSomething(serviceA, serviceB);

///////////////////////////////////////////////
// the cool way of getting dependencies.
// the $injector will supply the arguments to the function automatically
$injector.invoke(doSomething); // This is how the framework calls your functions

注意，你唯一需要写的就是上例中指出的函数，并把需要的依赖写在函数参数里。当AngularJS调用这个函数时，它会自动体充好需要的参数。



//3.0
Filters过滤器

过滤器扮演着数据翻译的角色。一般他们主要用在数据需要格式化成本地格式的时候。它参照了UNIX过滤的规则，并且也实现了“|”（管道）语法。
 <div ng-init="list = ['Chrome', 'Safari', 'Firefox', 'IE'] ">
      Number formatting: {{ 1234567890 | number }} <br>
      array filtering <input ng-model="predicate">
      {{ list | filter:predicate | json }}
    </div>




















































