<?php
	require_once('connect.php');
	$sql = "select * from article order by dateline desc";
	$query = mysql_query($sql);
	if ($query&&mysql_num_rows($query)) {
		while($row = mysql_fetch_assoc($query)){
			$data[] = $row;
		}
	}
	print_r($data);

?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>文章列表</title>
</head>
<body>
	<div id="page">
		<div class="content">
			<?php
				if (empty($data)) {
					echo "当前没有文章，请管理员在后台添加文章";
				}else{
					foreach($data as $value){

			?>
					<div class="post">
						<h1 class="title"><?php echo $value['title']?></h1>
						<div class="entry">
							<?php echo $value['description']?>
						</div>
						<div class="meta">
							<p class="links"><a href="article.show.php?<?php echo $value['id']?>" class="more">查看详细</a></p>
						</div>
					</div>

			<?php

					}
				}

			?>
		</div>


		<ul>
			<li class="search">
				<h2>Search</h2>
				<form action="article.search.php" method="get">
					<fieldset>
						<input type="text" id="s" name="key" value=""/>
						<input type="submit" id="x" value="Search"/>
					</fieldset>
				</form>
			</li>
		</ul>
	</div>
</body>
</html>

























