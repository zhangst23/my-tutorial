<?php

/*
通过正则表达式去分析伪静态URL地址

http://state.com/newsList.php?type=2&category_id=1

http://state.com/newsList.php/2/1.html

2=>type=2    1=>category_id=1

*/

if(preg_match('/^\/(\d+)\/(\d+).html/'$_SERVER['PATH_INFO'],$arr);

	$type = $arr[1];
	$category_id = $arr[2];
	
)else{
	//TODO
}

print_r($arr);











