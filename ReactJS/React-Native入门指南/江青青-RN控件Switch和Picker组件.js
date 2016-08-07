江青青-RN控件Switch和Picker组件.js

//
'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	Switch,
} from 'react-native';
var SwitchDemo = React.createClass({
	getInitialState(){
		return {
			trueSwitchIsOn: true,
			falseSwitchIsOn: false,
		};
	},
	render(){
		return (
			<View>
				<Text>Switch实例</Text>
				<Switch 
					onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
					style={{marginBottom:10, marginTop:10}}
					value={this.state.trueSwitchIsOn /}
				/>
				<Switch 
					onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
					value={this.state.trueSwitchIsOn} />
			</View>
		);
	}
});
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
AppRegistry.registerComponent('SwitchDemo', () => SwitchDemo);
	

//
<Picker
	selectedValue={this.state.language}
	onValueChange={(lang) => this.setState({language: lang})}>
	<Picker.Item label="Java" value="java" />
	<Picker.Item label="JavaScript" value="js" />
</Picker>

































