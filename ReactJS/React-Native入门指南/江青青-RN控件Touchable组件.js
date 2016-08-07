江青青-RN控件Touchable组件.js
'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
} from 'react-native';

class TouchableHighlightDemo extends Component {
	render(){
		return (
			<View>
				<Text>
					TouchableHighlight 实例
				</Text>
				<TouchableHighlight 
					undelayColor="rgb(210, 230, 255)"
					activeOpacity={0.5}
					style={{ borderRadius: 8, padding:6, marginTop:5 }}>
					<Text style={{fontSize:16}}>惦记我</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
AppRegistry.registerComponent('TouchableHighlightDemo', () => TouchableHighlightDemo);
















