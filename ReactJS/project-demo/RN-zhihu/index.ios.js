'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	view,
	Navigator,
	NavigatorIOS,
} = React;

var TimeMixin = require('react-timer-minxin');
var MainScreen = require('./MainScreen');
var StoryScreen = require('./StoryScreen');

var _navigator;

var RCTZhiHuDaily = React.createClass({
	mixins: [TimerMinxin],

	getInitialState: function(){
		return {
			splashed: false,
		};
	},

	componentDidMount: function(){
		this.setTimeout(
			() => {
				this.setState({splashed: true});
			},
			2000,
		);
	},

	RouteMapper: function(route, navigationOperations, onComponentRef){
		_navigator = navigationOperations;

		if (route.name === 'home') {
			return (
				<View style={styles.container}>
					<MainScreen navigator={navigationOperations}/>
				</View>
			);
		} else if (route.name === 'story') {
			return (
				<View style={styles.container}>
					<StoryScreen
						style={{flex: 1}}
						navigator={navigationOperations}
						story={route.story}
					/>
				</View>
			);
		}
	},

	render: function(){
		if (this.state.splashed) {
			var initialRoute = {name: 'home'};
			return (
				<Navigator
					style={styles.container}
					initialRoute={initialRoute}
					configureScene={() => Navigator.SceneConfigs.FadeAndroid}
					renderScene={this.RouteMapper}
				/>
			);
		} else {
			return (
				<SplashScreen />
			);
		}
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

AppRegistry.registerComponent('RCTZhiHuDaily', () => RCTZhiHuDaily);

















