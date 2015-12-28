<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>学生信息管理</title>
	<script>
	function doDel(id){
		if (confirm("确定要删除吗？")) {
			window.location='action.php?action=del&id='+id;
		};
	}
	</script>
</head>
<body>
	<center>
		<?php include("menu.php");?>
		<h3>浏览学生信息</h3>
		<table width="600" border="1">
		<tr>
			<td>ID</td>
			<td>姓名</td>
			<td>性别</td>
			<td>年龄</td>
			<td>班级</td>
			<td>操作</td>
		</tr>
		<?php
			//1.连接数据库
			try{
				$pdo = new PDO("mysql:host=localhost;dbname=jikexueyuan;","root","");
			}catch(PDOException $e){
				die("数据库连接失败".$e->getMessage());
			}
			//2.执行SQL查询，并解析与遍历
			$sql = "select * from stu";
			foreach($pdo->query($sql) as $row){
				echo "<tr>";
				echo "<td>{$row['id']}</td>";
				echo "<td>{$row['name']}</td>";
				echo "<td>{$row['sex']</td>";
				echo "<td>{$row['age']}</td>";
				echo "<td>{$row['classid']}</td>";
				echo "<td>
						<a href="javascript:doDel({$row['id']})">删除</a>
						<a href="edit.php?id={$row['id']}">修改</a>

				      </td>";
				echo "</tr>";
			}
		?>
		</table>
	</center>
</body>
</html>













