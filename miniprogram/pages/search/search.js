// pages/search/search.js
var api = require('../../utils/api');
var recentSearch = api.getrecentSearch();
var hotTag = api.gethotTag();
var LinkTaskByTagId = api.getLinkTaskByTagId();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 排行榜
    RankList:[
      {jud:true,color:"red",rank:"1",desc:"东软美景",numVal:"9090923"},
      {jud:true,color:"orange",rank:"2",desc:"青城山",numVal:"2565556"},
      {jud:true,color:"yellowgreen",rank:"3",desc:"软件工程实践中心",numVal:"34444"},
      {jud:false,color:"gray",rank:"4",desc:"德玛西亚",numVal:"4356"},
      {jud:false,color:"gray",rank:"5",desc:"无极剑圣",numVal:"5000"},
    ],

    // 用户id
    open_id: "",
    // 历史搜索集合
    RescentSeaList: [],
    // 热门搜索
    hotTagList: []
  },

  // 点击具体热门标签
  GetTagId(back){
    var tagId = back.currentTarget.dataset.tagid

    wx.showToast({
      title: '加载中',
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/Tagpage/Tagpage?id='+tagId,
      })
    }).then(res=>{
      wx.hideLoading({ })
    })
    
  },

  // 初始化
  Start(){
    var that = this;
    var promise = new Promise(function(resolve,reject){
      // 获取用户的openid
      wx.cloud.callFunction({
        name:'getUserOpenid',
      })
      .then(back=>{
        // console.log(back.result.openid);
        that.setData({
          openid:back.result.openid
        })
        // Bestopenid = that.data.openid;
        console.log('that.data中的openid：'+that.data.openid);
        resolve('success');
      })

    }).then(res=>{
      wx.request({
        url: recentSearch,
        data: {
          open_id: this.data.open_id
        },
        success: res=>{
          console.log(res.data.data);
          this.setData({
            RescentSeaList: res.data.data
          })
          
        }
      })


      wx.request({
        url: hotTag,
        success: res=>{
          console.log(res.data.data);
          this.setData({
            hotTagList: res.data.data
          })
        }
      })
      
    })


    

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
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