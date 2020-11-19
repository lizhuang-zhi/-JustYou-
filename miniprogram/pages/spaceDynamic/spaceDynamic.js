// pages/spaceDynamic/spaceDynamic.js
var api = require('../../utils/api');
var tools = require('../../utils/public');
// 动态数据集合
var spaceIndex = api.getspaceIndex();

var app = getApp();

// 任务与动态相联系
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DynamicList: [],
    // 用户openid
    openid: ""

  },

  // 初始化数据
  Start(page = 1){
    // 获取app.js中的openid
    this.setData({
      openid: app.globalData.openid
    })
    
    var that = this;

    wx.request({
      url: spaceIndex,
      data: {
        pageNum: page,
        openId: 'vx001'
      },
      success:res=>{
        console.log(res.data.data.list);

        res.data.data.list.forEach(item=>{
          item.dynamicTime = tools.changeTimeFormat(item.dynamicTime);
        })

        that.setData({
          DynamicList: res.data.data.list
        })

      },
      fail: res=>{
        console.log(res);
        
      }
    })


  },

  // 发布动态
  addDynamic(){
    wx.navigateTo({
      url: '/pages/moreTask/moreTask',
    })
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Start();

  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Start();
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})