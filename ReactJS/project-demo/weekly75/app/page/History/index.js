import React,{
	Component,
	View,
	Text,
	ListView,
	StyleSheet,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';

import commonStyle from '../../common/style';
import AddBtn from '../../common/AddBtn';
import Loading from '../../common/Loading';
import Api from '../../network/api';
import List from '../Latest';

class History extends Component {
	constructor(props){
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 != row2
			}),
			loaded: false,
			count: null,
			totalPages: null,
			numsPerPage: null,
			currentPage: 1,
			loadMore: false,
			allLoaded: false,
			data: [],
			isRefreshing: false,
		}
	}

	componentDidMount(){
		this.props.navComponent.setNavItems({
			rightItem: {
				component: <AddBtn navigator={this.props.navigator}/>
			}
		});
		this._fetchData();
	}

	_fetchData(){
		var {data} = this.state;
		if (this.state.allLoaded) return;
		Api.getList(this.state.currentPage)
			.then((responseData) => {
				data = [...data, ...responseData.data];
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(data),
					data,
					loaded: true,
					count: responseData.count,
					totalPages: responseData.totalPages,
					numsPerPage: responseData.numsPerPage,
					currentPage: responseData.currentPage,
					isRefreshing: false,
				});

				if (this.state.totalPages == this.state.currentPage) {
					this.state.allLoaded = true;
				}
			})
	}

	_jumpPage(item){
		this.props.navigator.push({
			title: '起舞周刊${item.iid}期',
			component: <List iid={item.iid} />
		})
	}
	_renderRow(item){
		return(
			<View style={styles.container}>
				<TouchableOpacity
					onPress={()=>{
						this._jumpPage(item)
					}}>
					<Text>起舞周刊第{item.iid}期</Text>
					<Text style={styles.date}>{item.date}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_onRefresh(){
		this.setState({idRefreshing: true});
		this._fetchData();
	}

	_renderFooter(){
		var {loadMore, allLoaded} = this.state;
		if (allLoaded) return null;
		return (
			<TouchableOpacity
				style={styles.footer}
				onPress={this._getMore.bind(this)}>
				<Text style={{color: '#ccc'}}>{loadMore?'loading':'加载更多'}</Text>
			</TouchableOpacity>
		)
	}

	_getMore(){
		var currentPage = this.state.currentPage + 1;
		this.setState({
			loadMore: true,
			currentPage,
		});
		this._fetchData().then(()=>{
			this.setState({
				loadMore: false
			});
		})
	}

	render(){
		if (!this.state.loaded) {
			return <Loading />
		}
		return (
			<ListView
				style={{marginBottom: 48}}
				dataSource={this.state.dataSource}
				onEndReachedThreshold={10}
				renderRow={this._renderRow.bind(this)}
				renderFooter={this._renderFooter.bind(this)}
				refreshControl={
					<refreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh.bind(this)}
						tintColor="#649F0C"
						title="用力啊..."
						progressBackgroundColor="#649F0C"
					/>
				}/>
		);
	}
}

var styles = StyleSheet.create({

})



export default History;











