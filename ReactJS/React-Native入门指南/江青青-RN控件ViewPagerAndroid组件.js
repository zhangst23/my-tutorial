江青青-RN控件ViewPagerAndroid组件.js

'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	ViewPageAndroid,
} from 'react-native';

class ViewPagerDemo extends Component {
	render(){
	  return (
		<View>
			<Text style={style.welcome}>
				ViewPagerAndroid实例
			</Text>
			<ViewPageAndroid style={style.pageStyle} initialPage={0}>
				<View style={{backgroundColor:"red"}}>
					<Text>First Page</Text>
				</View>
				<View style={{backgroundColor:"yellow"}}>
					<Text>
						Second Page!
					</Text>
				</View>
			</ViewPageAndroid>
		</View>
	  );
	}
}

const styles = StyleSheet.create({
	pageStyle: {
		alignItems: 'center',
		padding: 20,
		height:200,
	}
});
AppRegistry.registerComponent('ViewPagerDemo', () => ViewPagerDemo);












