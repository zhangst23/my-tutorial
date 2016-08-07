'use strict';

import React, {Animated, Component, Easting, Image, RefreshControl,ScrollView,StyleSheet,TabBarIOS,Text,TouchableHighlight,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
	static propTypes = {
		hideThis: React.PropTypes.func.isRequired,
	};

	constructor(){
		super();
		this.state = {
			transformAnim: new Animated.Value(1),
			opacityAnim: new Animated.Value(1),

		};
	}

	componentDidMount(){
		Animated.timing(
			this.state.transformAnim,
			{toValue: 50,
			 duration: 1200,
			 delay:2000,
			 easing: Easing.elastic(2),
			},
		).start();
		Animated.timing(
			this.state.opacityAnim,
			{toValue: 0,
			 duration: 800,
			 easing: Easing.elastic(1),
			 delay:2200,
			},
		).start();
		setTimeout(() => {
			this.props.hideThis();
		}, 3300);
	}

	render () {
		return(
			<Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
				<AnimatedIcon size={60} style={[styles.twitter,{transfomr:[{scale:this.state.transformAnim}]}]} name="social-twitter"></AnimatedIcon>
			</Animated.View>
		)
	}
}

class TwitterPost extends Component{
	constructor(){
		super();
		this.state = {
			isRefreshing: false,
		};
	}

	_onRefresh(){
		this.setState({
			isRefreshing: true,
		});
		setTimeout(() => {
			this.setState({
				isRefreshing: false,
			});
		}, 1000);
	}

	render(){
		return(
			<ScrollView
				style={styles.twitterPostContainer}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={()=>this._onRefresh()}
						tintColor="#ddd"/>
				}>
				<Image source={{uri:'day3'}} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
			</ScrollView>
		)
	}
}

class TwitterFlow extends Component{
	render(){
		return(
			<View>
				<View>
					<View>
						<Icon></Icon>
					</View>
					<View>
						<Icon></Icon>
					</View>
					<View>
						<Icon></Icon>
						<Icon></Icon>
					</View>
				</View>
				<TwitterPost></TwitterPost>
			</View>
		)
	}
}

class TwitterTab extends Component{
	constructor(){
		super();
		this.state = {
			selectedTab:'主页',
		};
	}

	changeTab(tabName){
		this.setState({
			selectedTab: tabName
		});
	}

	render(){
		return(
			<TabBarIOS 
				barTintColor="#fff"
				tintColor="#1b95e0">
				<Icon.TabBarItem
				title="主页"
				iconName="ios-home-outline"
				selectedIconName="ios-home"
				onPress={ () => this.changeTab('主页') }
				selected={ this.state.selectedTab === '主页' }>
					<TwitterFlow/>
				</Icon.TabBarItem>
				<Icon.TabBarItem></Icon.TabBarItem>
				<Icon.TabBarItem></Icon.TabBarItem>
				<Icon.TabBarItem></Icon.TabBarItem>
			</TabBarIOS>
		)
	}
}


export default class extends Component{
	constructor(){
		super();
		this.state = {
			show:true
		};
	}

	_hideEntrance(){
		this.setState({
			show:false
		})
	}

	render(){
		let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
		return(
			<View style={styles.twitterContainer}>
				<TwitterTab/>
				{entrance}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemWrapper:{
		backgraoundColor: '#fff'
	},
})



















