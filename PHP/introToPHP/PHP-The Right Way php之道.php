PHP-The Right Way php之道.php

1.0  入门指南
1.1 内置的web服务器
php -S localhost:8000

1.2 Mac 安装

2.0  代码风格

phpcs -sw --standard=PSR2 file.php

3.0 语言亮点
3.1 函数式编程
函数 递归 闭包

3.2 元编程
魔术方法 反射 重载

3.3 命名空间
命名空间好比操作系统中的目录，两个同名的文件可以共存在不同的目录下。同理两个同名的 PHP 类可以在不同的 PHP 命名空间下共存

3.4 PHP 标准库
提供了一组类和接口。包含了常用的数据结构类 (堆栈，队列，堆等等)，以及遍历这些数据结构的迭代器，或者你可以自己实现 SPL 接口。

3.5 命令行接口
php -i



4   依赖管理
Composer

添加这一行到你应用的主要 PHP 文件中，这将会告诉 PHP 为你的项目依赖使用 Composer 的自动加载器。
<?php
require 'vendor/autoload.php';
?>

Composer 会建立一个 composer.lock 文件，在你第一次执行 php composer.phar install 时，存放下载的每个依赖包精确的版本编号。假如你要分享你的项目给其他开发者，并且 composer.lock 文件也在你分享的文件之中的话。 当他们执行 php composer.phar install 这个命令时，他们将会得到与你一样的依赖版本。 当你要更新你的依赖时请执行 php composer.phar update




5  开发实践

5.1  基础知识


5.2 日期和时间 DateTime


5.3 设计模式
5.3.1 工厂模式
最常用的设计模式就是工厂模式。在这个模式下，需要一个用来创建你需要的对象的类。考虑下面的工厂模式的例子：


5.3.2 单例模式
我们设计 web 应用时，我们经常需要取得某个类的唯一实例，单例模式就帮我们解决了这个问题。

5.3.3 策略模式
使用策略模式，你可以把一族不同的算法（业务）封装到不同的类中，使 client 类可以在不知道具体实现的情况下选择实例化其中一个算法。策略模式有几种不同的变体，最简单的是下面这种：
第一段代码展示了一族输出算法，分别具体实现了 OutputInterface 的 load 方法，返回序列化结果，json 和数组：

5.3.4  前端控制器模式
前端控制器模式就是给你的 web 应用程序设置单一的入口（比如 index.php），用来集中处理所有请求的机制。 它的职责是载入所有依赖，处理请求，并发送响应给浏览器。前端控制器模式对整个架构是有益的，因为它鼓励模块化代码，并给了你一个单入口，可以写一些每个请求都需要跑的代码（比如输入数据的过滤）。

5.3.5 模型-视图-控制器（MVC）
MVC 属架构模式，和设计模式是不同层级的概念，请不要因为本文把它列在“设计模式”下而混淆
根据逻辑对象的不同作用去解耦。 模型用来作为数据访问层，并以应用中通用的格式返回数据。 控制器处理请求，处理从模型层返回的数据，并载入视图，发送响应。 视图用来展示需要在响应中使用的模板（markup, xml 等等）。




5.4  使用 UTF-8 编码
这不是在开玩笑。请小心、仔细并且前后一致地处理它。

PHP 层面的 UTF-8
数据库层面的 UTF-8  ->  请检查确认你的数据库和数据表都设定为 utf8mb4 字符集和整理
浏览器层面的 UTF-8  ->  使用 mb_http_output() 函数来确保 PHP 向浏览器输出 UTF-8 格式的字符串

<?php
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

$string = 'El sila erin vin';

$string = mb_substr($string, 0, 15);

$link = new PDO(
	'mysql:host=your-hostname;dbname=your-db;charset=utf8md4',
	'your-username',
	'your-password',
	array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_PERSISTENT => false
	)
);


header('Content-Type: text/html; charset=UTF-8');
?>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
</html>




6  依赖注入
依赖注入是一种允许我们从硬编码的依赖中解耦出来，从而在运行时或者编译时能够修改的软件设计模式。



7 数据库

7.1  PDO 扩展
<?php
// PDO + MySQL
$pdo = new PDO('mysql:host=example.com; dbname=database', 'user', 'password');
$statement = $pdo->query("SELECT some_field FROM some_table");
$row = $statement->fetch(PDO::FETCH_ASSOC);
echo htmlentities($row['some_field']);
?>

7.2   数据库交互
<?php
function getAllFoos($db){
	return $db->query('SELECT * FROM table');
}

foreach(getAllFoos($db) as $row){
	echo "<li>".$row['field1']." - ".$row['field1']."</li>";  //BAD!!
}
?>

<!-- foo.php -->
<?php
$db = new PDO('mysql:host=localhost;dbname=testdb;charset=utf8', 'username', 'password');

// Make your model available
include 'models/FooModel.php';

// Create an instance
$fooModel = new FooModel($db);
// Get the list of Foos
$foolist = $fooModel->getAllFoos();

//Show the view
include 'views/foo-list.php';
?>

<!-- models/FooModel.php -->
<?php
class FooModel
{
	protected $db;
	public function __construct(PDO $db)
	{
		$this->db = $db;
	}

	public function getAllFoos(){
		return $this->db->query('SELECT * FROM table');
	}
}

?>


<!-- views/foo-list.php -->
<?php foreach ($fooList as $row): ?>
	<?= $row['field1'] ?> - <?= $row['field1'] ?>
<?php endforeach?>















