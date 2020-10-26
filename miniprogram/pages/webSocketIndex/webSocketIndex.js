// pages/webSocketIndex/webSocketIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.connectSocket({
    //   url: "wss://mrkleo.top/justyou/websocket/"+1+"/"+2
    // })
    
    // //注意这里有时序问题，
    // //如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
    // //必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
    // wx.onSocketOpen(function() {
      
    //   wx.closeSocket({
    //     success:res=>{
    //       console.log('关闭成功');
          
    //     }
    //   })

    // })
    
    // wx.onSocketClose(function(res) {
    //   console.log('WebSocket 已关闭！')
    // })
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