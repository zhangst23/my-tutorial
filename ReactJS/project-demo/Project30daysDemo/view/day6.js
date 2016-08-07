'use strict';

import React,{Component,Animated,Image,ScrollView,StatusBarIOS,StyleSheet,Text,TouchableHighlight,View} from 'react-native';
import Video from 'react-native-video';
import Util from './utils';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

class Intro extends Component{
	render(){
		return(
			<View style={styles.backgroundFixed}>
				<View style={styles.logo}>
					<View style={styles.logoIconContainer}>
						<Icon name="spotify" size={60} color="white"></Icon>
					</View>
					<View style={styles.logoTextContainer}>
						<Text style={styles.logoText}>Spotify</Text>
					</View>
				</View>

				<View style={styles.sliders}>
					<Swiper height={Util.size.height-200} showsButtons={false} autoplay={false}
					dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
					activeDot={<View style={{backgroundColor: 'rgba(255,255,255,1)', width: 6, height:6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
						<View style={styles.slide}>
							<Text style={styles.slide}></Text>
							<Text style={styles.slideText}>Sign up for free music on your phone,tablet</Text>
							<Text style={styles.slideText}>and computer.</Text>
						</View>
						<View style={styles.slide}>
							<Text style={styles.slideTextTitle}>Browse</Text>
							<Text style={styles.slideText}>Explore top tracks, new releases and the right</Text>
							<Text style={styles.slideText}>search and hit play</Text>
						</View>
						<View>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</View>
						<View>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</View>
						<View>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</View>
					</Swiper>
				</View>

				<View style={styles.btnContainer}>
					<TouchableHighlight style={[styles.btn,{backgroundColor:"#201437"}]}>
						<Text style={styles.btnText}>LOG IN</Text>
					</TouchableHighlight>
					<TouchableHighlight style={[styles.btn,{backgroundColor:"#29b859"}]}>
						<Text style={styles.btnText}>SIGN UP</Text>
					</TouchableHighlight>
				</View>

			</View>
		);
	}
}

export default class extends Component{
	componentDidMount(){
		StatusBarIOS.setStyle(1);
	}

	render(){
		return(
			<View style={styles.container}>
				<Video source={{uri: "moments"}}
					style={styles.backgroundFixed}
					resizeMode="cover" repeat={true} key="video1" />
				<Intro></Intro>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		height:Util.size.height,
		width:Util.size.width
	},
	backgroundFixed: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	sliders: {
		position: 'absolute',
		width: Util.size.width,
		bottom: 70,
		left: 0
	},
	slide: {
		flex: 1,
		height: Util.size.height-200,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 50
	},
	slideText:{
		color: "#fff",
		textAlign:"center"
	},
	slideTextTitle:{
		color:"#fff",
		textAlign:"center",
		fontWeight:"700"
	},
	logo:{
		position:"absolute",
		width: Util.size.width,
		top: 50,
		left: 0,
		flexDirection:"row",
		alignItems: "center",
		justifyContent:"center"
	},
	logoText:{
		color:"#fff",
		textAlign:"left",
		fontSize: 35,
		fontWeight:"700",
		backgroundColor:"transparent",
	},
	logoIconContainer:{
		backgroundColor:"transparent",
		paddingRight:5,
		marginTop:5
	},
	logoTextContainer:{
		backgroundColor:"transparent"
	},
	btnContainer:{
		position:"absolute",
		width: Util.size.width,
		bottom: 0,
		left: 0,
		height: 40,
		flexDirection: "row"
	},
	btn:{
		flex:1,
		alignItems:"center",
		justifyContent:"center"
	},
	btnText:{
		color:"#fff",
		fontWeight:"500",
		fontSize:14
	},
});





























