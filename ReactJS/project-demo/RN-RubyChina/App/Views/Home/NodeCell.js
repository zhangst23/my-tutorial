var React = require('react-native');

var {
	View,
	Text,
	ListView,
	TouchableHighlight,
	StyleSheet
} = React;

var Style = StyleSheet.create({
	sectionCell: {
		backgroundColor: '#eee',
		flex:1,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	nodes: {
		flex: 1,
		padding: 8,
		flexDirection: 'row',
	},
	sectionWrapper: {
		flex: 1,
		backgroundColor: '#eee',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	section: {
		fontSize: 14,
		color: '#666'
	},

	nodeWrapper: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
		margin: 5,
		width: 110,
		borderWidth: 1,
		borderColor: '#eee',
		marginBottom: 5,
	},
	node: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#666E74'
	}
});

var NodeCell = React.createClass({
	render: function(){
		var data = this.props.data;
		return (
			<TouchableHighlight
				onPress={
					() => this.props.onSelectNode(data)
				}
				underlayColor={'#eee'}>
				<View style={Style.nodeWrapper}>
					<Text>{data.name}</Text>
				</View>
			</TouchableHighlight>
		);
	},
});

module.exports = React.createClass({
	render: function(){
		var data = this.props.data;
		return (
			<View style={Style.sectionCell}>
				<View style={Style.sectionWrapper}>
					<Text style={Style.section}>
						{data.name}
					</Text>
				</View>
			</View>
		);
	},

	renderNodeCell: function(data){
		return (
			<NodeCell
				onSelectNode={this.props.onSelectNode}
				onSelectNode={
					(data) => this.props.onSelectNode(data)
				}

				data={data} />
		);
	},
});

















