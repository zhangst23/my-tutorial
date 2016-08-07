模仿实现美团首页顶部分类item功能效果实例.js

'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	Image,
	ViewPagerAndroid,
} from 'react-native';

var titles_first_data=["美食","电影","酒店","KTV","外卖","优惠买单","周边游","休闲娱乐","今日新单","丽人"];
var titles_second_data=["购物","火车票","酒店","KTV","外卖","优惠买单","周边游","休闲娱乐","今日新单","丽人"];
var ViewPagerDemo = React.createClass({
	getInitialState: function(){
		return {
			page:1,
		};
	},
	onPageSelected: function(e){
		this.setState({page: 1+e.nativeEvent.position});
	},
	render(){
		return (
			<View>
				<Text style={{textAlign:'center'}>
					美团首页顶部效果实例
				</Text>
				<ViewPagerAndroid style={styles.pageStyle} initialPage={0}
				onPageSelected={this.onPageSelected}>
					<View>
						<View style={{flexDirection: 'row'}}>
							<View style={{width:70}}>
							
									<Image source={require('./img/one.png')} style={styles.imageStyle} />

									<Text style={styles.textStyle}>{titles_first_data[0]}</Text>
							
							</View>
						</View>
					</View>
				</ViewPagerAndroid>
			</View>
		)
	}
})




















