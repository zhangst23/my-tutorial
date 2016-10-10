var app = getApp()
Page({
	data: {
		userInfo: {},
		list:[
			{
				list_tool:[
					{
						img:"../../image/photo.png",
						name:"相册"
					},
					{
						img:"../../image/sc_2.png",
						name: "收藏"
					}
				]
			},
			{
				list_tool:[
					{
						img:"../../image/money.png",
						name:"钱包（现在是播放器）"
					},
					{
						img:"../../image/card.png",
						name:"卡包"
					}
				]
			},
			{
				list_tool:[
					{
						img:"../../iamge/bq_2.png",
						name:"表情"
					},
					{
						img:"../../image/setting.png",
						name:"设置"
					}
				]
			},
		]
	},
	goPage:function(event){
		console.log(event.currentTarget.dataset.log);
		wx.navigateTo({
			url: '../audio/audio'
		})
	},
	onLoad: function(){
		var that = this
		app.getUserInfo(function(userInfo){
			that.setData({
				userInfo:userInfo
			})
		})
	}
})