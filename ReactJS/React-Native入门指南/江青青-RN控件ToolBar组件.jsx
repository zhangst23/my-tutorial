江青青-RN控件ToolBar组件.jsx



//官方例子
render: function(){
	return (
		<ToolbarAndroid 
			logo={require('./app_logo.png')}
			title="AwesomeApp"
			actions={[{title: 'Settings', icon: require('./icon_settings.png'), show:'always'}]}

		 	onActionSelected={this.onActionSelected} />
	)
},

onActionSelected: function(position){
	if(position === 0){
		showSettings();
	}
}


//ToolbarAndroid实例讲解
'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
class ToolBarAndroidDemo extends Component {
	render(){
		return (
			<ToolbarAndroid
				actions={toolbarActions}
				navIcon={require('./ic_menu_black_24dp.png')}
				style={styles.toolbar}
				subtitle="副标题"
				title="主标题"></ToolbarAndroid>
		);
	}
}

var toolbarActions = [
	{title: 'Create', icon: require('./ic_create_black_48dp.png'), show: 'always'},
	{title: 'Filter'},
	{title: 'Settings', icon: require('./ic_settings_black_48dp.png'), show: 'always'},
];
const styles = StyleSheet.create({
	toolbar: {
		backgroundColor: '#e9eaed',
		height: 56,
	},
});
AppRegistry.registerComponent('ToolBarAndroidDemo', () => ToolBarAndroidDemo);















































