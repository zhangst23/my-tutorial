Rails 布局和视图渲染.rb

1 概览：各组件之间的协作
本文关注 MVC 架构中控制器和视图之间的交互。你可能已经知道，控制器的作用是处理请求，但经常会把繁重的操作交给模型完成。返回响应时，控制器会把一些操作交给视图完成。本文要说明的就是控制器交给视图的操作是怎么完成的。

总的来说，这个过程涉及到响应中要发送什么内容，以及调用哪个方法创建响应。如果响应是个完整的视图，Rails 还要做些额外工作，把视图套入布局，有时还要渲染局部视图。后文会详细介绍整个过程。

2 创建响应
从控制器的角度来看，创建 HTTP 响应有三种方法：

调用 render 方法，向浏览器发送一个完整的响应；
调用 redirect_to 方法，向浏览器发送一个 HTTP 重定向状态码；
调用 head 方法，向浏览器发送只含报头的响应；






3 布局结构
Rails 渲染响应的视图时，会把视图和当前模板结合起来。查找当前模板的方法前文已经介绍过。在布局中可以使用三种工具把各部分合在一起组成完整的响应：

静态资源标签
yield 和 content_for
局部视图
3.1 静态资源标签帮助方法
静态资源帮助方法用来生成链接到 Feed、JavaScript、样式表、图片、视频和音频的 HTML 代码。Rails 提供了六个静态资源标签帮助方法：

auto_discovery_link_tag
javascript_include_tag
stylesheet_link_tag
image_tag
video_tag
audio_tag
这六个帮助方法可以在布局或视图中使用，不过 auto_discovery_link_tag、javascript_include_tag 和 stylesheet_link_tag 最常出现在布局的 <head> 中。