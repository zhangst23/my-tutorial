<?php
	require_once('../connect.php');
	$id = $_GET['id'];
	$deletesql = "delete from article where id=$id";
	if (mysql_query($deletesql)) {
		echo "<script>alert('删除文章成功')</script>";
	}else {
		echo "<script>alert('删除失败')</script>";
	}

?>