<html>
<head>
	<meta http-equiv="Content-type" content="text/html";charset=utf-8>
</head>
<body>

<?php
	// 1.传入页码
	$page = $_GET['p'];

	//2.根据页码提取出数据：php->mysql处理
	$host = "locahost";
	$username = "root";
	$password = "";
	$db = "test";
	$pageSize = 10;
	$showPage = 2;

	//连接数据库
	$conn = mysql_connect($host,$username,$password);
	if(!$conn){
		echo "数据库连接失败";
		exit;
	}
	//选择所要操作的数据库
	mysql_select_db($db);
	//设置数据库编码格式
	mysql_query("SET NAMES UTF8");
	//编写sql获取分页数据SELECT*FROM表名LIMIT起始位置，显示条数
	$sql = "SELECT * FROM page LIMIT".($page-1)*$pageSize.",10";
	//把sql语句传送数据中
	$result = mysql_query($sql);
	//处理我们的数据
	echo "<table border=1 cellspacing=0 width=40%>"
	echo "<tr>
		<td>id</td>
		<td>name</td>
		</tr>";
	while($row = mysql_fetch_assoc($result)){
		echo "<tr>";
		echo "<td>{$row['id']}</td>";
		echo "<td>{$row['name']}</td>";
		echo "</tr>"
	}
	echo "</table>"
	//释放结果，关闭链接
	mysql_free_result($result);
	mysql_close($conn);
	//获取数据总数
	$total_sql = "SELECT COUNT(*)FROM page";
	$total_result = mysql_fetch_array(mysql_query($total_sql));
	$total = $total_result[0];

	//计算页数
	$total_pages = ceil($total/$pageSize);
	mysql_close($conn);


	//3.显示数据+分页条	
	$page_banner = "";
	//计算偏移量
	$pageoffset = ($showPage - 1)/2;
	//初始化数据
	$start = 1;
	$end = $total_pages;
	if ($total_pages > $showPage) {
		if ($page > $pageoffset + 1) {
			$page_banner = "...";
		}
		if ($page > $pageoffset) {
			$start = $page - $pageoffset
			$end = $total_pages > $page+$pageoffset ? $page+$pageoffset : $total_pages;
		}else{
			$start = 1;
			$end = $total_pages > $showPage ? $showPage : $total_pages;
		}
		if ($page + $pageoffset > $total_pages) {
			$start = $start - ($page + $pageoffset - $end);
		}
	}


	for($i = $start;$i<=$end;$i++){
		$page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".$i."'>{$i}</a>";
	}

	//尾部省略
	if ($total_pages > $showPage && $total_pages > $page + $pageoffset) {
		$page_banner .= "...";
	}
	if($page > 1){
		$page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=1'>首页</a>";

		$page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($page-1)."'>上一页</a>";
	}
	if ($page < $total_pages){
		$page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($page+1)."'>下一页</a>";
		$page_banner .= "<a href='".$_SERVER['PHP_SELF']."?p=".($total_pages)."'>尾页</a>";
	}
	
	$page_banner .= "共{$total_pages}页,";
	echo $page_banner;










?>
	
</body>
</html>