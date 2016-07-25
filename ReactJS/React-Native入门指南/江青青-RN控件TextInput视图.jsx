江青青-RN控件TextInput视图.jsx

<TextInput 
	style={{height:40, borderColor: 'gray', borderWidth: 1}}
	onChangeText={(text) => this.setState({text})}
	value={this.state.text}		
 />


//
<View style={styles.container}>
	<Text style={styles.welcome}>
		Welcome to React Native!
	</Text>
	<TextInput style={{height:40, borderColor:'red', borderWidth:1}}
		multiline={true}
		defaultValue='默认信息1'
	 />
	<TextInput 
		style={{marginLeft:10, marginRight:10}}
		autoFocus={true}
		defaultValue='默认信息2'
	 />
	<TextInput 
		editable={false}
		defaultValue='默认信息3'
	/>
</View>


// QQ 登录界面

'use strict'
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	Image,
	View,
	TextInput,
} from 'react-native';

class TestInput extends Component {
	render(){
		return (
			<View style={{background:'#f4f4f4', flex:1}}>
				<Image 
					style={styles.style_image}
				 	source={require('./img/app_icon.png')}/>
				<TextInput 
					style={styles.style_user_input}
					placeholder='QQ号/手机号/邮箱'
					numberOfLines={1}
					autoFocus={tree}
					underlineColorAndroid={'transparent'}
					textAlign='center'
				/>
				<View 
					style={{height:1, backgroundColor:'#f4f4f4'}} 
				/>
				<TextInput
					style={styles.style_pwd_input}
					placeholder='密码'
					numberOfLines={1}
					underlineColorAndroid={'transparent'}
					secureTextEntry={true}
					textAlign='center'
				/>
				<View
					style={styles.style_view_commit}
				>
					<Text style={{color:'#fff'}}>
						登录
					</Text>
				</View>
				<View style={{flex:1,flexDirection:'row',alignItems:'flex-end',bottom:10}}>
					<Text style={styles.style_view_unlogin}>
						无法登录？
					</Text>
					<Text style={style.style_view_register}>
						新用户
					</Text>
				</View>
			</View>
		);
	}
}


const styles = Styles.create({
	style_image:{
		borderRadius:35,
		height:70,
		width:70,
		marginTop:40,
		alignSelf:'center',
	},
	style_user_input:{
		backgroundColor:'#fff',
		marginTop:10,
		hieght:35,
	},
	style_pwd_input:{
		background:'#fff',
		height:35,
	},
	style_view_commit:{
		marginTop:15,
		marginLeft:10,
		marginRight:10,
		backgroundColor:'#63B8FF',
		height:35,
		borderRadius:5,
		justifyContent:'center',
		alignItems: 'center',
	},
	style_view_unlogin:{
		fontSize:12,
		color:'#63B8FF',
		marginLeft:10,
	},
	style_view_register:{
		fontSize:12,
		color:'#',
		marginRight:10,
		alignItems:'flex-end',
		flex:1,
		flexDirection:'row',
		textAlign:'right',

	}

});
AppRegistry.registerComponent('TestInput', () => TestInput);

















