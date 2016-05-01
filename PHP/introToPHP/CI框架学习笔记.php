CI框架学习笔记.php


1.  安装和启动
<!-- Enable Mod Rewrite Option in your APACHE Server -->
<!-- Goto apache's "httpd.conf" -->
<!-- LoadModule rewrite_module modules/mod_rewrite.so -->
Create '.htaccess' File
<!-- Modify CodeIgniter Config Settings :  config.php -->
$config['index_page'] = ''; 


2. AR 查询
<?php
	public function index()
	{


		// get
		// $res=$this->db->get('user');
		// // var_dump($list);
		// foreach($res->result() as $item){
		// 	echo $item->name;
		// 	echo '<br>';
		// }
		// //$this->load->view('welcome_message');
	

		// //insert
		// $data=array(
		// 	'name'=>'mary',
		// 	'password'=>md5('mary'),
		// );
		// $this->db->insert('user',$data);

		// // $bool=$this->db->insert('user',$data);
		// // var_dump($bool);


		// 更新操作
		$data=array(
			'email'=>'mary@gmail.com',
			'password'=>md5('12345'),
		);
		$this->db->update('user',$data,array('id'=>3));


		//删除操作
		$this->db->delete('user',array('id'=>2));


		//链式查询
		//select id,name from tableName where id>=3 order by id desc limit 3,2 
		$res=$this->db->select('id,name')
			->from('user')
			->where('id >=',3)
			->limit(3,2)  // 跳过2条，取出3条数据
			->order_by('id desc ')
			->get();

		var_dump($res->result());
		$this->db->last_query();

		//显示最近一天sql语句
		echo $this->db->last_query();


		//where 查询情况
		// $res->$this->db->where('name','mary')->get('user');
		// $res->$this->db->where('name !=','mary')->get('user');
		// $res->$this->db->where(array('name'=>'mary'))->get('user');
		// res->$this->db->where(array('name'=>'mary', 'id >'=>2))->get('user');
		echo $this->db->last_query();


		// 复杂的查询 ， 请用 $this->db->query($sql,$data);  //使用问号绑定参数
		// 非常简单的可用AR查询，一些复杂的还是原生的查询语句好一点，

	}








?>




3.  扩展CI的控制器

<!-- 创建自己的控制器 -->
<?php

class MY_Controller extends CI_Controller{

	public function __construct(){
		parent::__construct();  //调用父类的构造方法

		//登录验证...
		//权限验证...
	}
}

?>



2. CI中控制器
~ 控制器类名不需要加后缀
~ 控制器文件名建议小写
~ 控制器要直接或间接继承自CI_Controller类
~ 可访问的action方法名不能以下划线开头，且访问权限要是public的


<?php
class User extends CI_Controller{

	public function index(){
		echo 'user---index';
	}

	//不能被浏览器请求
	protected function test(){
		echo 'test';
	}

	// 以下划线开头的方法，不能被请求
	public function _test1(){
		echo 'test1';
	}

	//
	public function test2(){
		$this->_test1();
	}
}
?>


<?php

class Index extends CI_Controller{
	// 与类名相同的，会被php当做构造方法
	// 相当于 __construct(){}
	public function index(){
		echo 'index 控制器的 index 方法<br>';
	}
}
?>



4.  模型
文件名小写，
首字母大写
有 _model 后缀,因为控制器没有后缀。


<!-- user_model.php -->
<?php

class User_model extends CI_Model{

	/**
	 *  用户模型
	 *  @author Zhangxiaodong <2243984091@qq.com>
	 */

	// 返回所有用户
	// 模型里的方法是根据控制器的需要制定的，没有定论，
	// 里面的方法是根据具体需求定制的
	public function getAll(){
		$res=$this->db->get('user');
		return $res->result();
	}
}
?>


<!-- controllers/User.php -->
<?php
class User extends MY_Controller{

	public function index(){
		// // 加载模型 ，加载后将自动成为超级对象的属性(可以到处访问)
		// $this->load->model('User_model');
		// // 调用模型获取数据
		// $list=$this->User_model->getAll();

		// 别名(加载模型 并 调用模型获取数据 的 另一种方式)
		$this->load->model('User_model', 'user');
		$list=$this->user->getAll();

		// 加载视图
		$this->load->view('user/index', array(
			'list'=>$list
		));
	}

	// 添加用户
	public function add(){
		$this->load->helper('url');
		$this->load->view('user/add');
	}


	public function insert(){
		var_dump($this->input->post('name'));
	}


	// 分页
	public function test(){
		//装载类文件
		$this->load->library('pagination');
		$this->load->helper('url');
		//每页显示10条数据
		$page_size=10;

		$config['base_url'] = site_url('user/test');
		// 一共有多少条数据
		$config['total_rows'] = 100;
		//每页显示条数
		$config['per_page'] = $page_size;
		$config['first_link'] = '首页';
		$config['next_link'] = '下一页';
		$config['uri_segment'] =3;  //分页的数据查询偏移量在哪一段上

		$this->pagination->initialize($config);

		$offset=intval($this->uri->segment(3));
		$sql="select * from blog_user limit $offset, $page_size";

		$data['links']=$this->pagination->create_links();
	}


	// 文件上传
	public function file(){
		$this->load->helper('url');
		$this->load->view('user/file');
	}

	public function upload(){
		// 上传目录需要手工创建
		$config['upload_path']='./upload/';
		//允许
		$config['allowed_types']='gif|png|jpg|jpeg';
		$config['max_size'] = '10000';
		//生成新文件名
		$config['file_name']=uniqid();
		//装载文件上传类
		$config->load->library('upload', $config);
		$this->upload->do_upload('pic');

		var_dump($this->upload->data());

		//获取上传之后的数据
		$data=$this->upload->data();
		echo $data['file_name'];
	}

}
?>

<!-- views/user/index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
		var_dump($list);
	?>
</body>
</html>








在模型中，可以直接使用超级对象属性(控制器对象)



5.  CI的超级对象

CI中的超级对象即为当前的控制器对象。在视图中也可以直接使用$this访问超级对象。
超级对象提供了很多属性：

5.1  $this->load ，装载器，主要提供了如下方法：
		view: 装载视图
		vars: 分配变量到视图
		database: 装载数据库操作对象
		model: 装载模型
		helper: 加载帮助文件

5.2 $this->uri  解析URL相关内容，主要提供如下方法：
　　segment：按索引(控制器为1)获取分段url值（类pathinfo没有key的模式：入口.php/控制器/动作/参数1/参数2。。。）

5.3 $this->input，主要用于取post和server数据，使用方法如下：



6  CI中的url相关函数

$this->load()->helper('url');  //使用前要加载，可以配置自动加载，在 config/autoload.php/$autoload['helper'] = array();
6.1 site_url  控制器/方法
6.2 base_url  网站的根目录
<body>
	<form action="<?php echo site_url('user/insert');?>" method="post">
		name <input type="text" name="name">
		password <input type="password" name="password">
		<input type="submit" value="submit">
	</form>

	<img src="<?php echo base_url();?>uploads/jh.jpg" alt="" width="100"/>

</body>



7.  CI的路由

<?php
class Article extends CI_Controller{
	public function index(){
		echo 'article index...';
	}

	public function show($id){
		echo '这是文章'.$id;
	}

?>

<!-- routes.php -->
通过路由来定义URL
$route['news/[\d][6]/([\d]+)\.html']='article/show/$1';


隐藏入口文件
	开启apache的rewrite模块，在htpd.conf中开启；
	重启apache
	在网站根目录添加.htaccess文件。



8.  分页

控制器代码如上 第 4 条。

<body>
	<?=$links ?>
</body>



9.  文件上传
手动创建好上传目录

控制器代码如上 第 4 条。

<body>
	<form action="<?php echo site_url('user/upload');?>" method="post" enctype="multipart/form-data">
		<input type="file" name="pic">
		<input type="submit" value="上传">
	</form>
</body>




10. 视图

10.1
分配变量时，可以在载入视图时分配(第二个参数,关联数组或单个变量)，也可以使用:
        $this->load->vars(name, value);

10.2
<?php foreach($list as $item):?>
	<?=$item['name']?>
    <?=$item['value']?>
<?php endforeach?>



11.  URI 类

$this->uri
	CI_URI   解析url相关信息
	CI_uri 类提供的方法：


<?php
public function index()
{
	//echo $_GET['id'];
	echo $this->uri->segment(3);
	//var_dump($this->uri);
}
?>
segment(n)   用于获取url中第 n 个参数




12   数据库操作

<?php

	public function add()
	{

	}
?>




13.   session 
<!-- controllers/User.php -->
<?php
class User extends MY_Controller{

	public function login(){
		$this->load->library('session');
		$user=array('id'=>3,'name'=>'jack');

		// session_start();
		// $_SESSION['user']=$user;
		$this->session->set_userdata('user', $user);

		//不要在这里获取刚放入的数据
		//只有在重新加载

	}

?>






14.  验证码

<?php

class  {
	public function test2(){
		$this->load->helper('url');
		$this->load->helper('captcha');
		$var = array(
			'img_path' => './captcha/',
			'img_url' => base_url(),
			'img_width' => '100',
			'img_height' => 30,
			'expiration' => 60*10
		);

		$cap = create_captcha($vals);
		$this->load->view( 'user/test2',array('cap'=>$cap['image']));

		session_start();
		$_SESSION['cap']=$cap['word'];
	}
}









