江青青-RN控件Image视图.jsx

//
<View>
	<Text style={{fontSize:16}}>'测试本地图片'</Text>
	<Image source={require('./img/my_icon.png')} />
</View>

//
<Image source={require('./img/my_icon'+'.png')} />

//
<Image source={{uri:'ic_launcher'}} style={{width: 40, height: 40}} />

//
<Image source={{uri:'http://mta.z.8080/images/ZTT_123.jpg'}} style={{}} />

//Image实现某些控件的背景图效果
<Image source={require('./img/my_icon.png')}>
	<Text style={{color: 'red'}}>下面是背景图</Text>
</Image>



















