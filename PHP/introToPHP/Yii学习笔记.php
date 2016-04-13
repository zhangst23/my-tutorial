Yii学习笔记.php


- YII基础 
- YII扩展 
- YII工具


2.0  Activeform表单部分组件使用方法 [ 2.0 版本 ]
<!-- 文本框:textInput();
密码框:passwordInput();
单选框:radio(),radioList();
复选框:checkbox(),checkboxList();
下拉框:dropDownList();
隐藏域:hiddenInput();
文本域:textarea(['rows'=>3]);
文件上传:fileInput();
提交按钮:submitButton();
重置按钮:resetButtun(); 
 -->
<?php
$form = ActiveForm::begin(['action' => ['test/getpost'],'method'=>'post',]); ?>
<? echo $form->field($model, 'username')->textInput(['maxlength' => 20]) ?>
<? echo $form->field($model, 'password')->passwordInput(['maxlength' => 20]) ?>
<? echo $form->field($model, 'sex')->radioList(['1'=>'男','0'=>'女']) ?>
<? echo $form->field($model, 'edu')->dropDownList(['1'=>'大学','2'=>'高中','3'=>'初中'], ['prompt'=>'请选择','style'=>'width:120px']) ?>
<? echo $form->field($model, 'file')->fileInput() ?>
<? echo $form->field($model, 'hobby')->checkboxList(['0'=>'篮球','1'=>'足球','2'=>'羽毛球','3'=>'乒乓球']) ?>
<? echo $form->field($model, 'info')->textarea(['rows'=>3]) ?>
<? echo $form->field($model, 'userid')->hiddenInput(['value'=>3]) ?>
<? echo Html::submitButton('提交', ['class'=>'btn btn-primary','name' =>'submit-button']) ?>
<? echo Html::resetButton('重置', ['class'=>'btn btn-primary','name' =>'submit-button']) ?>
<?php ActiveForm::end(); ?>





4  Saying Hello
4.1 创建操作
<!-- 为了 “Hello”，需要创建一个 say 操作，从请求中接收 message 参数并显示给最终用户。如果请求没有提供 message 参数，操作将显示默认参数 “Hello”。 -->
controllers/SiteController.php
<?php
namespace app\controllers;
use yii\web\Controller;
class SiteController extends Controller
{
	// .. 其他代码 ..
	public function actionSay($message = 'Hello')
	{
		return $this->render('say', ['message' => $message]);
	}
}

4.2 创建视图
<?php
use yii\helpers\Html;
?>
<?= Html::encode($message) ?>

4.3 试运行
<!-- 创建完操作和视图后，你就可以通过下面的 URL 访问新页面了： -->
http://hostname/index.php?r=site/say&message=Hello+World



5 表单
<!-- 除了创建一个操作和两个视图外，还需要创建一个模型 -->
5.1 创建模型
<!-- 模型类 EntryForm 代表从用户那请求的数据，该类如下所示并存储在 models/EntryForm.php 文件中。请参考类自动加载章节获取更多关于类命名约定的介绍。 -->
<?php
namespace app\models;
use yii\base\Model;

class EntryForm extends Model
{
	public $name;
	public $email;

	public function rules()
	{
		return [
			[['name', 'email'], 'required'],
			['email', 'email'],
		];
	}
}


// 如果你有一个处理用户提交数据的 EntryForm 对象，你可以调用它的 yii\base\Model::validate() 方法触发数据验证。如果有数据验证失败，将把 yii\base\Model::hasErrors 属性设为 ture，想要知道具体发生什么错误就调用 yii\base\Model::getErrors。
<?php
$model = new EntryForm();
$model->name = 'Qiang';
$model->email = 'bad';
if ($model->validate()){
	//验证成功
}else{
	//失败
	//使用 $model->getErrors() 获取错误详情
}



5.2 创建操作
<?php
namespace app\controllers;

use Yii;
use Yii\web\Controller;
use app\models\EntryForm;

class SiteController extends Controller
{
	// 。。 其他代码 、、
	public function actionEntry()
	{
		$model = new EntryForm;
		if ($model->load(Yii::$app->request->post()) && $model->validate()) {
			// 验证 $model 收到的数据
			//做些有意义的事
			return $this->render('entry-confirm', ['model' => $model]);
		} else {
			// 无论是初始化显示还是数据验证错误
			return $this->render('entry', ['model' => $model]);
		}
	}
}


5.3 创建视图
views/site/entry-confirm.php
<?php
use yii\helpers\Html;
?>
<p>You have entered the following information;</p>
<ul>
	<li><label>Name</label>: <?= Html::encode($model->name) ?></li>
	<li><label>Email</label>: <?= Html::encode($model->email) ?></li>
</ul>


views/site/entry.php
<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>
<?php $form = ActiveForm::begin(); ?>
	<?= $form->field($model, 'name') ?>
	<?= $form->field($model, 'email') ?>
	<div class="form-group">
		<?= Html::submitButton('Submit', ['class' => 'btn btn-primary']) ?>
	</div>

<?php ActiveForm::end(); ?>


尝试下
<!-- 用浏览器访问下面的 URL 看它能否工作： -->
http://hostname/index.php?r=site/entry


输入有效的 name 和 email 信息并提交后，将会看到一个显示你所提交数据的确认页面。


################################
###############    YII基础     #################
################################
################################


1.0 控制器之响应处理
<?php
namespace app\controller;
use yii\web\Controller;

class HelloController extends Controller{
	public function actionIndex(){
		$res = \YII::$app->response;

		//$res->statusCode = '404';

		// $res->headers->add('pragma', 'no-cache');
		// $res->headers->set('pragma', 'max-age=5');
		// $res->headers->remove('pragma');


		// 跳转
		// $res->headers->add('lacation', 'http://www.baidu.com');
		// $this->redirect('http://www.baidu.com', 302);

		// 文件下载
		// $res->headers->add('content-disposition', 'attachment; filename="a.jpg"');
		// $res->sendFile('./a.txt');

	}
}
?>



1.2.0 控制器之session处理

<?php
namespace app\controller;
use yii\web\Controller;

class HelloController extends Controller{
	public function actionIndex(){
		$session = \YII::$app->session;

		$session->open();
		// if($session->isActive){
		// 	echo 'session is active';
		// }

		// $session->set('user', '张三');
		// echo $session->get('user');
		// $session->remove('user');

		// $session['user'] = '张三';
		// echo $session['user'];
		// unset($session['user']);

		// $session['user'] = '张三';
		echo $session['user'];
	}
}


1.3.0 控制器之 cookie 处理

<?php
namespace app\controller;
use yii\web\Cookie;

class HelloController extends Controller{
	public function actionIndex(){
		$cookies = \YII::$app->response->cookies;

		// $cookie_data = array('name'=>'user', 'value'=>'zhangsan');
		// $cookies->add(new Cookie($cookie_date));
		// $cookies->remove('id');

		$cookies = \YII::$app->request->cookies;
		echo $cookies->getValue('user', 10);   //如果设users 不存在，则返回 10.


	}
}



2.0 视图

<?php
namespace app\controller;
use yii\web\Controller;
use yii\web\Cookie;

class HelloController extends Controller{
	public function actionIndex(){

		$hello_str = 'Hello God!';
		// $test_arr = array(1, 2);

		//创建一个数组
		$data = array();

		//把需要传递给视图的数据放到数组当中
		$data['view_hello_str'] = $hello_str;
		// $data['view_test_arr'] = $test_arr;

		return $this->renderPartial('index', $data);
		// echo '';
	}
}
?>


<!-- index.php -->
<?php
use yii\helpers\Html;
use yii\helpers\HtmlPurifier;
?>
<h1><?=Html::encode($view_helo_str);?></h1>
<h1><?=HtmlPurifier::process($view_helo_str);?></h1>



2.2

<?php
namespace app\controller;
use yii\web\Controller;

class HelloController extends Controller{

	public $layout = 'common';
	public function actionIndex(){
		return $this->render('index'); //$content
	}
}
?>


<!-- common.php -->
<body>
	<h1>hello common</h1>
	<?=$content;?>
</body>



2.3 

<?php
同上
?>


<body>
	<?php if(isset($this->blocks['block1'])):?>
		<?=$this->blocks['block1'];?>
	<?php else:?>
		<h1>hello Common</h1>
	<?php endif;?>

	<?=$content;?>
</body>




3.0   数据模型

3.1  数据模型之单表查询   Test.php

<?php
namespace app\models;

use yii\db\ActiveRecord;
class Test extends ActiveRecord{

}


?>


<!-- HelloController.php -->
<?php
namespace app\controller;
use yii\web\Controller;
use app\models\Test;

class HelloController extends Controller{
	public function actionIndex(){

		//查询数据
		$sql = 'select * from test where id=:id';

		// $results = Test::findBySql($sql, array(':id'=>'1 or 1=1'))->all();

		// id = 1
		// $results = Test::find()->where(['id'=>1])->all();

		// id > 0
		// $results = Test::find()->where(['>', 'id', 0])->all();

		// id >= 1 并且 id<=2
		// $results = Test::find()->where(['between', 'id', 1, 2])->all();


		// title like "%title%"
		// $results = Test::find()->where(['like', 'title', 'title'])->all();


		// 查询结果转化成数组(减少内存的消耗)
		// $results = Test::find()->where(['between', 'id', 1, 2])->asArray()->all();

		// 批量查询
		// foreach(Test::find()->batch(2) as $tests){

		// 	print_R(count($tests));
		// }


		// print_R($results);
	}
}


3.2  数据模型之单表删除

<!-- HelloController.php -->
<?php
namespace app\controller;
use yii\web\Controller;
use app\models\Test;

class HelloController extends Controller{
	public function actionIndex(){

		// 删除数据
		// $results = Test::find()->where(['id'=>1])->all();
		// $results[0]->delete();

		Test:deleteAll('id>:id', array(':id'=>0));
	}
}




3.3  数据模型之单表添加数据

<!-- HelloController.php -->
<?php
namespace app\controller;
use yii\web\Controller;
use app\models\Test;

class HelloController extends Controller{
	public function actionIndex(){

		// 增加数据
		$test = new Test;
		$test->id = 3;
		$test->title = 'title3';
		$test->validate();
		if($test->hasErrors()){
			echo 'data is error';
			die;
		}
		$test->save();

	}
}

?>


<!-- Test.php -->

class Test extends ActiveRecord{
	
	public function rules(){
		return [
			['id', 'integer'],
			['title', 'string', 'length' => [0, 5]]
		];
	}
}


3.4  数据模型之单表数据修改

<!-- HelloController.php -->
<?php
namespace app\controller;
use yii\web\Controller;
use app\models\Test;

class HelloController extends Controller{
	public function actionIndex(){
		// 修改数据
		$test = Test::find()->where(['id'=>4])->one();
		$test->title = 'title4';
		$test->save();
	}
}
?>


3.5  数据模型之关联查询

<!-- HelloController.php -->
<?php
namespace app\controller;
use yii\web\Controller;
use app\models\Test;
use app\models\Customer;
use app\models\Order;



class HelloController extends Controller{
	public function actionIndex(){

		// 根据顾客查询他的订单的信息
		$customer = Customer::find()->where(['name'=>'zhangsan'])->one();
		// $orders = $customer->hasMany(Order::className(), ['customer_id'=>'id'])->all();

		// $orders = $customer->getOrders();
		$orders = $customer->getOrders();

		print_r($orders);


	}
}
?>


<!-- Customer.php -->
<?php
namespace app\models;

use yii\db\ActiveRecord;
class Customer extends ActiveRecord{

	// 帮助顾客获取订单信息   一对多关系
	public function getOrders(){
		$orders = $this->hasMany(Order::className(), ['customer_id'=>'id'])->asArray();
		return $orders;
	}

}


#######################################################

// 根据订单查询顾客的信息   一对一

$order = Order::find()->where(['id'=>1])->one();
$customer = $order->customer


// 根据订单查询顾客的信息  Order.php
public function getCustomer(){
	return $this->hasOne(Customer::className(), ['id'=>'customer_id'])->asArray();

}


#######################################################
1.0   Yii2.0 对数据库 查询的一些简单的操作

User::find()->all();    此方法返回所有数据；
User::findOne($id);   此方法返回 主键 id=1  的一条数据(举个例子)； 
User::find()->where(['name' => '小伙儿'])->one();   此方法返回 ['name' => '小伙儿'] 的一条数据；
User::find()->where(['name' => '小伙儿'])->all();   此方法返回 ['name' => '小伙儿'] 的所有数据；
User::find()->orderBy('id DESC')->all();   此方法是排序查询；
User::findBySql('SELECT * FROM user')->all();  此方法是用 sql  语句查询 user 表里面的所有数据；
User::findBySql('SELECT * FROM user')->one();  此方法是用 sql  语句查询 user 表里面的一条数据；
User::find()->andWhere(['sex' => '男', 'age' => '24'])->count('id');   统计符合条件的总条数；
User::find()->one();    此方法返回一条数据；
User::find()->all();    此方法返回所有数据；
User::find()->count();    此方法返回记录的数量；
User::find()->average();    此方法返回指定列的平均值；
User::find()->min();    此方法返回指定列的最小值 ；
User::find()->max();    此方法返回指定列的最大值 ；
User::find()->scalar();    此方法返回值的第一行第一列的查询结果；
User::find()->column();    此方法返回查询结果中的第一列的值；
User::find()->exists();    此方法返回一个值指示是否包含查询结果的数据行；
User::find()->batch(10);  每次取 10 条数据 
User::find()->each(10);  每次取 10 条数据， 迭代查询
#######################################################



3.6   数据模型之关联查询性能问题 


// 关联查询结果缓存
$customer = Customer::find()->where(['name'=>'zhangsan'])->one();

unset($customer->orders);

$orders = $customer->getOrders();


//关联查询的多次查询
// select * from customer
// select * from order where customer_id in(...)
$customers = Customer::find()->with('orders')->all();
foreach($customers as $customer){

	$orders = $customer->orders;
}

?>





################################
################    YII高效     ################
################################
################################


1.0  Gii

 开启: yii\base\Application::modules 属性开启. 通常 config/web.php 文件中有以下配置代码：
$config = [ ... ];
if(YII_ENV_DEV){
	$config['bootstrap'][] = 'gii';
	$config['modules']['gii'] = 'yii\gii\Module';
}

1.1  Model Generator
Table Name : contry
Model Class : Contry
Namespace : app\models
Base Class : yii\db\ActiveRecord
Database Connection ID : db
Generate Relations



1.2 Controller Generator

Controller : app\controllers\TestController
Action IDs : index test test2
Basic Class : yii\web\Controller


1.3  生成 CRUD 代码
<!-- CRUD 代表增，查，改，删操作，这是绝大多数 Web 站点常用的数据处理方式。选择 Gii 中的 “CRUD Generator” （点击 Gii 首页的链接）去创建 CRUD 功能。本例 “country” 中需要这样填写表单： -->
Model Class : app\models\Contry
Search Model Class : app\models\ContrySearch
Controller Class : app\controllers\ContryController

1.4  Module Generator  模块

Module Class : app\modules\Article
Module ID : article




1.5 Extension Generator






2.0 延迟加载



3.0 数据缓存


4.0 片段缓存

5.0 页面缓存

6.0 HTTP缓存



################################
################    YII扩展     ################
################################
################################

1.0 模块化

blog->users
		-头像
		-password
		-...
		-配置文件(上面子模块的开启关闭状态)
	->articles
	->comments
	->ads
	->配置文件


1.1
config\web.php   配置文件

1.2   GII:
app\modules\article\Article
article

app\modules\comment\Comment
comment


<?php
namespace app\controllers;
use yii\web\Controller;

class HelloController extends Controller{

	public function actionIndex() {

		// 获取子模块
		$article = \YII::$app->getModule('article');

		// 调用子模块的操作
		$article->runArticle('default/index');
	}
}


1.2.2  子模块

GII:
app\modules\article\modules\category\Category
category


// Article.php
<?php
namespace app\modules\article;

class Article extends \yii\base\Module
{
	public $controllerNamespace = 'app\modules\article\controllers';

	public function init(){
		parent::init();
		$this->modules = [
			'category' => [
				'class' => 'app\modules\article\modules\category\Category',
			]
		]
	}
}





2.0  事件机制

->扫描式
->绑定式
	-trigger()
	-on()


2.1
animal
	-Cat.php
	-Mourse.php
	-Dog.php


// Cat.php
<?php
namespace vendor\animal;
use \yii\base\Component;
use \yii\base\Event;

class MyEvent extends Event{
	public $message;
}

class Cat extends Component{

	public function shout(){
		echo 'miao miao miao <br>';
		$me = new MyEvent;
		$me->message = 'hello my event <br>';
		$this->trigger('miao', $me);
	}
}


// Mourse.php
<?php
namespace vendor\animal;
use \yii\base\Component;

class Mourse{
	public function run($e){
		echo $e->message;
		echo 'i am running! <br>';
	}
}


// Dog.php
<?php
namespace vendor\animal;

class Dog{
	public function look(){
		echo 'i am looking! <br>';
	}
}




// base\controllers\AnimalController.php
<?php
namespace app\controllers;
use yii\web\Controller;
use vendor\animal\Cat;
use vendor\animal\Mourse;
use vendor\animal\Dog;
use \yii\base\Event;


class AnimalController extends Controller{

	public function actionIndex() {


		\YII::$app->on(\yii\base\Application::EVENT_AFTER_REQUEST, function(){
			echo 'event after request <br>';
		})
		echo 'hello index action <br>';
		// $cat = new Cat;
		// $cat2 = new Cat;
		// $mourse = new Mourse;
		// $dog = new Dog;


		// // Event::on(Cat::className(), 'miao', [$mouse, 'run']);  //类级别的事件绑定
		// // $cat->on('miao', [$mourse, 'run']);
		// // $cat->on('miao', [$dog, 'look']);
		// // $cat->off('miao', [$dog, 'look']);
		// Event::on(Cat::className(), 'miao', function(){
		// 	echo 'miao event has triggered <br>';
		// });

		// $cat->shout();
		// $cat2->shout();
	}
}



3.0  mixin


-类的混合
-对象的混合

3.1  类的混合
// Behavior1.php
<?php
namespace app\Behaviors;
use yii\base\Bahavior;
use 

class Behavior1 eventds Behavior{

	public $height;
	public function eat(){
		echo 'dog eat';
	}

	public function events(){
		return [
			'wang'=>'shout'
		];
	}

	public function shout($event){
		echo 'wang wang wang <br>';
	}
}


// Dog.php
<?php
namespace vendor\animal;
use app\behaviors\Behavior1;
use yii\base\Component;

class Dog extends Component{
	public function behaviros(){
		return [
			Behaviro1::className()
		];
	}

	public function look(){
		echo 'i am looking! <br>';
	}

}


// base\controllers\AnimalController.php
<?php
namespace app\controllers;
use yii\web\Controller;
use vendor\animal\Cat;
use vendor\animal\Mourse;
use vendor\animal\Dog;
use \yii\base\Event;


class AnimalController extends Controller{

	public function actionIndex() {

		$dog = new Dog();
		$dog->trigger('wang');
		// $dog->look();
		// $dog->eat();
		// $dog->height = '15cm';
		// echo $dog->height;
	}
}
?>


3.1 对象的混合



4.0  依赖注入  -  解决对象的耦合度

-容器 定义并解决依赖关系
-服务定位器 配置服务的参数信息












################################
################    YII工具     ################
################################
################################


1.0 Composer  管理依赖关系的工具,方便下载第三方库

swiftmailer
fpdf
bootstrap
gii
...

1.1

composer.phar install



2.0  debug

basic/web/index/php?r=debug

3.0 GII

basic/web/index/php?r=gii






################################
################    YII入门     ################
################################
################################


1.0 文件上传












