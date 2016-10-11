const douban = require('../../libraries/douban.js')

Page({
	data: {
		title: '',
		loading: true,
		movie: {}
	},

	onLoad(params){
		douban.findOne(params.id)
			.then(d => this.setData({ title: d.title, movie: d, loading: false }))
			.catch(e => {
				this.setData({ title: '获取数据异常', movie: {}, loading: false })
				console.error(e)
			})
	},

	onReady () {
		wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
	}
})