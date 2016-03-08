laravel 学习笔记.php

0.0  workflow
composer create-project laravel/laravel laravle-workfolow
// laravel new laravel-workflow
cd laravel-workflow
php artisan serve

// php -S localhost:8888 -t public



1.0 $



2.0   findOrFail


3.0 Illuminate



4.0 @section


5.0 articlescontroller/index
<!-- 按照时间顺序显示 -->
$article = Article::latest()->get() 

6.0 articles/store
<!-- 创建create文章后 -->
public function store(Request $request)
{
// 接受post过来的数据
// 存入数据库
// 重定向

$input=$request->all();
$input['published_at']=Carbon::now();
Article::create($input);
return redirect('/articles');
}


7.0 登陆注册
class AuthController extends Controller
{
	<!-- 注册用户后的跳转页面 -->
	protected $redirectPath = '/articles';
}


<!-- 退出登录 -->
localhost:8000/auth/logout



















