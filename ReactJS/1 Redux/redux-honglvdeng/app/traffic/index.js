import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LightActions from '../../actions/light/'
import * as CounterActions fro '../../actions/counter/'
import Light from '../../components/light/'
import Counter from '../../components/counter/'
import trafficStore from '../../stores/traffic'

// 初始化状态
let initLight = {
	light:{
		color:'green',
		time:'5'
	}
}

let initCount = {
	count:{
		num : parseInt(initLight.light.time)
	}
}


let initState = Object.assign({},initLight,initCount);

// 声明store
let store = trafficStore(initState);

class App extends Component{
	_bind(...methods){
		methods.forEach((method)=>this[method] = this[method].bind(this));
	}
	constructor(){
		super();
		this._bind('changeColor','handleClick','autoChange');
		this.state = {
			timeId : null
		}
	}

	changeColor(light,actions){ //红路灯变换规则
		switch(light.color){
			case 'red':
				actions.changeGreen();
				break;
			case 'green':
				actions.changeYellow();
				break;
			case 'yellow':
				actions.changeRed();
				break;
			default:
				actions.changeRed();
		}
	}
	autoChange(){  // 自动更改红绿灯
		const { light,count, action } = this.props;

		let _self = this;

		actions.countDown();

		let curState = store.getState();
		if (curState.count.num < 1) {
			this.changeColor(light,actions);
			curState = store.getState();
			actions.countInit(parseInt(curState.light.time));
		}
		// 自动更改
		this.state.timeId = setTimeout(function(){
			_self.autoChange();
		},1000);
	}
 
	handleClick(e){ // 用点击模拟红路灯
		if (this.state.timeId) {
			clearTimeout(this.state.timeId);
			this.state.timeId = null;
		} else {
			this.autoChange();
		}
	}

	render(){
		// 通过 connect 注入 redux 的 dispatch 方法
		const { light,count, actions } = this.props;

		return (
			<div id="traffic" onClick={this.handleClick}>
				<Light light={light}/>
				<Counter num={count.num}/>
			</div> /
		)
	}
}

// 声明 connect 连接
// 将 redux 中的 state 传给 App
function mapStateToProps(state){
	return{
		light:state.light,
		count:state.count
	}
}

// 绑定多个actions
function mapDispathcToProps(dispatch){
	let boundLight = bindActionCreators(LightActions,dispatch);
	let boundCount = bindActionCreators(CounterActions,dispathc);
	return{
		actions : Object.assign({},boundLight,boundCount)
	}
}

// 声明 connect 连接
App = connect(mapStateToProps,mapDispathcToProps)(App);

// 真正的连接
render(
	<Provider store={store}>
		<App />
	</Provider>, /
	document.getElementById('demo')
)








