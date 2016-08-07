'use strict'

import React,{Component,Image,MapView,StyleSheet,Text,TouchableHighlight,View} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Iconicons';

export class Map extends Component{
	static defaultProps = {
		mapType: 'standard',
		showsUserLocation: false,
		followUserLocation: false,
	};

	static propTypes = {
		mapType: React.PropTypes.oneOf(['standard', 'satellite', 'hybrid']),
		showsUserLocation: React.PropTypes.bool.isRequired,
		followUserLocation: React.PropTypes.bool.isRequired,
	};

	constructor(){
		super();
		this.state = {
			isFirstLoad: true,
			mapRegion: undefined,
			annotations: [],
		};
	}

	_getAnnotations(region){
		return [{
			longitude: region.longitude,
			latitude: region.latitude,
			title: 'Your Are Here',
		}];
	}

	_onRegionChangeComplete(region){
		if (this.state.isFirstLoad) {
			this.setState({
				annotations: this._getAnnotations(region),
				isFirstLoad: false,
			});
		}
	}

	render(){
		return(
			<View>
				<MapView
				style={this.props.mapStyle}
				mapType={this.props.mapType}
				showsUserLocation={this.props.showsUserLocation}
				followUserLocation={this.props.followUserLocation}
				onRegionChangeComplete={(region) => this._onRegionChangeComplete(region)}
				region={this.state.mapRegion}
				annotations={this.state.annotations}/>
			</View>
		)
	}
}


export default class extends Component{
	constructor(){
		super();
		this.state = {
			showGeo:false
		};
	}

	_getLocation(){
		this.setState({
			showGeo: true
		})
	}

	render(){
		<View style={style.container}>
			<Map mapType="standard" mapStyle={styles.map} showsUserLocation={this.state.showGeo} folloeUserLocation={this.state.showGeo}></Map>
			<TouchableHighlight underlayColor="#00bd03" style={styles.btn} onPress={() => this._getLocation()}>
				<Text style={styles.btnText}><Icon size={18} name="navigate"></Icon>Find my location</Text>
			</TouchableHighlight>
		</View>
	}
}


const styles = StyleSheet.create({
	container:{
		alignItems: "center",
		paddingTop: 60
	},
	map:{
		width: Util.size.width,
		height: Util.size.height-120
	},
	btn:{
		backgroundColor:"#--a803",
		width: Util.size.width-80,
		height: 40,
		borderWidth: Util.pixel,
		borderColor: "#009302",
		borderRadius: 4,
		justifyContent: "center",
		marginTop: 10
	},
	btnText:{
		textAlign:"center",
		fontSize:18,
		color:"#fff"
	},
});



















