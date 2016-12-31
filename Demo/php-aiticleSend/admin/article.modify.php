<?php
	require_once('../connect.php');
	//读取旧信息
	$id = $_GET['id'];
	$query = mysql_query("select * from article where id=$id");
	$data = mysql_fetch_assoc($query);

?>




<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>


<form action="article.modify.handle.php" id="form1" name="form1" method="post">

	<input type="hidden" name="id" value="<?php echo $data['id']?>"/>

	<input type="text" name="title" id="title" value="<?php echo $data['title']?>"/>

	<input type="text" name="author" id="author" value="<?php echo $data[author]?>"/>

	<textarea name="description" id="description" cols="60" rows="5"><?php echo $data['description']?></textarea>

	<textarea name="content" id="description" cols="60" rows="20"><?php echo $data['content']?></textarea>

</form>


	
</body>
</html>





