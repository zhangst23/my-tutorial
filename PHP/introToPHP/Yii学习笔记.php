Yii学习笔记.php


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




3.0    用 Gii 生成代码
3.1 开启: yii\base\Application::modules 属性开启. 通常 config/web.php 文件中有以下配置代码：
$config = [ ... ];
if(YII_ENV_DEV){
	$config['bootstrap'][] = 'gii';
	$config['modules']['gii'] = 'yii\gii\Module';
}

3.2   生成活动记录类
Table Name : contry
Model Class : Contry
Namespace : app\models
Base Class : yii\db\ActiveRecord
Database Connection ID : db
Generate Relations


3.3  生成 CRUD 代码
<!-- CRUD 代表增，查，改，删操作，这是绝大多数 Web 站点常用的数据处理方式。选择 Gii 中的 “CRUD Generator” （点击 Gii 首页的链接）去创建 CRUD 功能。本例 “country” 中需要这样填写表单： -->
Model Class : app\models\Contry
Search Model Class : app\models\ContrySearch
Controller Class : app\controllers\ContryController

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
################################
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
		$orders = $customer->hasMany('app\models\Order', ['customer id'=>'id'])->all();

		print_r($orders);













	}
}
?>




