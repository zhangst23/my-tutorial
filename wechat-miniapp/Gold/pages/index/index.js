//index.js
//获取应用实例
var root = getApp()
Page({
  data: {
    timeLine: root.globalData.timeline.data
  },

  onLoad: function () {
    console.log('timeline onLoad')
  },

  touchEntry(e){
    wx.navivgateTo({
      url: '../entry/entry?index=' + e.currentTarget.dataset.index
    })
  },
  contentLimit(text){
    return text.substr(50)
  }
})
