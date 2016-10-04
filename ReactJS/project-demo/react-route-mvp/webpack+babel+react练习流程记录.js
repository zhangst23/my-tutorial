webpack+babel+react练习流程记录.js


react简介
来构建用户界面的库，不是框架
关注于view层
虚拟DOM 单向数据流 JSX这些概念
如何使用react
下载文件
    react
    react-dom
    browser.min.js

也可以使用nodejs，需要用到的模块
    webpack
    babel
    react
    react-dom
    
JSX介绍
JSX是React编写组件的一种语法规范，可以看为是js的扩展，它支持将HTML和JS混写在一起，
最后使用babel编译为常规的js，方便浏览器解析
编写第一个例子
使用 ReactDOM.render()
编写组件
React.createClass()
给组件传递数据

props
props的值是不可变的
语法糖{...this.props}
组件间的嵌套

使用 props传递数据
可是数组存组件结构
map方法的使用
事件event处理

在元素上添加事件处理 
    onCLick    onMouseOver  onMouseOut
class => className
style的设置
改变组件的状态

state
setState后组件状态发生改变，DOM会重新渲染
组件间的通信

父子级可使用props传递函数的形式通信
不是父子级或多级嵌套通信 使用Pub/Sub模式通信
案例：
react实现的留言板，提交留言可显示在页面的留言列表中

知识点：
    react的基本知识点 
            React.createClass 创建组件函数
            ReactDOM.render   渲染组件
            props             获取传递的数据（不可变）
            state             组件状态（可变，立马渲染DOM）
            onClick           事件
            组件间的通信
            Pub/Sub模式        发布/订阅模式
            componentDidMount 组件渲染后触发的函数

webpack + babel + react 做到改变组件不刷新页面就可以显示结果
主要模块的用法，如：
    webpack  webpack-dev-server  css-loader style-loader html-webpack-plugin插件的使用
    babel babel-preset-es2015 babel-preset-react
    react react-dom react-hot-loader</font>
    
    
    webpack + babel + react 配置及使用
    
node安装及npm包管理器的使用
npm init 创建package.json文件
npm install <module-name> -g/--save-dev/--save 安装模块
npm update <module-name > 更新模块
npm uninstall <module-name > 卸载模块

webpack一款模块加载器兼打包工具
特点：

 查找依赖，打包成一个文件
 支持CommonJs和AMD模块
 把各种资源都看成模块，用对应的加载器处理
 丰富的和可扩展的插件
官网http://webpack.github.io/
安装

  npm install webpack -g
 安装后使用webpack命令
webpack.config.js文件配置项：

 entry：配置入口文件
 output：配置输出文件路径及文件名
 module：模块配置
      loaders：加载器配置
 devServer：配置服务
 plugins：配置插件     
loader加载器：

 css-loader、style-loader : 处理css文件和样式
 babel-loader：转换es6语法为es5语法
插件：

  html-webpack-plugin：生成html文件
使用webpack-dev-server服务

babel介绍及使用
使用babel作用：转换es6语法为es5语法
官网：http://babeljs.io/ 
安装：

 npm install  babel-cli -g
  安装后使用babel命令
Es6语法使用：
 let const申明变量
 箭头函数Arrow Functions
 class import from extends 
react介绍及使用
react用于构建用户界面的javascript库
安装：

npm install react react-dom --save
用bebel编译jsx语法，使用模块：

 npm install --save-dev babel-preset-react
使用react热加载模块，做到文件改动页面自动刷新

 安装：
      npm install --save-dev react-hot-loader
综合实例：todoList例子

    分析todolist整体实现思路
    利用MVC的思路整合代码

    主要功能：
            
            回车添加内容
            可以对内容进行toggle选中操作
            删除选项
            用LocalStorage对数据进行存储（刷新记录）
            
            
            
            
github地址：https://github.com/eve0803/webpack-babel-react-test