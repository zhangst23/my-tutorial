阮一峰react-router教程.js


## (一)基本用法

npm install -S react-router

使用时，路由器 Router 就是 React 的一个组件.
Router 组件本身只是一个容器，真正的路由要通过 Route 组件定义。

import { Router, Route, hashHistory } from 'react-router';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
	</Router>
), document.getElementById('app'));


Route 组件定义了URL路径与组件的对应关系。可以同时用多个 Route 组件。
、、、
<Router history={hasHistory}>
	<Route path="/" component={App}/>
	<Route path="/repos" component={Repos}/>
	<Route path="/about" component={About}/>
</Router>
、、、

## (二)嵌套路由

Route 组件可以嵌套
、、、
<Router history={hashHistory}>
	<Route path="/" component={App}>
		<Route path="/repos" component={Repos}/>
		<Route path="/about" component={About}/>
	</Route>
</Router>
、、、
上面代码中，用户访问/repos时，会先加载 APP 组件，然后在它的内部再加载 Repos 组件。
、、、
<APP>
	<Repos/>
</APP>

App组件要写成下面的样子。

export default React.createClass({
	render(){
		return <div>
			{this.props.children}
		</div>
	}
})
、、、
APP 组件的 this.props.children 属性就是子组件。
子路由也可以不写在 Router 组件里面，单独传入 Router 组件的 routes 属性。
、、、
let routes = <Route path="/" component={App}>
	<Route path="/repos" component={Repos}/>
	<Route path="/about" component={About}/>
</Route>;
、、、
<Router routes={routes} history={browserHistory}/>


## 三、path属性

Route 组件的 path 属性指定路由的匹配规则。这个属性是可以省略的。

<Route path="inbox" component={Inbox}>
	<Route path="messages/:id" component={Message}/>
</Route>

上面代码中，当用户访问 /inbox/messages/:id 时，会加载下面的组件。

<Inbox>
	<Message/>
</Inbox>


## 四、通配符



## 五、IndexRoute 组件


## 六、Redirect 组件

## 七、IndexRedirect 组件


## 八、Link


## 九、IndexLink


## 十、history属性

Router 组件的 history 属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。



## 十一、表单处理


## 十二、路由的钩子




















