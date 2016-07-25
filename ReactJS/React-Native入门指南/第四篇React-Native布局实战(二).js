
一、头部导航栏
var React = require('react-native');
var Index = require('./pages/Index');

var {
	NavigatorIOS,
	AppRegistry,
	StyleSheet,
} = React;

var NV = React.createClass({
	render: function(){
		return(
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
					title: '首页',
					component: Index,
				}}
			/>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex:1,
	}
});

AppRegistry.registerComponent('HelloWorld', () => NV);


//  Index.js
//头部图片轮播

var React = require('react-native');
var Swiper = require('react-native-swiper')

var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	ScrollView,
} = React;

var Index = React.createClass({
	render: function(){
		return {
			<View></View>
		};
	}
});

var sliderImgs = [
	'#',
	'#',
	'#',
];

var Slider = React.createClass({
	render: function(){
		return (
			<Swiper style={styles.wrapper} showsButtons={false} autoplay={true} height={150} showsPagination={false}>
				<Image style={[styles.slide]} source={{uri: sliderImgs[0]}}></Image>
				<Image style={[styles.slide]} source={{uri: sliderImgs[1]}}></Image>
				<Image style={[styles.slide]} source={{uri: sliderImgs[2]}}></Image>
			</Swiper>
		)
	}
})




module.exports = Index;


//






//九宫格
<View>
	<View style={[styles.sbu_red, styles.sbu_view]}>
        <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
                <View style={[styles.sub_con_flex, styles.sub_text]}>
                    <Text style={[styles.font16]}>酒店</Text>
                </View>
                <View style={[styles.sub_con_flex]}>
                    <Image style={[styles.sbu_icon_img]} source={{uri:BUIcon[0]}}></Image>
                </View>
            </View>
        </TouchableHighlight>
        <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
            <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>海外</Text>
            </View>
            <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>周边</Text>
            </View>
        </View>
        <View style={[styles.sbu_flex]}>
            <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>团购.特惠</Text>
            </View>
            <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>客栈.公寓</Text>
            </View>
        </View>
    </View>
</View>


// 美团首页顶部分类的效果，用到 View Text Image
'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
class TestImage extends Component {
	render(){
		return (
		<View style={{marginLeft:5, marginTop:10, marginRight:5}}>
			<View style={{flexDirection:'row'}}>
				<View style={{width:70}}>
					<Image source={require('./img/one.png')} style={{alignSelf:'center', width:45, height:45}} />
					<Text style={{marginTop:5, textAlign:'center', fontSize:11, color:'#555555'}}>美食</Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
			</View>
			<View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
				<View>
					<Image></Image>
					<Text></Text>
				</View>
			</View>
		</View>
		)
	}
}

AppRegistry.registerComponent('TestImage', () => TestImage);
















