<?php

	require_once('../connect.php');
	$id = $_POST['author'];
	$title = $_POST['title'];
	$author = $_POST['author'];
	$description = $_POST['description'];
	$content = $_POST['content'];
	$dateline = $_POST['dateline'];
	$updatesql = "update article set id='$id',title='$title',author='$author',description='$description',content='$content',dateline=$dateline where id=$id";

	if (mysql_query($updatesql)) {
		echo "<script>alert('修改文章成功');window.location.href='article.manage.php';</script>";
	}else{
		echo "<script>alert('修改文章失败');window.location.href='article.manage.php';</script>";












?>