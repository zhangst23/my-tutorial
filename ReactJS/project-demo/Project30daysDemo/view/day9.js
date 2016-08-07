'use strict';

import React,{Component,Image,StyleSheet,Text,TouchableHighlight,PanResponder,LayoutAnimation,ScrollView,TabBarIOS,StatusBarIOS,SegmentedControlIOS,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class TwitterUser extends Component{
	constructor(){
		super();
		this.state = {
			scrollEnabled: false,
			scale: 1,
			iconTop: 95,
			bannerTop:0,
			opacity:0,
		};
	}

	_scrollEnabled = false;
	_previousTop = 0;
	_iconTop = 95;
	_scale = 1;
	_bannerTop = 0;
	_opacity = -192;
	user = (null : ?{ setNativeProps(props: Object): void });

	_updatePosition(){
		this.user && this.user.setNativeProps(this._userStyles);
	}

	_endMove(evt, gestureState){
		this._previousTop = this._userStyles.style.top;
	}

	_endMove(evt, gestureState){
		this._previousTop = this._userStyles.style.top;
	}

	componentWillMount(){
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				return gestureState.dy/gestureState.dx!=0;
			},
			onPanResponderGrant: (evt, gestureState) => {

			},
			onPanResponderMove: (evt, gesturState) => {
				this._userStyles.style.top = this._previousTop + gestureState.dy;
				this._scale = 1 + this._userStyles.style.top/162.5;
				this._iconTop = 95 - this._userStyles.style.top/4.16;
				this._bannerTop = 0;
				this._opacity = 0;
				// this._scrollEnabled = false;
				if (this._userStyles.style.top< -62.5) {
					this._scale = 0.6;
					this._iconTop = 110;
					this._bannerTop = -this._userStyles.top-62.5;
					this._opacity = Math.pow((-this._userStyles.style.top-62.5)/129.5,0.5)
				};
				if (this._userStyles.style.top>0) {
					this._userStyles.style.top = 0;
					this._scale = 1;
					this._iconTop = 95
				};
				if (this._userStyle.style.top < this._minTop) {
					this._userStyles.style.top = this._minTop;
					this._opacity = 1;
					this._bannerTop = 129.5;
					// this._scrollEnabled = true;					
				};

				this.setState({
					// scrollEnabled: this._scrollEnabled,
					scale: this._scale,
					iconTop: this._iconTop,
					bannerTop: this._bannerTop,
					opacity: this._opacity
				});

				this._updatePosition();
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
			onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
			onShouldBlockNativeResponder: (event, gestureState) => true,
		});

		this._userStyles = {
			style: {
				top: this._previousTop,
			},
		};
	}

	componentDidMount(){
		this._updatePosition();
	}

	render(){
		let panProps = this.state.scrollEnabled?{}:{...this._panResponder.panHandlers};
		return(
			<View>
				<View>
					<Image></Image>
					<View></View>
					<View>
						<TouchableHighlight>
							<Icon></Icon>
						</TouchableHighlight>
						<TouchableHighlight>
							<Icon></Icon>
						</TouchableHighlight>
						<TouchableHighlight>
							<Icon></Icon>
						</TouchableHighlight>
					</View>
					<View>
						<Text></Text>
						<Text></Text>
						<View>
							<Text></Text>
							<Text></Text>
						</View>
					</View>
					<Text></Text>
					<View>
						<SegmentedControlIOS></SegmentedControlIOS>
					</View>
				</View>
				<ScrollView>
					<View>
						<Image></Image>
					</View>
				</ScrollView>
			</View>
		)
	}
}

class TwitterTab extends Component{
	constructor(){
		supre();
		this.state = {
			selectedTab: '我',
		};
	}

	changeTab(tabName){
		this.setState({
			selectedTab: tabName
		});
	}

	render(){
		return(
			<TabBarIOS>
				<Icon.TabBarItem>
					<TwitterUser/>
				</Icon.TabBarItem>
				<Icon.TabBarItem>
					<TwitterUser/>
				</Icon.TabBarItem>
				<Icon.TabBarItem>
					<TwitterUser/>
				</Icon.TabBarItem>
				<Icon.TabBarItem>
					<TwitterUser/>
				</Icon.TabBarItem>
			</TabBarIOS>
		);
	}
}

export default class extends Component{
	componentDidMount(){
		StatusBarIOS.setStyle(1);
	}

	render(){
		return(
			<View>
				<TwitterTab/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
})
















