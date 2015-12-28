<?php

//1.连接数据库、然后从数据库里面获取数据
//2.把获取到的数据填充到模板文件里面
//3.需要把动态的页面转化为静态页面，生成纯静态文件

require_once('/data/static/db.php');

$connect = Db::getInstance() -> connect();
$sql = "select * from news where 'category_id' = 1 and 'status' = 1 order by id desc limit 5";
$result = mysql_query($sql,$connect);
$new = array();
while($row = mysql_fetch_array($result)){
	$news[] = $row;
}
ob_start();
//引入模板文件
require_once('/data/static/templates/singwa.php');
if (file_put_contents('/data/static/index.shtml',ob_get_clean())) {
	echo "success";
}else{
	echo "error";
}










?>