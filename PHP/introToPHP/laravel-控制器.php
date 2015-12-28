简介

<!-- 除了在单一的 routes.php 文件中定义所有的请求处理逻辑之外，你可能希望使用控制器类来组织此行为。控制器可将相关的 HTTP 请求处理逻辑组成一个类。控制器通常存放在 app/Http/Controllers 此目录中 -->

基础控制器

<!-- 这里是一个基础控制器类的例子： -->
<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class UserController extends Controller{
	public function showProfile($id){
		return view('user.profile',['user' => User::findOrFail($id)]);
	}
}

?>

<!-- 我们可以通过如下方式引导路由至对应的控制器动作 -->
Route::get('user/{id}','UserController@showProfile');


<!-- 控制器和命名空间 -->
Route::get('foo','Photo\AdminController@method');

<!-- 命名控制器路由 -->
Route::get('foo',['uses' => 'FooController@method','as' => 'name']);

<!-- 指向控制器行为的 URL -->
<!-- 要产生一个指向控制器行为的 URL，可使用 action 辅助方法。 -->
$url = action('App\Http\Controllers\FooController@method');
<!-- 若你想仅使用相对于控制器命名空间的类名称中的一部分，来产生指向控制器行为的 URL，可用 URL 产生器注册控制器的根命名空间。 -->
URL::setRootControllerNamespace('App\Http\Controllers');

$url = action('FooController@method');

<!-- 你可以使用 currentRouteAction 方法来获取正在执行的控制器行为名称： -->

$action = Route::currentRouteAction();



控制器中间件

<!-- 中间件 可在控制器路由中指定，例如 -->
Route::get('profile',[
	'middleware' => 'auth',
	'uses' => 'UserController@showProfile'
]);

<!-- 此外，你也可以在控制器构造器中指定中间件 ： -->
class UserController extends Controller{
	/**
     * 建立一个新的 UserController 实例。
     */

     public function __construct()
     {
     	$this -> middleware('auth');
     	$this -> middleware('log',['only' => ['fooAction','barAction']]);
		$this -> middleware('subscribed',['except' => ['fooAction','barAction']]);

     }
}

















