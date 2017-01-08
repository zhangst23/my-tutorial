

<!-- 页面跳转 -->


$New = M('New');
$result = $New->add($data);
if($result){
	$this->success('新增成功，即将返回列表页面','/New/index');
}else{
	$this->error('新增失败');
}


	
<!-- 重定向 
重定向到操作

redirect('重定向操作地址（一般为[控制器/操作]）','参数（字符串或者数组）','重定向等待时间（秒）','重定向提示信息')

-->


$New = M('New');
$result = $New->add($data);
if($result){
	//停留5秒后跳转到New模块的category操作，并且显示页面跳转中字样
	$this->redirect('New/category','cate_id=2&states=1',5,'页面跳转中...');
}else{
	$this->redirect('New/error');
}

<!-- 
重定向到URL

如果你仅仅是想重定向要一个指定的URL地址，而不是到控制器的操作方法，可以直接使用redirect函数重定向，例如：
 -->
$New = M('New'); //实例化New对象
$result = $New->add($data); 
if($result){
    //重定向到指定的URL地址
    redirect('/New/category/cate_id/2', 5, '页面跳转中...');
}





























