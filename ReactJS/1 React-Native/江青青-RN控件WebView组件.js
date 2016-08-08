江青青-RN控件WebView组件.js


'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View, 
	WebView,
} from 'react-native';

var DEFAULT_URL = 'http://www.lcode.org';

var WebViewDemo = React.createClass({
	render: function(){
		return (
			<View style={{flex:1}}>
				<Text style={{height:40}}>简单的网页显示</Text>
				<WebView style={styles.webView_style}>
					url={DEFAULT_URL}
					startInloadingsState={true}
					domStorageEnabled={true}
					javascriptEnabled={ture}
				</WebView>
			</View>
		)
	}
})
var styles = StyleSheet.create({
	webView_style:{
		backgroundColor: '#00ff00',
	}
})
AppRegistry.registerComponent('WebViewDemo', () => WebViewDemo);













