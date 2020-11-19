// pages/Tagpage/Tagpage.js
var api = require('../../utils/api');
var LinkTaskByTagId = api.getLinkTaskByTagId();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagId:"",

    // 任务集合
    CateList:[]

  },

  // 初始化数据
  Start(){
    wx.request({
      url: LinkTaskByTagId,
      data: {
        tag_id: this.data.tagId
      },
      success: res=>{        
        console.log(res.data.data);
        this.setData({
          CateList: res.data.data
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    }).then(res=>{
      this.setData({
        tagId: options.id
      })
      this.Start()
    }).then(res=>{
      wx.hideLoading({ })
    })
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