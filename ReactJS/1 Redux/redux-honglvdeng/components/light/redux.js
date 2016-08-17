import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LightActions from '../../actions/light/'
import lightStore from '../../stores/light/'
import Light from './index'


// 声明store
let store = lightStore();

class App extends Component{
	_bind(...methods){
		methods.forEach((method)=>this[method] = this[method].bind(this));
	}
	constructor(){
		super();
		this._bind('autoChange','handleClick');
		this.state = {
			count : 0,
			timeId : null
		}
	}

	changeColor(light,actions){ // 红路灯变换规则
		switch(light.color){
			case 'red':
				actions.changeGreen();
				break;
			case 'green':
				actions.changeYello();
				break;
			case 'yellow':
				actions.changeRed();
				break;
			default:
				actions.changeRed();
		}

	}
 
	autoChange(){ // 自动更改红绿灯
		const { light, actions } = this.props;
		let _self = this;

		let curCount = ++this.state.count;

		// console.log('xx,',curCount);
		if (this.state.count > +light.time) {
			curCount = 0;
			this.changeColor(light,action);
		}

		//自动更改
		this.state.timeId = setTimeout(function(){
			// 递归调用，实现 setInterval 方法
			_self.setState({count:curCount});
			_self.autoChange();
		},1000);
	}
	handleClick(e){ // 用点击模拟红绿灯

		if (this.state.tiemId) {
			clearTimeout(this.state.timeId);
			this.state.timeId = null;
		} else {
			this.autoChange();
		}
	}
	render(){
		// 通过connect 注入 redux 的 dispatch 方法
		const { light, actions } = this.props;
		return (
			<div id="traffic" onClick={this.handleClick.bind(this)}>
				<Light light={light}/>
			</div>
		)
	}
}

// 声明 connect 连接
// 将 redux 中的  state 传给 App
function mapStateToProps(state){
	return{
		light:state
	}
}

function mapDispatchToProps(dispatch){
	return{
		actions : bindActionCreators(LightActions,dispatch)
	}
}


// 声明 connect 连接
App = connect(mapStateToProps,mapDispatchToProps)(App);

// 真正的连接
render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('demo')
)












