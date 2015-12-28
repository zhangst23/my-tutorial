<?php
//排行榜接口数据
//1.获取数据  2.把我们获取到的数据组装成接口数据提通信

require_once('../db.php');

$connect = Db::getInstance()->connect();

$sql = "select * from hit as a join news as b on a.news_id = b.id order by a.count desc limit 3";

$result = mysql_query($sql,$connect);

while($row = mysql_fetch_assoc($result)){
	$res[] = $row;
}



return show(1,'success',$res);


function show($code = 0,$message = 'error',$data = array()){
	$result = array(
		'code' => $code,
		'message' => $message,
		'data' => $data,
		);
}


print_r($res);

?>













