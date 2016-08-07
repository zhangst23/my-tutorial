var React = require('react-native');

var {
	View,
	TabBarIOS,
	StyleSheet,
	Platform
} = React;

var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./customTabBar.android.js');


var Icon = require('react-native-vector-icons/FontAwesome');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			structure: this.props.structure,
			selectedTabs: this.props.selectedTabs,
			iconSize: this.props.iconSize ? this.props.iconSize : 30,
			activeTintColor: this.props.activeTintColor ? this.props.activeTintColor : null
		};
	},
	render: function(){
		if (Platform.OS == 'android') {
			reutrn(
				<ScrollableTabView renderTabBar={() => <CustomTabBar />}
								   onChangeTab={(0)=>{}}
								   tabBarPosition={'bottom'}
								   initialPage={this.state.selectedTab}>
					{this.state.structure.map((tabProps, tabIndex) => 
						<View style={{flex:1}}
							  tabLabel={tabProps.title+'!$#'
										+tabProps.iconName+'!$#'
										+this.state.iconSize}
							  key={tabIndex}>
							{tabProps.renderContent()}
						</View>
					)}
					
				</ScrollableTabView>
			);
		}
		return(
			<TabBarIOS>
				{this.state.structure.map((tabProps. tabIndex) =>
					<Icon.TabBarItem title={tabProps.title}
									 iconName={tabProps.iconName}
									 iconSize={this.state.iconSize}
									 selected={tabIndex == this.state.selectedTab}
									 onPress={() => {this.setState({selectedTab: tabIndex});}}> 
						{tabProps.renderContent}
					</Icon.TabBarItem>
				)}
			</TabBarIOS>
		)
	}
})

var styles = StyleSheet.create({

});













