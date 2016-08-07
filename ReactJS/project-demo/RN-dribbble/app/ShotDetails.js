"use strict";

var React = require("react-native");
var {
	Image,
	Pixelratio,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	ActivityIndicatorIOS,
	View,
	ListView,
	Component,
	Dimensions,
	Modal
} = React;

var api = require("./helpers/api");

var Icon = require("react-native-vector-icons/FontAwesome"),
	getImage = require("./helpers/getImage"),
	HTML = require("react-native-htmlview"),
	screen = Dimensions.get('window'),
	ParallaxView = require("react-native-parallax-view");

var Player = require("./Player");
var CommentItem = require("./CommentItem");
var Loading = require("./Loading");

var ShotDetails = React.createClass({
	getInitialState: function(){
		return {
			isModalOpen: false,
			isLoading: true,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	openModal: function(){
		this.setState({
			isModalOpen: true
		});
	},

	closeModal: function(){
		this.setState({
			isModalOpen: false
		});
	},

	componentDitMount: function(){
		api.getResources(this.props.shot.comments_url).then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData),
				isLoading: false
			});
		}).done();
	},

	render: function(){
		var player = this.props.shot.user;

		return (
			
		)
	}
})


















