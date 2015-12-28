PDO异常处理.php
PDO::ATR_ERRMODE
	(1)PDO::ATTR_ERRMODE   //不报错误（忽略）（0）
	(2)PDO::ERRMODE_WARNING   // 以警告的方式报错（1）
	(3)PDO::ERRMODE_EXCEPTION  // 以异常的方式报错(2)
setAttribute
getAttribute

<?php
//默认是不提示的，需要用errorCode() errorInfo()
try{
	$pdo = new PDO("mysql:host=localhost;dbname=jikexueyuan","root","");
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){
	die("数据库连接失败".$e->getMessage());
}
$sql = "insert into stuu values(null,'jike','w',55)";

try{
	$res = $pdo->exec($sql);

}catch(PDOException $e){
	echo $e->getMessage();
}









?>














