'use strice'

import React, {Component,Image,StyleSheet,TouchableHighlight,View} from 'react-native';

class ShowImg extends Component{
	componentDidMount(){
		React.NativeModules.JTSImagePreview.showImage('http://i.imgur.com/sKh7Z6R.png');
	}

	render() {
		return(
			<View></View>
		)
	}
}


export default class extends Component{
	constructor(){
		super();
		this.state = {
			show:false
		};
	}

	_onImagePress() {
		this.setState({
			show:false
		})
		this.setState({
			show:true
		})
	}

	render(){
		return(
			<View style={{marginTop:100, alignItems:"center"}}>
				<TouchableHighlight onPress={()=>this._onImgPress()}>
					<Image source={{uri:'http://i.imgur.com/sKh7Z6R.png'}} style={style.img}></Image>
				</TouchableHighlight>
				{this.state.show?<ShowImg></ShowImg>:<View></View>}
			</View>
		)
	}
}



const styles = StyleSheet.create({
	img:{
		height: 200,
		width: 300
	}
})













