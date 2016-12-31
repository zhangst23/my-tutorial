<?php

	require_once('../connect.php');
	$sql = "select * from article order by dateline desc";
	$query = mysql_query($sql);
	if ($query&&mysql_num_rows($query)) {
		while($row = mysql_fetch_assoc($query)){
			$data[] = $row;
		}
	}else{
		$data = array();
	}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>文章列表页</title>
</head>
<body>
	



	<?php
		if (!empty($data)) {
			foreach($data as $value){

	?>
	<tr>
		<td><?php echo $value['id']?></td>
		<td><?php echo $value['title']?></td>
		<td><a href="aiticle.del.handle.php?id=<?php echo $value['id']?>">删除</a><a href="article.modify.php?id=<?php echo $value['id']?>">修改</a></td>
	</tr>
		<?php
				
			}
		}
	?>







</body>
</html>