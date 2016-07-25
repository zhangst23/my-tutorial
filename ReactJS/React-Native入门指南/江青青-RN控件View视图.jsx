江青青-RN控件View视图.jsx


//
'use strict';
var React = require('react-native');
var {
	AppRegistry,
	View,
	StyleSheet,
} = React;

var TestText = React.createClass({
	render: function(){
		return (
			<View style={styles.first_view}>
				<View style={styles.second_view}>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	first_view:{
		flexDirection: 'row',
		height:100,
		padding:20
	},
	second_view:{
		background: 'red',
		flex:1
	},
});

AppRegistry.registerComponent('TestText', () => TestText);















