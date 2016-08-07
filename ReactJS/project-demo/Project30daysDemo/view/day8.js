'use strict';

import React,{Component,Image,StyleSheet,StatusBarIOS,StatusBarIOS,Text,TouchableHighlight,PanResponder,LayoutAnimation,ScrollView,View} from 'react-native';
import {Map} from './day5';
import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';

class Menu extends Component{
	render(){
		return(

		)
	}
}

export default class extends Component{
	constructor(){
		super();
		this.state = {
			showDrop:false
		}
	}

	_previousLeft = -0.7*Util.size.width-10;
	_previousOpacity = 0;
	_minLeft = -0.7*Util.size.width-10;
	_menuStyles = {};
	_dropStyle = {};
	_CustomLayoutLinear = {
		duration: 200,
		create: {
			type: LayoutAnimation.Types.linear,
			property: LayoutAnimation.Properties.left,
		},
		update: {
			type: LayoutAnimation.Types.curveEaseInEaseOut,
		},
	};
	menu = (null : ?{ setNativeProps(props: Object): void });
	drop = (null : ?{ setNativeProps(props: Object): void });

	_updatePosition(){
		this.menu && this.menu.setNativeProps(this._menuStyles);
		this.drop && this.drop.setNativeProps(this._dropStyles);
	}

	_endMove(evt, gestureState){
		if (gestureState.vx<0||gestureState.dx<0) {
			this._menuStyles.style.left = this._minLeft;
			this._dropStyles.style.opacity = 0;
			this._previousLeft = this._minLeft;
			this._previousOpacity = 0;
			this.setState({
				showDrop:false
			})
		}

		if (gestureState.vx>0||gestureState.dx>0) {
			this._menuStyles.style.left = 0;
			this._dropStyles.style.opacity = 1;
			this._previousLeft = 0;
			this._previousOpacity = 1;
		}
		this._updatePosition();
		LayoutAnimation.configureNext(this._CustomLayoutLinear);
	}

	componentWillMount(){
		this._panResponder = Panresponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				return gestureState.dy/gestureState.dx!=0;
			},
			onPanResponderGrant:(evt, gestureState) => {
				this.setState({
					showDrop:true
				})
			},
			onPanResponderMove: (evt, gestureState) => {
				this._menuStyles.style.left = this._previousLeft + gestureState.dx;
				this._dropStyles.style.opacity = this._previousOpacity+Math.pow(gestureState.dx/(-this._minLeft),0.5);
				if (this._menuStyles.style.left = 0) {
					this._menuStyles.style.left = 0;
					this._dropStyles.style.opacity = 1;
				};
				if (this._menuStyles.style.left < this._minLeft) {
					this.menuStyles.style.left = this._minLeft;
					this._dropStyles.style.opacity = 0;
				};
				this._updatePosition();
				layoutAnimation.configureNext(this._CustomLayoutLinear);
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease:(evt, gestureState) => this._endMove(evt, gestureState),
			onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
			onShouldBlockNativeResponder: (event, gestureState) => true,
		});

		this._menuStyles = {
			style: {
				left: this._previousLeft,
			},
		};
		this._dropStyles = {
			style: {
				opacity: this._previousOpacity,
			},
		};		
	}

	componentDidMount(){
		this._updatePosition();
		StatusBarIOS.setStyle(1);
	}

	render(){
		return(
			<View style={styles.container}>
				<Map mapType="standard" mapStyle={styles.map} showsUserLocation={false} followUserLocation={false}></Map>
				{this.state.showDrop?<View style={style.drop} ref={(drop) => {this.drop = drop;}}></View>:<View></View>}
				<View {...this._panResponder.panHandlers} style={styles.sideMenu} ref={(menu) = {this.menu = menu;}}>
					<Menu/>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	
})




















