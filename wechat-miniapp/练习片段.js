练习片段.js

click:function(){
	console.log("点击了文字");
		if (flag) {
			color = "window-red";
			flag = false;
		} else {
			color = "window";
			flag = true;
		}
		this.setData({
			color
		});
},



// 修改后代码
var flag = true;
Page({
	data:{
		// text: "这是一个页面"
		color: "window"
	},
	click:function(){
		console.log("点击了文字");
			if (flag) {
				color = "window-red";
				flag = false;
			} else {
				color = "window";
				flag = true;
			}
			this.setData({
				color
			});
	},
})



// wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。

wx:request({
	url: 'test.php',
	data: {
		x: '',
		y: ''
	},
	header: {
		'Content-Type': 'application/json'
	},
	success: function(res){
		console.log(res.data)
	}
})


































