"use strict";

var React = require("react-native");
var {
	ActivityIndicatorIOS,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	View,
} = React;

var api = require("./helpers/api");

var ShotCell = require("./ShotCell"),
	ShotDetails = require("./ShotDetails"),
	Loading = require("./Loading");


var resultsCache = {
	dataForQuery: [],
	nextPageNumberForQuery: [],
	totalForQuery: [],
};

var LOADING = {};

var ShotList = React.createClass({
	getDefaultProps: function(){
		return {
			filter: ""
		};
	},

	getInitialState: function(){
		return {
			isLoading: false,
			isLoadingTail: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			filter: this.props.filter,
			queryNumber: 0,
		};
	},

	componentWillMount: function(){
		this.getShots(this.state.filter);
	},

	getShots: function(query: string){
		var cachedResultsForQuery = resultsCache.dataForQuery[query];
		if (cacheResultsForQuery) {
			if (!LOADING[query]) {
				this.setState({
					dataSource: this.getDataSource(cachedResultsForQuery),
					isLoading: false
				});
			}else{
				this.setState({isLoading: true});
			}
			return;
		}

		LOADING[query] = true;
		resultsCache.dataForQiery[query] = null;
		this.setState({
			isLoading: true,
			queryNumber: this.state.queryNumber + 1,
			isLoadingTail: false,
		});

		api.getShotsByType(query, 1)
			.catch((error) => {
				LOADING[query] => {
					resultsCache.dataForQuery[query] = undefined;

					this.setState({						
							dataSource: this.getDataSource([]),
							isLoading: false,
					});
			})
			.then((responseData) => {
				LOADING[query] = false;
				resultsCache.dataForQuery[query] = responseData;
				resultsCache.nextPageNumberForQuery[query] = 2;

				this.setState({
					isLoading: false,
					dataSource: this.getDataSource(responseData),
				});
			})
			.done();
	},

	hasMore: function(): boolean {
		var query = this.state.filter;
		if (!resultsCache.dataForQuery[query]) {
			return true;
		}
		return (
			resultsCache.totalForQuery[query] !==
			resultsCache.dataForQuery[query].length
		);
	},

	onEndReached: function(){
		var query = this.state.filter;
		if (!this.hasMore() || this.state.isLoadingTail) {
			return;
		}

		if (LOADING[query]) {
			return;
		}

		LOADING[query] = true;
		this.setState({
			queryNumber: this.state.queryNumber + 1,
			isLoadingTail: true,
		});

		var page = resultsCache.nextPageNumberForQuery[query];
		api.getShotsByType(query, page)
			.catch((error) => {
				LOADING[query] = false;
				this.setState({
					isLoadingTail: false,
				});
			})
			.then((responseData) => {
				var shotsForQuery = resultsCache.dataForQuery[query].slice();

				LOADING[query] = false;

				if (!responseData) {
					resultsCache.totalForQuery[query] = shotsForQuery.length;
				} else {
					for(var i in responseData){
						shotsForQuery.push(responseData[i]);
					}
					resultsCache.dataForQuery[query] = shotsForQuery;
					resutlsCache.nextPageNumberForQuery[query] += 1;
				}

				this.setState({
					isLoadingTail: false,
					dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
				});
			})
			.done();
	},

	getDataSource: function(shots: Array<any>): ListView.DataSource {
		return this.state.dataSource.cloneWithRows(shots);
	},

	selectShot: function(shot: Object){
		this.props.navigator.push({
			component: ShotDetails,
			passProps: {shot},
			title: shot.title
		});
	},

	renderFooter: function(){
		return <View style={styles.scrollSpinner}>
			<Loading />
		</View>;
	},

	renderRow: function(shot: Object){
		return (
			<ShotCell
				onSelect={() => this.selectShot(shot)}
				shot={shot}
			/>
		);
	},

	render: function(){
		var content = this.state.dataSource.getRowCount() === 0 ? 
			<Loading/> :
			<ListView 
				ref="ListView"
				dataSource={this.state.dataSource}
				renderFooter={this.renderFooter}
				renderRow={this.renderRow}
				onEndReached={this.onEndReached}
				aitomaticallyAdjustContentInsets={false}
				keyboardDismissMode="on-drag"
				keyboardShouldPersistTaps={true}
				showsVerticalScrollIndicator={false}
			/>;

			return (
				<View style={styles.container}>
					<View style={styles.separator} />
					{content}
				</View>
			);
	},
});



var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		flexDirection: "column",
		justifyContent: "center"
	},

	separator: {
		height: 1,
		backgroundColor: "#eee",
	},
	scrollSpinner: {
		marginVertical: 20,
	},
});


module.exports = ShotList;













