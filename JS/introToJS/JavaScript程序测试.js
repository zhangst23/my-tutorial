// JavaScript程序测试.js

来源:http://javascript.ruanyifeng.com/tool/testing.html
1.0   
// Web应用程序越来越复杂，这意味着有更多的可能出错。测试是帮助我们提高代码质量、降低错误的最好方法和工具之一。

// ~测试可以确保得到预期结果。
// ~加快开发速度。
// ~方便维护。
// ~提供用法的文档。

// 通过测试提供软件的质量，在开始的时候，可能会降低开发速度。但是从长期看，尤其是那种代码需要长期维护、不断开发的情况，测试会大大加快开发速度，减轻维护难度。

2.0   测试的类型
2.1  单元测试
// 单元测试（unit testing）指的是以软件的单元（unit）为单位，对软件进行测试。单元可以是一个函数，也可以是一个模块或组件。它的基本特征就是，只要输入不变，必定返回同样的输出。

// “单元测试”这个词，本身就暗示，软件应该以模块化结构存在。每个模块的运作，是独立于其他模块的。一个软件越容易写单元测试，往往暗示着它的模块化结构越好，各模块之间的耦合就越弱；越难写单元测试，或者每次单元测试，不得不模拟大量的外部条件，很可能暗示软件的模块化结构越差，模块之间存在较强的耦合。

// 单元测试的要求是，每个模块都必须有单元测试，而软件由模块组成。

// 单元测试通常采取断言（assertion）的形式，也就是测试某个功能的返回结果，是否与预期结果一致。如果与预期不一致，就表示测试失败。

// 单元测试是函数正常工作、不出错的最基本、最有效的方法之一。 每一个单元测试发出一个特定的输入到所要测试的函数，看看函数是否返回预期的输出，或者采取了预期的行动。单元测试证明了所测试的代码行为符合预期。

// 单元测试有助于代码的模块化，因此有助于长期的重用。因为有了测试，你就知道代码是可靠的，可以按照预期运行。从这个角度说，测试可以节省开发时间。单元测试的另一个好处是，有了测试，就等于就有了代码功能的文档，有助于其他开发者了解代码的意图。

// 单元测试应该避免依赖性问题，比如不存取数据库、不访问网络等等，而是使用工具虚拟出运行环境。这种虚拟使得测试成本最小化，不用花大力气搭建各种测试环境。

// 一般来说，单元测试的步骤如下。

// ~准备所有的测试条件
// ~调用（触发）所要测试的函数
// ~验证运行结果是否正确
// ~还原被修改的记录

2.2   其他测试类型

（1）集成测试
// 集成测试（Integration test）指的是多个部分在一起测试，比如测试一个数据库连接模块，是否能够连接数据库。

（2）功能测试
// 功能测试（Functional test）指的是，自动测试整个应用程序的某个功能，比如使用Selenium工具自动打开浏览器运行程序。

（3）端对端测试
// 端对端测试（End-to-End testing）指的是全链路测试，即从开始端到终止端的测试，比如测试从用户界面、通过网络、经过应用程序处理、到达数据库，是否能够返回正确结果。端对端测试的目的是，确保整个系统能够正常运行，各个子系统之间依赖关系正常，数据能够在子系统之间、模块之间正确传递。

（4）冒烟测试
// 冒烟测试（smoke testing）指的是，正式的全面测试开始之前，对主要功能进行的预测试。它的主要目的是，确认主要功能能否满足需要，软件是否能运行。冒烟测试可以是手工测试，也可以是自动化测试。

// 这个名字最早来自对电子元件的测试，第一次对电子元件通电，看看它是否会冒烟。如果没有冒烟，说明通过了测试；如果电流达到某个临界点之后，才出现冒烟，这时可以评估是否能够接受这个临界点。

2.3   开发模式
// 测试不仅能够验证软件功能、保证代码质量，也能够影响软件开发的模式。

2.3.1   TDD
// TDD是“测试驱动的开发”（Test-Driven Development）的简称，指的是先写好测试，然后再根据测试完成开发。使用这种开发方式，会有很高的测试覆盖率。

// TDD的开发步骤如下。

       ~先写一个测试。
       ~写出最小数量的代码，使其能够通过测试。
       ~优化代码。
       ~重复前面三步。

// TDD开发的测试覆盖率通常在90%以上，这意味着维护代码和新增特性会非常容易。因为测试保证了你可以信任这些代码，修改它们不会破坏其他代码的运行。

// TDD接口提供以下四个方法。

        ~suite()
        ~test()
        ~setup()
        ~teardown()

// 下面代码是测试计数器是否加1。
suite('Counter',function(){
	test('tick increases count to 1',function(){
		var counter = new Counter();
		counter.tick();
		assert.equal(counter.count,1);
	})
})

2.3.2   BDD
// BDD是“行为驱动的开发”（Behavior-Driven Development）的简称，指的是写出优秀测试的最佳实践的总称。

// BDD认为，不应该针对代码的实现细节写测试，而是要针对行为写测试。BDD测试的是行为，即软件应该怎样运行。

// BDD接口提供以下方法。

      ~describe()
      ~it()
      ~before()
      ~after()
      ~beforeEach()
      ~afterEach()

// 下面是测试计数器是否加1的BDD写法。
describe('Counter',function(){
	it('should increase count by 1 after calling tick',function(){
		var counter = new Counter();
		var expectedCount = counter.count + 1;
		counter.tick();
		assert.equal(counter.count,expectedCount);
	})
})

// 下面是一个BDD开发的示例。现在，需要开发一个Foo类，该类的实例有一个sayHi方法，会对类参数说“Hi”。这就是Foo类的规格，根据这个规格，我们可以写出测试用例文件foo.spec.js。
describe('Simple object',function(){
	var foo;
	beforeEach(function(){
		foo = new Foo('John');
	});
	it('should say hi',function(){
		expect(foo.sayHi()).toEqual('John says hi!');
	});
});

// 有了测试用例以后，我们再写出实际的脚本文件foo.js。
function Foo(name){
	this.name = name;
}
Foo.prototype.sayHi = function(){
	return this.name + 'say hi!';
};



2.3.3      BDD术语
（1）测试套件

// 测试套件（test suite）指的是，一组针对软件规格的某个方面的测试用例。也可以看作，对软件的某个方面的描述（describe）。

// 测试套件由一个describe函数构成，它接受两个参数：第一个参数是字符串，表示测试套件的名字或标题，表示将要测试什么；第二个参数是函数，用来实现这个测试套件。

describe("A suite", function() {
  // ...
});

（2）测试用例

// 测试用例（test case）指的是，针对软件一个功能点的测试，是软件测试的最基本单位。一组相关的测试用例，构成一个测试套件。测试用例由it函数构成，它与describe函数一样，接受两个参数：第一个参数是字符串，表示测试用例的标题；第二个参数是函数，用来实现这个测试用例。

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    // ...
  });
});

（3）断言

// 断言（assert）指的是对代码行为的预期。一个测试用例内部，包含一个或多个断言（assert）。

// 断言会返回一个布尔值，表示代码行为是否符合预期。测试用例之中，只要有一个断言为false，这个测试用例就会失败，只有所有断言都为true，测试用例才会通过。
describe("A suite",function(){
	it("contains spec with an expectation",function(){
		expect(true).toBe(true);
	});
});

2.4   断言
// 断言是判断实际值与预期值是否相等的工具
// 断言有 assert expext  should 三种风格，或者称为三种写法.

//assert  风格
assert.equal(event.detail.item,'(item)');
//expect  风格
expect(event.detail.item).to.equal('(item)');
//should风格
event.detail.item.should.equal('(item)');

// Chai.js是一个很流行的断言库，同时支持上面三种风格。

（1） assert风格
var assert = require('chai').assert;
var foo = 'bar';
var beverages = { tea:['chai','matcha','oolong'] };

assert.typeof(foo,'string','foo is a string');
assert.equal(foo,'bar','foo equal 'bar'');
assert.lengthOf(foo,3,'foo\'s value has a length of 3');
assert.lengthOf(beverages.tea,3,'beverages has 3 types of tea');

// 上面代码中，assert方法的最后一个参数是错误提示信息，只有测试没有通过时，才会显示。

（2）expect风格
var expect = require('chai').expect;
var foo = 'bar';
var beverages = {tea:['chai','metcha','oolong']};

expect(foo).to.be.a('string');
expect(foo).to.be.equal('bar');
expect(foo).to.have.length(3);
expect(beverages).to.have.property('tea').with.length(3);

(3)should风格
var should = require('chai').should();
var foo = 'bar';
var beverages = {tea:['chai','matcha','oolong']};

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
beverages.should.have.property('tea').with.length(3);



????未完：http://javascript.ruanyifeng.com/tool/testing.html






































