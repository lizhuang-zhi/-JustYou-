var api = require('../../utils/api');
var tools = require('../../utils/public');
var detailDynamic = api.getdetailDynamic();
var comm = api.getcomm();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 动态详情对象
    dynamicDetail: {},

    // 评论集合
    commList: [],

    // 动态id
    dynamicId: ''
  },

  // 初始化加载数据
  Start(dynamic){
    console.log(dynamic);
    
    var that = this;
    
    wx.showLoading({
      title: '数据加载中',
    })

    var promise = new Promise(function(resolve,reject){
      // 请求任务详情数据
      wx.request({
        url: detailDynamic,
        data: {
          dynamic_id: dynamic,
          openId: "vx001"
        },
        success:res=>{
          console.log(res.data.data);
          // 更改日期格式
          res.data.data.dynamicTime = tools.changeTimeFormat(res.data.data.dynamicTime);
          that.setData({
            dynamicDetail: res.data.data
          })
          resolve('success')
        },
        fail: res=>{
          console.log('fail to load');
          
        }
      })

    }).then(res=>{
      // 请求评论集合数据
      wx.request({
        url: comm,
        data: {
          dynamic_id: that.data.dynamicDetail.dynamicId
        },
        success: res=>{
          console.log(res.data.data);
          // 更改日期格式
          res.data.data.forEach(item => {
            item.commTime = tools.changeTimeFormat(item.commTime)
          })
          this.setData({
            commList: res.data.data
          })
        }
      })

    }).then(res=>{
      wx.hideLoading({ })
    })
    
  },

  // 实时更新评论数据
  UpdateCom:function(e){
    console.log('实时更新评论的id：'+e.detail.dynamic_id);
    var dyId = e.detail.dynamic_id

    // 请求评论集合数据
    wx.request({
      url: comm,
      data: {
        dynamic_id: dyId 
      },
      success: res=>{
        console.log(res.data.data);
        // 更改日期格式
        res.data.data.forEach(item => {
          item.commTime = tools.changeTimeFormat(item.commTime)
        })
        this.setData({
          commList: res.data.data
        })
      }
    })

    // 刷新页面
    this.onShow();

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数并初始化
    this.Start(options.dynamicId)

    this.setData({
      dynamicId: options.dynamicId
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