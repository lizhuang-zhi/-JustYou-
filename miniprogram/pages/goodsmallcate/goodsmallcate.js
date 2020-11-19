import common from '../../utils/public';
var api = require('../../utils/api');
// var GoodsBysmallSortsIdurl = api.getGoodsBysmallSortsIdurl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    title:'',
    description:''
  },

  // 跳转商品详情页
  ToContent(back){
    wx.navigateTo({
      url: '/pages/goodcontent/goodcontent?id='+back.currentTarget.dataset.id,
    })
  },

  // 初始化数据
  Start(index){
    wx.showLoading({
      title: '数据加载中',
    })

    wx.request({
      url: '',
      data:{
        id:index
      },
      success:res=>{
        console.log(res.data);

        res.data.forEach(item=>{
          item.goodName = common.getStrLen(item.goodName,9,9);
        })

        this.setData({
          goodsList:res.data
        })
      }
    })

    setTimeout(()=>{
      wx.hideLoading({});
    },800)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    this.Start(options.id);

    this.setData({
      title:options.smallsortName,
      description:options.smallsortDescription
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