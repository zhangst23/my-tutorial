

1.0

npm install -g webpack
npm install -g vue-cli

vue init webpack my-project
cd my-project
npm install
npm run dev



2.0 MVVM 数据绑定
2.1
<!-- 指令 -->
<span v-text="msg"></span>
<!-- 插值 -->
<span>{{msg}}</span>
<!-- 双向绑定 -->
<input v-model="msg">

2.2
<!-- 模板 -->
<div id="app">
	{{msg}}
</div>

<script>
// 原生对象即数据
var data = {
	msg: 'hello!'
}

// 创建一个 ViewModel 实例
var vm = new Vue({
	// 选择目标元素
	el: '#app',
	// 提供初始数据
	data: data
})

</script>

<!-- 渲染结果 -->
<div id="app">
	hello!
</div>


3.0 组件系统

<!-- 注册一个 Vue.js 组件十分简单: -->
<script>
Vue.component('my-component', {
	// 模板
	template: '<div>{{msg}} {{privateMsg}}</div>',
	// 接收参数
	props: {
		msg: String <br/>
	},
	// 私有数据，需要在函数中返回以避免多个实例共享一个对象
	data: function () {
		return {
			privateMsg: 'component!'
		}
	}
})
</script>

<!-- 注册之后即可在父组件模板中以自定义元素的形式调用一个子组件：  -->
<my-component msg="hello"></my-component>

<!-- 渲染结果： -->
<div>hello component!</div>

<!-- 
Vue.js的组件可以理解为预先定义好了行为的ViewModel类。一个组件可以预定义很多选项，但最核心的是以下几个：

模板（template）：模板声明了数据和最终展现给用户的DOM之间的映射关系。

初始数据（data）：一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。

接受的外部参数(props)：组件之间通过参数来进行数据的传递和共享。参数默认是单向绑定（由上至下），但也可以显式地声明为双向绑定。

方法（methods）：对数据的改动操作一般都在组件的方法内进行。可以通过v-on指令将用户输入事件和组件方法进行绑定。

生命周期钩子函数（lifecycle hooks）：一个组件会触发多个生命周期钩子函数，比如created，attached，destroyed等等。在这些钩子函数中，我们可以封装一些自定义的逻辑。和传统的MVC相比，可以理解为 Controller的逻辑被分散到了这些钩子函数中。

私有资源（assets）：Vue.js当中将用户自定义的指令、过滤器、组件等统称为资源。由于全局注册资源容易导致命名冲突，一个组件可以声明自己的私有资源。私有资源只有该组件和它的子组件可以调用。

除此之外，同一颗组件树之内的组件之间还可以通过内建的事件API来进行通信。Vue.js提供了完善的定义、复用和嵌套组件的API，让开发者可以像搭积木一样用组件拼出整个应用的界面。这个思路的可行性在Facebook开源的React当中也得到了印证。
 -->



4.0
<!-- 基于构建工具的单文件组件格式

Vue.js的核心库只提供基本的API，本身在如何组织应用的文件结构上并不做太多约束。但在构建大型应用时，推荐使用Webpack+vue-loader这个组合以使针对组件的开发更高效。

Webpack是由Tobias Koppers开发的一个开源前端模块构建工具。它的基本功能是将以模块格式书写的多个JavaScript文件打包成一个文件，同时支持CommonJS和AMD格式。但让它与众不同的是，它提供了强大的loader API来定义对不同文件格式的预处理逻辑，从而让我们可以将CSS、模板，甚至是自定义的文件格式当做JavaScript模块来使用。Webpack 基于loader还可以实现大量高级功能，比如自动分块打包并按需加载、对图片资源引用的自动定位、根据图片大小决定是否用base64内联、开发时的模块热替换等等，可以说是目前前端构建领域最有竞争力的解决方案之一。

我在Webpack的loader API基础上开发了vue-loader插件，从而让我们可以用这样的单文件格式 (*.vue) 来书写Vue组件： -->

<style>
.my-component h2 {
  color: red;
}
</style>

<template>
  <div class="my-component">
    <h2>Hello from {{msg}}</h2>
    <other-component></other-component>
  </div>
</template>

<script>
// 遵循 CommonJS 模块格式
var otherComponent = require('./other-component')

// 导出组件定义
module.exports = {
  data: function () {
    return {
      msg: 'vue-loader'
    }
  },
  components: {
    'other-component': otherComponent
  }
}
</script>
<!-- 同时，还可以在*.vue文件中使用其他预处理器，只需要安装对应的Webpack loader即可：  -->
<style lang="stylus">
.my-component h2
  color red
</style>

<template lang="jade">
div.my-component
  h2 Hello from {{msg}}
</template>

<script lang="babel">
// 利用 Babel 编译 ES2015
export default {
  data () {
    return {
      msg: 'Hello from Babel!'
    }
  }
}
</script>
<!-- 
这样的组件格式，把一个组件的模板、样式、逻辑三要素整合在同一个文件中，即方便开发，也方便复用和维护。另外，Vue.js本身支持对组件的异步加载，配合Webpack的分块打包功能，可以极其轻松地实现组件的异步按需加载。
 -->





























 



