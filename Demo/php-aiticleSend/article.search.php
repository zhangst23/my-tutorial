<?php
	require_once('connect.php');
	$key = $_GET['key'];
	$sql = "select * from article where title like  '$key%' order by dateline desc";
	$query = mysql_query($sql);
	if ($query&&mysql_num_rows($query)) {
		while($row = mysql_fetch_assoc($query)){
			$data[] = $row;
		}
	}
	print_r($data);









?>