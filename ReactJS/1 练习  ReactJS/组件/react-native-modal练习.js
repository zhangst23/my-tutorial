react-native-modal练习.js

npm install react-native-modal --save

//
'use' strict

var React = require('react-native');
var Modal = require('react-native-modal');
var { AppRegistry, StyleSheet, View, Text } = React;

class App extends React.Component {
	constructor(){
		this.state = {
			isModalOpen: false
		};
	}

	openModal(){
		this.setState({isModalOpen: true});
	}

	closeModal(){
		this.setState({isModalOpen: false});
	}

	render(){
		return (
			<View style={styles.page}>
				<Text onPress={() => this.openModal()}>
					Open Modal.
				</Text>
				<Modal isVisible={this.state.isModalOpen} onClose={() => this.closeModal()}>
					<Text>Hello world!</Text>
				</Modal>
			</View>
		);
	}
}


var styles = StylesSheet.create({
	page: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,

	}
});

AppRegistry.registryComponent('App', () => App);























