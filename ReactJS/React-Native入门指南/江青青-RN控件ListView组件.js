江青青-RN控件ListView组件.js

'use strict';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	ListView,
} from 'react-native';
var ListViewDemo = React.createClass({
	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			return {
				dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6']),
			};
	},
	render: function(){
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(rowData) => <Text>{rowData}</Text>}
			 />
		);
	}
});
AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);















