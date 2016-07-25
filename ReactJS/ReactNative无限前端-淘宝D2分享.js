ReactNative无限前端-淘宝D2分享.js

//1.0 从关注分支到关注状态
if (dislog.isShow()) {  //分支1
	dialog.hide()
}

if (dialog.isHide()) {  //分支2
	dialog.show()
}

<Dialog show={this.state.show}/>   //状态1   /

//从关注过程到关注数据

append child 1
append child 2
append child 3
append child 4

remove child 4
remove child 3
move child 2
move child 1

->
getInitialState(){
	return{
		list:[1,2,3,4,5]
	}
}
render(){
	var list = this.state.list;
	return (
		<ul>
			{list.map(function(li,index){
				return <li key={index}>{li}</li>
			})}
		</ul>
	)
}


var newData = { list: [5,1,6,7,2] }
this.setState( newData )


//统一的组件引入方式---组件引用者无需关心当前运行平台
var React = require('PortalReact');
var StyleSheet = require('PortalStyleSheet');
var Image = require('PortalImage');


//Part2 统一的组件描述方式  ---一致的组件划分和API
var Item = React.createClass({
	render(){
		return (
			<View>
				<Image
					resizeMode = 'contain'
					source = {{uri : picUrl}}>
					<Text>99.0</Text>
				</Image>
			</View> /
		);
	}
});

module.exports = Item;

//Part3 统一样式描述方式
//Web
<div class="base active">Hello D2</div>
<div style={divStyle}>Hello D2</div> /

//React Native && React Web
<Text style={[
	styles.base,
	this.state.active & styles.active
	]}>Hello D2!</Text> /

支持数组形式的样式引用

//Part3 统一样式描述方式---抛弃传统CSS写法
var styles = StyleSheet.create({
	item:{
		width: '2.3rem',
		height: '2.3rem'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
}); 

REM
Auto Prefix

//Part4 统一数据获取方式
var url = ‘XXX?query={
	weather{
		temp
		type
	}
	items{
		pic
		price
		title
		url
	}
}’;

fetch(url).then(...)

//Part5 平台差异
// 文件名后缀
Image.ios.js
Image.web.js
// 平台检测
if (Platform.OS == 'ios') {
	//...
} else if (Platform.OS == 'web') {
	//...
}












