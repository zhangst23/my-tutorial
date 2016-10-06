http://www.jianshu.com/p/0e42799be566
深入理解React、Redux
字数2815 阅读61166 评论14 喜欢70
React+Redux非常精炼，良好运用将发挥出极强劲的生产力。但最大的挑战来自于函数式编程（FP）范式。在工程化过程中，架构（顶层）设计将是一个巨大的挑战。要不然做出来的东西可能是一团乱麻。说到底，传统框架与react+redux就是OO与FP编程范式的对决。

简单学习某项技术并不能让建立起一个全局理解，也很难工程化。所以，我们必须要看以下几方面：

了解其独特的东西。如React中组件是pure render函数。
置新技术于上下文中。将React放在flux、redux中。才能真正看到数据单向流动。
对比看到优势。比其它的解决方案(vue, angluar，adobe flex），看其优势。
挑战。软件领域里没有银弹，有好处一定有挑战。
1. 谈谈对React的理解
1.1 独特性
Virtual Dom：又一个虚拟层、中间层、cache层，大胆的跳出了web的DOM实现约束，实现更加理想的UI编程模型：树型控件组织、统一事件、统一数据传输通道(props)。可以把Dom render到web，navtive的GUI系统上，这非常美妙，Learn once, Use Everywhere。
轻Component：React的component强调pure render，把业务逻辑放到其它子系统中，如redux中的reducer。
组件状态（state）要最小化的，按官方说法，不是props传入的，随时间变化的，不能是通过其它的props和stat计算而来。
常用的设计模式：创建多个只负责渲染数据的无状态（stateless）组件，在它们的上，是有状态（stateful）组件。有状态组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。
设计范式是数据驱动组件来render。对比OO范式，OO有时会把compoent搞成自闭的、复杂的类，里面藏了太多的状态，调测很难跟踪。
1.2 置React于上下文中
React的virtual DOM想要构建一个理想的前端模型，那理想的前端编程到底是如何呢？我个人总结的4点：

构建基本UI能力：不论是组件拖拉（VB），还是写树型XML描述文档，能快速做出和直觉一致的UI界面
数据绑定：与数据层（model）绑定数据，展示一个有数据的UI
用户交互：用户点击、触摸，程序完成业务逻辑，并反馈给用户，表明是一个活的UI
UI布局：组织管理合个UI，一个UI调起另一个UI，自己死掉或藏起来。
构建基本UI能力：React完成的非常不错，通过写JSX能完成一个基本UI的构建。JSX是一个非常好的工程化手段，你第一眼看到它，可难会不爽。但新事物总要给它五分钟！品味一下，你会发现这样做更内聚，更务实的把计算与显示内聚在一个地方，甚至你还可以把css样式以inline sytle的方式写在js文件里。最重要的是它可以把让XML化的组件与js完美混合计算！

在数据绑定：React通过父子组件的props数据通讯协议，可以漂亮的完成初始数据绑定。这个props做得简单而高效，大亮点！

用户交互：React组件被认为自己是一个有限状态机。与用户交互，改变自己的状态（state）。算法根据这些状态，render算法现计算出合适的数据集呈现给用户。这样做的好处是设计范式高度一致。

UI布局，可能需要用到react-router，或者自己写框架。这一块还未研究。

1.3 对比其它方案
React对比其它方案，突出优点是正交化、轻、约定性、务实：

正交：对比Vue, Angular更正交化，它没有template，大的component就是template。
轻：对比abobe flex或其它的UI系统是轻，没有复杂的UI OO体系，这也是说明React只是一个目标UI体系的粘合层。
约定性：约定大于Java仪式感，这也是自Rails之后在风潮。如pure render，最小化无状态state。
务实：通过JSX来组织表达控件的树形结构，用this.props来传递数据
1. 4 挑战
React是数据驱动式的UI component体系，是一个开放的数据依赖式，非自闭OO对象。它会有以下挑战

render方法可能很大，component显示逻辑是一次性在render里实现的。这里往往有两部分逻辑实现，初次数据绑定，与用户交互之后的算法。
render出一个ReactElement树，但这个树中的一些组件、UI元素因为计算被前移了，这会导致这个树看起来不太完整，进而不太直观。
虽然可以分解成小的component，构建大的Component可能是个挑战，因为所有逻辑都依赖于外部数据，而外部数据相对不稳定，组件失去了自我边界的保护，非自闭。
当交互复杂，组件的state也会越来越大，render全局算法会越来越难写。
把子组件的行为传上来也是一件不显化的事，往往需要把父组件的一个函数作为回调传给子组件。
大组件往往有多个Page，这几个Page如何交换数据是个很大的挑战
2. 谈谈对Redux的理解
2. 1 独特性
一个数据层的framework，类似于Baobab。比其好的一点，引入middleware体系，有几个现成的插件redux-thunk, redux-promise，不用但心异步请求的事。虽然说灵活、独立很重要，但全局设计也是 让人放心去用，而不用担心功能缺失和其它风险。
应用了FP中数据不可变性（immutable），这让追踪数据改变过程有很大提升。也就是其宣扬的时间旅行。这对复杂问题定位是有好处的。
树形化数据存储，reducer的返回即是其新建，更新、删除过程，树形结构不需要预先定义。同时，reducer也是纯函数，与reactor的render是纯函数呼应。
强约束（约定），增加了内聚合性。Flux中的action, dispatcher, store比较散，在分层架构是需要的，但内聚性不佳，出现java的仪式感。而redux是数据层很清晰，一个store，更新则dispatch到action，前半段自己想怎么搞就怎么搞(middleware），后半段reducer。reducer约束是不要改oldState，返回newStatew，做到immutable。
不一样的action：Redux中的action会切得很细，一个传统的Action被切成了三个Action：Loading, GetSuccess, GetError。所以，从这个方面来看Action服务于UI，而非业务逻辑单元。
Redux大量应用FP，经常遇到FP中的curry, trund, promise这些概念，学习成本较高。在middleware层实现，对没有FP经验的人讲不友好。
2.2 置Redux于上下文中
Redux是一个比较薄的数据层。同时，把View同步刷新也做了（redux-react）。
在传统MVC中，还是有一个controller来做业务逻辑。但Redux硬生生的把一个controller切成二部分:action, reducer。
理论上，Redux还可以把React组件中的stat的存储也拿过来，比如用户搜索的名称。这样，就可以把过滤算法放到selector中去。但这样好处并不是很大。
2.3 与其它方案对比
与Baobab对比，两者都是数据管理框架，Baobab提供cursor来方便你对很深层的数据结构进行update。而redux是通过selector函数来做，这种方法会比较晦涩。但比Baobab好的地方，做数据fetch可以通过Redux的middleware来完成。
与Rails的controller, ActionRecord相比，Redux更多是一种约定，不提供路由级的controller，不提供数据访问cursor。
接口不超过10个，代码也非常少，但是与之前的MVC框架完全不同。可能最大的问题是没有和react-route打通，在工程化时让人迷茫。​
2.4 挑战
Redux应用最大的挑战更多来自设计层面，如何设计action，设计state树形结构。我们只能通过非常少的线索（FP架构思想）去做，这对没有FP经验的团队是一个大挑战。
通过selector函数从stat树里取数据比较晦涩，并且这个selector里的代码认为是业务逻辑，单独放在selector，业务上不内聚。
middleware层设计：action是一个意图(intent），发送给middleware，让其来实现此意图。但这样做，action比有两义性，一会儿是对象，一会儿是函数。同时FP编程侵入性太大。
没有与Route结合起来设计，让人很不放心，也不知道如何在不同路由下来做数据与组件的connect。
3. 总结
react + redux是一种典型的FP编程范式实现，而其它框架大多是OO范式。是否选用react+redux开发，需要看是否对FP有掌握或者有一定的架构能力。但单独用react则没有这种要求，当个view来用。

3.1 FP vs OO
FP优缺点
FP的好处是没有OO的复杂仪式感，是沿着数据结构+算法的思路进行抽象和结构化。如果顶层设计做好，代码复用度极高，代码量少。比如要生成一颗树我用迭归算法直接生成，而OO的人往往会用一个Composite模式去定义一个晦涩的类接口。
FP的缺点也是也是面向过程编程的缺点，算法与数据全局化、并且互相耦合，这往往会导致一个强耦合的系统。如果没有做好顶层设计，是难以演进的。
通过约定和全局的理解，可以减少FP的一些缺点。“约定大于配置”也是框架的主要发展方向。​
OO优缺点
OO的好处是分而治之，增量演进。同时有自闭性，语义比较清晰。
缺点是在表达一些算法时，反而是很困难的。如command模式实现历史回滚就挺麻烦。也这是四人帮的设计模式大多比较难以理解的原因。另外，OO一直有一个对算法复用的问题，ruby语言解决比较好，用mixin很自然。而像C++就用多继承和泛型，个人感觉并不是最好的。​
3.2 建议
有FP经验的或者架构能力比较强，团队人员比较少、能力强，较强适合用react+redux。不然用react+angluar, 或直接用vue。
过度的OO，搞太多java仪式感确实没有必要。通过架构设计，FP在生产力有着一定的优势。同时对付复杂系统，能更好调测、定位问题。在新时代下，值得尝试。