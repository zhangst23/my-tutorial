<?php
	require_once('../connect.php');
	//把传递过来的信息入库,在入库之前对所有的信息进行校验
	if(isset($_POST['title'])&&(!empty($_POST['title']))){
		echo "<script>alert('标题不能为空');window.location.href='article.add.php'</script>";

	}
	print_r($_POST);
	$title = $_POST['title'];
	$author = $_POST['author'];
	$description = $_POST['description'];
	$content = $_POST['content'];

	$dateline = time();
	$insertsql = "insert into article(title,author,description,content,dateline) values('$title','$author','$description','$content','$dateline')";
	// 使用前打印 sql 语句是否正确，对的话就把echo注释掉
	// echo $insertsql;
	if(mysql_query('$insertsql')){
		echo "<script>alert('发布文章成功');window.location.href='article.add.php'</script>";
	}else{
		echo "<script>alert('发布失败');window.location.href='article.add.php'</script>"
	};















?>