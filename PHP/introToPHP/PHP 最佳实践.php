PHP 最佳实践.php


1.0  存储密码  使用 phpass 库来哈希和比较密码
<?php
// Include phpass 库
require_once('phpass-03/PasswordHash.php')

// 初始化散列器为不可移植
$hasher = new PasswordHash(0, false);

// 计算密码的哈希值 $hashedPassword 是一个长度为 60 个字符的字符串.
$hashedPassword = $hasher->HashPassword('My super cool password');

// 你现在可以安全地将 $hashedPassword 保存到数据库中!

// 通过比较用户输入内容（产生的哈希值）和我们之前计算出的哈希值，来判断用户是否输入了正确的密码
$hasher->CheckPassword('the wrong password', $hashedPassword);   // false

$hasher->CheckPassword('my super cool password', $hashedPassword);
?>

为什么使用 md5 或 sha 哈希密码是不安全的
https://blogs.msdn.microsoft.com/lixiong/2011/12/




2.0  PHP 与 MySQL
使用 PDO 及其预处理语句功能。
在 PHP 中，有很多方式来连接到一个 MySQL 数据库。PDO（PHP 数据对象）是其中最新且最健壮的一种。 PDO 跨多种不同类型数据库有一个一致的接口，使用面向对象的方式，支持更多的新数据库支持的特性。

<?php
try{
	$link = new \PDO( 'mysql:host=your-hostname;dbname=your-db',
					  'your-username',
					  'your-password',
					  array(
					  	\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
					  	\PDO::ATTR_PERSISTENT => false,
					  	\PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8md4'
					  )
					);
	$handle = $link->prepare('select Username from Users where UserId = ? or Username = ? limit ?');

	$handle->bindValue(1, 100, PDO::PARAM_INT);
	$handle->bindValue(2, 'Bilbo Baggins');
	$handle->bindValue(3, 5, PDO::PARAM_INT);

	$handle->execute();

	$result = $handle->fetchAll(\PDO::FETCH_OBJ);

	foreach($result as $row){
		print($row->Username);
	}
}
catch(\PDOException $ex){
	print($ex->getMessage());
}
?>


3.0  自动加载类
使用 spl_autoload_register() 来注册你的自动加载函数。
处理这个问题的正确方法是唯一地命名你的自动加载函数，然后使用 spl_autoload_register() 函数来注册它。 该函数允许定义多个 __autoload() 这样的函数，因此你不必担心其他代码的 __autoload() 函数。
<?php
// 首先，定义你的自动载入的函数
function myAutoload($className){
	include_once($className . '.php');
}

// 然后注册它
sql_autoload_register('MyAutoload');

// Try it out!
// 因为我们没包含一个定义有 MyClass 的文件，所以自动加载器会介入并包含 MyClass.php。
// 在本例中，假定在 MyClass.php 文件中定义了 MyClass 类。
$var = new MyClass();

?>



4.0  define() vs. const
使用 define()，除非考虑到可读性、类常量、或关注微优化
<?php
namespace MiddleEarch\Creatures\Dwarves;
const GIMLI_ID = 1;
define('MiddleEarch\Creatures\Elves\LEGOLAS_ID', 2);

echo(\MiddleEarch\Creatures\Dwarves\GIMLI_ID);
echo(\MiddleEarth\Creatures\Elves\LEGOLAS_ID); 

...
?>



5  缓存 PHP opcode
使用 APC
在 Ubuntu 12.04 上你可以通过在终端中执行以下命令来安装 APC：
user@localhost: sudo apt-get install php-apc
将 APC 作为一个持久化键-值存储系统来使用
APC 也提供了对于你的脚本透明的类似于 memcached 的功能。 与使用 memcached 相比一个大的优势是 APC 是集成到 PHP 核心的，因此你不需要在服务器上维护另一个运行的部件， 并且 PHP 开发者在 APC 上的工作很活跃。 但从另一方面来说，APC 并不是一个分布式缓存，如果你需要这个特性，你就必须使用 memcached 了。
<?php
apc_store('username-1532', 'Frodo Baggins');
apc_store('username-958', 'Aragorn');
apc_store('username-6389', 'Gandalf');

$value = apc_fetch('username-958', $success);
if ($success === true) 
	print($value);

$value = apc_fetch('username-1', $success);
if ($success !== true)
	print('Key not found');

apc_delete('username-958');

?>


6  PHP 与 Memcached
若你需要一个分布式缓存，那就使用 Memcached 客户端库。否则，使用 APC。


7  配置 Web 服务器提供 PHP 服务
使用 PHP-FPM

<!-- 安装 PHP-FPM 和 Apache -->
<!-- 在 Ubuntu 12.04 上你可以使用如下命令安装 PHP-FPM 和 Apache： -->
sudo apt-get install apache2-mpm-worker
libapache2-mod-fastcgi php5-fpm

sudo a2enmod actions alias fastcgi
<!-- 注意我们 必须 使用 apache2-mpm-worker，而不是 apache2-mpm-prefork 或 apache2-mpm-threaded。 -->
<!-- 接下来配置 Aapache 虚拟主机将 PHP 请求路由到 PHP-FPM 进程。将如下配置语句放入 Apache 配置文件（在 Ubuntu 12.04 上默认配置文件是 /etc/apache2/sites-available/default）。 -->
<VirtualHost *:80>
    AddHandler php5-fcgi .php
    Action php5-fcgi /php5-fcgi
    Alias /php5-fcgi /usr/lib/cgi-bin/php5-fcgi
    FastCgiExternalServer /usr/lib/cgi-bin/php5-fcgi -host 127.0.0.1:9000 -idle-timeout 120 -pass-header Authorization
</VirtualHost>
<!-- 最后，重启 Apache 和 FPM 进程： -->
user@localhost: sudo service apache2 restart && sudo service php5-fpm
restart




8 发送邮件
使用PHPMailer
是一个流行而成熟的开源库，为安全地发送邮件提供一个易用的接口。 它关注可能陷阱，这样你可以专注于更重要的事情。

<?php
require_once('phpmailer-5.1/class.phpmailer.php');

$mailer = new PHPMailer(true);

$mailer->Sender = 'bbaggins@example.com';
$mailer->AddReplyTo('bbaggins@example.com', 'Bilbo Baggins');
$mailer->SetFrom('bbaggins@example.com', 'Bilbo Baggins');
$mailer->AddAddress('gandalf@example.com');
$mailer->Subject = 'The finest weed in the South Farthing';
$mailer->MsgHTML('<p>You really must try it, Gandalf!</p><p>-Bilbo</p>');

$mailer->IsSMTP();
$mailer->SMTPAuth = true;
$mailer->SMTPSecure = 'ssl';
$mailer->Port = 465;
$mailer->Host = 'my smpt host';
$mailer->Username = 'my smtp username';
$mailer->Password = 'my smtp password';

$mailer->Send();

?>


9  验证邮件地址
使用 filter_var() 函数
Web 应用可能需要做的一件常见任务是检测用户是否输入了一个有效的邮件地址。毫无疑问你可以在网上找到一些声称可以解决该问题的复杂的正则表达式，但是最简单的方法是使用 PHP 的内建 filter_val() 函数。

<?php
filter_var('sgamgee@example.com', FILTER_VALIDATE_EMAIL);
//Returns "sgamgee@example.com". This is a valid email address.

filter_var('sauron@mordor', FILTER_VALIDATE_EMAIL);
// Returns boolean false! This is *not* a valid email address.
?>


10   PHP 与 UTF-8
没有一行式解决方案。小心、注意细节，以及一致性。

<?php
// Tell PHP that we're using UTF-8 strings until the end of the script
mb_internal_encoding('UTF-8');

// Tell PHP that we'll be outputting UTF-8 to the browser
mb_http_output('UTF-8');

?>


11  处理日期和时间   使用DateTime 类。

<?php
$date = new DateTime('2011-05-04 05:00:00', new DateTimeZone('UTC'));

$date->add(new DateInterval('P10D'));

echo($date->format('Y-m-d h:i:s'));

$date->setTimezone(new DateTimeZone('America/Los_Angeles'));

echo($date->format('Y-m-d h:i:s'));

$later = new DateTime('2013-05-20', new DateTimeZone('UTC'));

if ($date < $later)
	echo('Yup, you can compare dates using these easy operators!');

$difference = $date->diff($later);

echo('The 2nd date is' . $difference['days'] . ' later than 1st date.');

?>


12   检测一个值是否为 null 或 false
使用 === 操作符来检测 null 和布尔 false 值。





















