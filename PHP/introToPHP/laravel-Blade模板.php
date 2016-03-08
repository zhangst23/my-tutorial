laravel-Blade模板.php

1.0 模板继承
1.1 定义一个页面布局模板
使用 Blade 能获得的两个主要好处是 

模板继承（template inheritance） 和 
视图片断（sections）。

//
@section 指令正像其名字所暗示的一样是用来定义一个视图片断（section）的；
@yield 指令是用来展示某个指定 section 所代表的内容的。

<body>
	@section('sidebar')
		This is the master sidebar.
	@show

	<div class="container">
		@yield('content')
	</div>
</body>




1.2 扩展一个页面布局模板
@extends 指令来为子页面指定其所“继承”的页面布局模板





2.0 展示数据
Hello, {{ $name }}.

2.1 Blade & JavaScript 框架

由于很多 JavaScript 框架也使用 "花括号" 来表示一个需要在浏览器端解析的表达式，因此，你可以通过使用 @ 符号来告知 Blade 模板引擎保持后面的表达式原样输出。如下所示：

<h1>Laravel</h1>

Hello, @{{ name }}.

2.2 如果数据存在就将其输出

某些时候你需要输出变量的值，但是在输出前你并不知道这个变量是否被赋值了。我们将这个问题化作代码描述如下：

{{ isset($name) ? $name : 'Default' }}
不过，上面的表达式的确很繁复，幸好 Blade 提供了如下的速记方式：

{{ $name or 'Default' }}
在这个实例中，如果 $name 变量被赋了值，它的值将被输出出来。然而，如果没有被赋值，将输出默认的单词 Default 。


2.3 展示未转义的数据

默认情况下，Blade 的 {{ }} 表达式会自动通过 PHP 的 htmlentities 函数进行处理，以防止 XSS 攻击。如果你不希望自己的数据被转义，请使用如下语法：

Hello, {!! $name !!}.

2.4 If 表达式

通过 @if、@elseif、@else 和 @endif 指令可以创建 if 表达式。这些指令其实都有相对应的 PHP 表达式：

@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif
为了使用方面，Blade 还提供了 @unless 指令：

@unless (Auth::check())
    You are not signed in.
@endunless


2.5 循环

@for ($i = 0; $i < 10; $i++)
	The current value is {{ $i }}
@endfor

@foreach ($users as $user)
	<p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile


2.6 引入子视图

Blade 提供的 @include 指令允许你方便地在一个视图中引入另一个视图。所有父视图中可用的变量也都可以在被引入的子视图中使用。

<div>
	@include('shared.errors')

	<form action=""></form>
</div>

<!-- 虽然被引入的子视图能够访问父视图的所有可用数据，但是，你还可以向被引入的子视图传递额外的数据： -->
@include('view.name', ['some' => 'data'])


2.7 注释

Blade 还允许你在视图中添加注释。然而，和 HTML 注释不同的是，Blade 注释不会出现在最终生成的 HTML 中。

{{-- This comment will not be present in the rendered HTML --}}


3.0  新建路由

<!-- Rootes.php -->
Route::get('contact', 'PagesController@contact');
<!-- PagesController.php -->
public function contact(){
	return view('pages.contact');
}
<!-- 在 resources/views/pages 下创建 contact.blade.php ， 并添加内容 -->
@extends('mail')

@section('content')
	<h2>Contact me</h2>
@stop





























