江青青-RN控件Text视图.jsx

'use strict';
var React = require('react-native');
var {
	AppRegistry,
	Text,
	StyleSheet,
} = React;

var styles = StyleSheet.create({
	titleBase:{
		margin:10,
		textAlign:'center',
		color:'red',
		fontSize:28,
		fontFamily:'Cochin',
	},
	title:{
		color:'green',
		fontWeight:'bold',
	},
});
var TestText = React.createClass({
	render: function(){
		return (
			<Text style={styles.titleBase}>
				I am root text!
				<Text style={styles.title}>I am chid text!</Text>
			</Text>
		);
	}
});
AppRegistry.registerComponent('TestText', () => TestText);





















