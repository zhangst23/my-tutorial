// AngularJS 面试问题.js

1.0   
这个问题邀请我回答就对了。我提供一些面试时候问过的问题：

1. angular的数据绑定采用什么机制？详述原理
2. 两个平级界面块a和b，如果a中触发一个事件，有哪些方式能让b知道，详述原理
3. 一个angular应用应当如何良好地分层？
4. angular应用常用哪些路由库，各自的区别是什么？
5. 如果通过angular的directive规划一套全组件化体系，可能遇到哪些挑战？
6. 分属不同团队进行开发的angular应用，如果要做整合，可能会遇到哪些问题，如何解决？
7. angular的缺点有哪些？
8. 如何看待angular 1.2中引入的controller as 语法？
9. 详述angular的“依赖注入”
10. 如何看待angular 2……

上面是需要长篇大论的问题，再来一些小问题：

1. ng-if跟ng-show/hide的区别有哪些？
2. ng-repeat迭代数组的时候，如果数组中有相同值，会有什么问题，如何解决？
3. ng-click中写的表达式，能使用JS原生对象上的方法，比如Math.max之类的吗？为什么？
4. {{now | 'yyyy-MM-dd'}}这种表达式里面，竖线和后面的参数通过什么方式可以自定义？
5. factory和service，provider是什么关系？

能全部答出来的人，应该大家都能认识了……



答：
抛砖引玉：

1. dirty check 原理略

2. $rootScope.$on 原理略

3. （我不知道这么定义良好。。。）我一般的做法是以功能为目录划分 controller model （$resource） 和 view，再将通用的 directive factory service 放到最外层。

4. angular.router 和 ui.router，可以重点说说 angular.router 的痛点以及为什么引入 $state，略。

5. 见 ui.bootstrap，我觉得最大的挑战是怎么搞出一个非常舒服又符合 angular 哲学的传参方式，比如 ui.bootstrap.modal 有个 scope，你要理解，所有的 scope 都是利用类似 $scope.$new 的方式从 $rootScope 继承下来的。不过其实我很讨厌 ui.bootstrap 的用法。。。


6. 最大的问题就是冲突，angular 的 module 只能决定 module 是否加载，但一旦加载，包括但不局限于 controller directive factor 名称都可能造成冲突，而且没有解决的办法，不同团队只能约定自己的 prefix 但这会造成 diretive 非常难看而且破坏语义的通用性。

7. 不利于 SEO，性能很成问题，dirty check 的方式造成 $apply 的 call hell，学习成本也过高，源码分层还不错，但读着很辛苦。现成的组件都需要额外的封装甚至重写。

8. controllerAs 很棒，不用再在 view 里写丑陋的 $scope 和 $parent，也支持在 controller 层面使用 this 代替 $scope （我没看过源码的 controllerAs 实现，有点忘了 this 是不是因为 controllerAs 实现了）

9. 这个就没什么好说的了，后端 DI 已经标配了，直接给源码吧 angular.js/injector.js at 03726f7fbd5d71c0604b8dd40e97cb2fb0fb777f · angular/angular.js · GitHub

10. 基于 Component 是大势所趋，基于 TS 终于可以愉快地用 class 了（虽然也可以用 ES5 写）。从文档看，比较大的变化比如，没有了 controller，scope，dirty check 是比较大的变化，小的一些改变比如 router 引入了 ui.router 子路由。

小问题比较好回答：

1. dom 树 和 css 的区别，这里有个小坑是，$compile 对于 ngIf 的处理有点特别，有些 diretive 不能正确处理。
第一个，ng-if和ng-show不止这点差别，还多了一级scope
2. track by

3. 不能，angular 自己写了 AST 和 ASTCompiler，最后用一个 new Function 来调用，所以 Math 会被当做一个变量加上前缀，见源码 https://github.com/angular/angular.js/blob/03726f7fbd5d71c0604b8dd40e97cb2fb0fb777f/src/ng/parse.js#L883

4. filter

5. factory 和 service 不说了，只是 {} 和 new function() {} 的区别，provider 比较有意思，它用一个 $get 来实现 $injector 的自动注入，但与 factory 和 service 不一样的地方在于，$get 不是立即调用的，这就给你的 config 一个时机，让你在 module 启动之后再注入依赖。



2.0    
著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：赵师聪
链接：http://www.zhihu.com/question/36040694/answer/65729649
来源：知乎

徐飞的答案写的很好了，我补充几个我面试喜欢问的可以以小见大的问题: 
1 controller as 和controller 有什么区别，能解决什么问题，此题可以考察对scope的理解程度
2 html: {{currentDate()}} js: $scope.currentDate = function(){return new Date();} 这种写法有没有问题，此题可考察对digest机制的理解
3 directive 如何调用外部函数，如何向函数里传递参数，如何expose函数给外部调用全部都能完满答上的我认为是很有水平了，一题都答不上最多只能算入门级别。手机码字，代码排版不好，见谅




3.0    
著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：chunhe wei
链接：http://www.zhihu.com/question/36040694/answer/65892270
来源：知乎

徐飞提出的衡量方式我觉得还是挺好的; 我就献丑在这里跟大家交流一下回答; 欢迎补充，交流!
首先从小问题开始：
（1）ng-if跟ng-show/hide的最根本区别就是页面是否会生成此DOM元素；
（2）默认情况下ng-repeat是不允许存在相同值的，这是因为不能管理数据与DOM之间一对一的关系了；但是如果必须存在相同值，可以通过指定 track by 用于区别不同数据
（3）ng-click中写的表达式不能使用比如Math.max等JS原生对象上的方法,这是因为执行时如$scope.Math.max
（4）{{now | 'yyyy-MM-dd'}}这种表达式就是filter，可以通过filterProvider自定义factory和service，provider都用于注册服务，不同的是provider只能配置阶段注入，
（5）factory和service只能运行阶段注入；provider通过$get工厂函数穿件新对象,factory通过工厂函数创建新对象，service通过构造函数创建新对象.
下面对大问题进行一下简述
（1）angular的数据绑定采用什么机制？angular 通过监控能事件改变进行绑定；DOM事件(input改变，点击等)，XHR的响应触发回调；浏览器地址变化，计时器触发回调等；如果以上情况没有发生，MV改变的可能性不大;
（2）两个平级界面块a和b，如果a中触发一个事件，有哪些方式能让b知道，两个controller之间进行交互可以通过父作用域数据共享，或者事件的冒泡广播机制；
（3）一个angular应用应当如何良好地分层，将controller中的东西可以向JAVA代码一样进行层次划分，数据请求的dao层，数据处理的service层。很明显提问者应该是后端开发者，大部分只做前端开发的应该对此理解不深； 
（4）angular应用常用哪些路由库，各自的区别是什么？ 目前我就使用过angular原生的以及社区开发的ui.router; angular原生的不支持嵌套路由，一个路由只能对应页面中一个 区域。ui.router 还没有遇到不支持的功能。
（5）如果通过angular的directive规划一套全组件化体系，可能遇到哪些挑战？性能，文档
（6）分属不同团队进行开发的angular应用，如果要做整合，可能会遇到哪些问题，如何解决 服务冲突，angular将所有模块的所有服务混入了应用级别的单一命名空间里。开发时规划好，尽量避免冲突；
（7）angular的缺点有哪些？ 到目前的版本已经发展的相当不错了。有些路由的限制可以通过第三方库支持，进行了模块化拆分，使用更轻量。
（8）如何看待angular 1.2中引入的controller as 语法？ 尊重更多人的习惯，都能找到自己最舒服的编写方式
（9）详述angular的“依赖注入” angular会将依赖的所有模块上的所有服务混入应用级别的单一命名空间内。所以，模块间可以相互依赖，不同模块间的服务可以相互依赖。这有一个问题就是会存在冲突的可能性。在需要使用的地方根据名称注入。
（10）如何看待angular 2…… angular在进步，我们也不能停下，敞开胸怀接受她 angular应该增加个单次取值不绑定，有些只需要读取一次不会再改变的地方，这样脏检查的时候就会避免不必要的计算！















