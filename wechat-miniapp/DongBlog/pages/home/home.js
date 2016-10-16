var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
	data: {
		title: '首页',
		postsList: [],
		hidden: false,
	},
	onPullDownRefresh: function(){
		this.fetchData();
		console.log('下拉刷新', new Date());
	},
	onLoad: function(){
		this.fetchData();
	},
	fetchData: function(data){
		wx.request({
			// url: 'test.php',
			url: Api.getTopics(data),
			success: function(res){
				console.log(res.data),

			}
		})
	}
})