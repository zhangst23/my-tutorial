mongoose 学习笔记.js

1. 名词解释
Schema : 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
Model : 由 Schema 发布生成的模型，具有抽象属性和行为的数据库操作对
Entity : 有 Model 创建的实体, 它的操作也会影响数据库


 	var PersonSchema;   //Person的文本属性
    var PersonModel;    //Person的数据库模型
    var PersonEntity;   //Person实体

Schema、Model、Entity的关系请牢记，Schema生成Model，Model创造Entity，
Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。


2. 准备工作
2.1 在项目只能够创建一个数据库连接，如下:
var mongoose = require('mongoose');  //引用 mongoose 模块
var db = mongoose.createConnection('localhost', 'text');   // 创建一个数据库连接

2.2 打开本机localhost的test数据库时，我们可以监测是否有异常

    db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
      //一次打开记录
    });

2.3 定义一个Schema

var PersonSchema = new mongoose.Schema({
	name:String      // 定义一个属性name，类型为 String
})

2.4 将该Schema发布为Model
var PersonModel = db.model('Person', PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
//var PersonModel = db.model('Person');
//如果没有发布，上一段代码将会异常

2.5 用Model创建Entity
var personEntity = new PersonModel({name:'Krouky'});
//打印这个实体的名字看看
console.log(personEntity.name); //Krouky

2.6 我们甚至可以为此Schema创建方法
PersonSchema.methos.speak = function(){
	console.log('我的名字叫' + this.name);
}
var PersonModel = db.model('Person',PersonSchema);
var personEnitity = new PersonModel({name:'Krouky'});
personEnitity.speak();

2.7 Entity是具有具体的数据库操作CRUD的
    personEntity.save();  //执行完成后，数据库就有该数据了

2.8 如果要执行查询，需要依赖Model，当然Entity也是可以做到的
    PersonModel.find(function(err,persons){
      //查询到的所有person
    });















