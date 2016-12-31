<?php

	require_once('connect.php');
	$id = intval($_GET['id']);
	$sql = "select * from article where id=$id";
	$query = mysql_query($sql);
	if ($query&&mysql_num_rows($query)) {
		$row = mysql_fetch_assoc($query);
	}else{
		echo "这篇文章不存在";
		exit;
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>文章内容页</title>
</head>
<body>
	
	<div id="page">
		<div class="content">
			<div class="post">
				<h1 class="title">
					<?php echo $row['title']?>
					<span>作者<?php echo $row['author'];?></span>
				</h1>
				<div class="entry">
					<?php echo $row['content']?>
				</div>
			</div>
		</div>
	</div>
















</body>
</html>