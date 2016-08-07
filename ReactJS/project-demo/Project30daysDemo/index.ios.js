'use strict';

import React, {AppRegistry, DeviceEventEmitter,Component,Image,NavigatorIOS,ScrollView,StatusBarIOS,StyleSheet,Text,TouchableHighlight,View} from 'react-native';
import Util from './view/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import Day1 from './view/day1';
import Day2 from './view/day1';
import Day3 from './view/day1';
import Day4 from './view/day1';
import Day5 from './view/day1';
import Day6 from './view/day1';
import Day8 from './view/day1';
import Day9 from './view/day1';
import Day10 from './view/day1';
import Day12 from './view/day1';
import Day14 from './view/day1';
import Day24 from './view/day1';


class MainView extends Component {
	constructor(){
		super();
		this.state = {
			days:[{
				key:0,
				title:"A stopwatch",
				component: Day1,
				isFA: false,
				icon: "ios-stopwatch",
				size: 48,
				color: "#ff856c",
				hideNav: false,
			},{
				key:1,
				title:"A weather app",
				component: Day2,
				isFA: false,
				icon:"ios-partlysunny",
				size: 60,
				color:"#90bdc1",
				hideNav: true,
			},{
				key:2,
				title:"twitter",
				component: Day3,
				isFA: false,
				icon: "social-twitter",
				size: 50,
				color: "#2aa2ef",
				hideNav: true,
			},{
				key:3,
				title:"cocoapods",
				component: Day4,
				isFA: true,
				icon: "contao",
				size: 50,
				color: "#FF9A05",
				hideNav: false,
			},{
        key:4,
        title:"find my location",
        component: Day5,
        isFA: false,
        icon: "ios-location",
        size:50,
        color:"#00D204",
        hideNav: false,
      },{
        key:5,
        title:"Spotify",
        component: Day6,
        isFA: true,
        icon: "spotify",
        size:50,
        color:"#777",
        hideNav: true,
      },{
        key:7,
        title:"Swipe Left Menu",
        component: Day8,
        isFA: true,
        icon: "google",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:8,
        title:"Twitter Parallax View",
        component: Day9,
        isFA: false,
        icon: "social-twitter-outline",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        title:"Tumblr Menu",
        component: Day10,
        isFA: false,
        icon: "social-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      },{
        key:10,
        title:"OpenGL",
        component: Day11,
        isFA: false,
        icon: "contrast",
        size:50,
        color:"#2F3600",
        hideNav: false,
      },{
        key:11,
        title:"charts",
        component: Day12,
        isFA: false,
        icon: "stats-bars",
        size:50,
        color:"#fd8f9d",
        hideNav: false,
      },{
        key:13,
        title:"tinder",
        component: Day14,
        isFA: false,
        icon: "fireball",
        size:50,
        color:"#ff6b6b",
        hideNav: true,
      },{
      	key:23,
      	title:"Youtube scrollable tab",
      	component: Day24,
      	isFA: false,
      	icon: "social-youtube",
      	size: 50,
      	color: "#e32524",
      	hideNav: true,
      }]
		}
	}

	componentWillMount(){
		DeviceEventEmitter.addListener(
			'quickActionShortcut', (data) => {
				switch(data.title){
					case "Day5":
						this._jumpToDay(4);
						break;
					case "Day9":
						this._jumpToDay(8);
						break;
					case "Day14":
						this._jumpToDay(13);
						break;
					case "Day24":
						this._jumpToDay(23);
						break;
				}
			}
		);
	}

	_jumpToDay(index){
		this.props.navigator.push({
			title: this.state.days[index].component,
			component: this.state.days[index].component,
			navigationBarHidden: this.state.days[index].hideNav,
		})
	}

	render(){
		var onThis = this;
		var boxs = this.state.days.map(function(elem, index){
			return(
				<TouchableHighlight key={elem.key} style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]} underlayColor="#eee" onPress={()=> onThis._jumpToDay(index)}>
					<View style={styles.boxContainer}>
						<Text style={styles.boxText}>Day{index+1}</Text>
						{elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>
						<Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
					</View>
				</TouchableHighlight>
			);
		})
		return(
	      <ScrollView>
	        <Swiper height={150} showsButtons={false} autoplay={true}
	          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
	          <TouchableHighlight onPress={()=> onThis._jumpToDay(11)}>
	            <View style={styles.slide}>
	              <Image style={styles.image} source={{uri:'day1'}}></Image>
	              <Text style={styles.slideText}>Day12: Charts</Text>
	            </View>
	          </TouchableHighlight>
	          <TouchableHighlight onPress={()=> onThis._jumpToDay(10)}>
	            <View style={styles.slide}>
	              <Image style={styles.image} source={{uri:'day2'}}></Image>
	              <Text style={styles.slideText}>Day11: OpenGL</Text>
	            </View>
	          </TouchableHighlight>
	        </Swiper>
	        <View style={styles.touchBoxContainer}>
	          {boxs}
	        </View>
	      </ScrollView>			
		);
	}
}


class ThirtDaysOfReactNative extends Component{
	componentDidMount(){
		StatusBarIOS.setStyle(0);
	}

	render(){
		return(
			<NavigatorIOS
				ref='nav'
				style={styles.container}
				initialRoute={{
					title:"30 Days of RN",
					component: MainView,
					backButtonTitle: 'back',
					shadowHidden: true,
				}}
				itemWrapperStyle={styles.itemWrapper}
				tintColor="#777"
			/>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	
})










