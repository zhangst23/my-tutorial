'use strict'

import React, {Component,Image,StyleSheet,Text,TouchableWithoutFeedback,StatusBarIOS,Animated,Easing,View} from 'react-native';
import Util from './utils';
import {BlueView,VibrancyView} from 'react-native-blur';

export default class extends Component{
	constructor(){
		super();
		this.state = {
			shift: new Animated.Value(-120),
			show:false,
		};
	}

	_pushMenu(){
		this.setState({
			show: true,
		});

		Animated.timing(
			this.state.shift,
			{toValue: Util.size.width === 375? 50:30,
				duration: 200,
				delay:100,
				easing: Easing.elastic(1),
			},
		).start();
	}

	_popMenu(){
		Animated.timing(
			this.state.shift,
			{toValue: -120,
			 duration: 200,
			 delay: 100,
			 easing: Easing.elastic(1),
			},
		).start();

		setTimeout(()=>{
			this.setState({
				show: false,
			})
		},500);
	}

	componentDidMount(){
		StatusBarIOS.setStyle(1);
	}

	render(){
		return(

		)
	}
}


const styles = StylesSheet.create({
	
})











