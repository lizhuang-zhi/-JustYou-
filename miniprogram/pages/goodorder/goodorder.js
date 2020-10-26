var api = require('../../utils/api');
// var manageSettleUrl = api.getmanageSettleUrl();
var PayNum = 0;
var PayPrice = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:"https://img.alicdn.com/imgextra/i1/2069547158/O1CN01BAj7fo22kPcCtncKc_!!0-item_pic.jpg_430x430q90.jpg",
    InProgressList:[],
    PayMentList:[],
    PayMentNum:0,
    PayMentTotalPrice:0,
    FinallyList:[]
    
  },


  // 初始化数据
  Start(status_1,status_2,status_3){
    wx.showLoading({
      title: '数据加载中..',
    })
    var that = this;

    var promise = new Promise(function(resolve,reject){
      // 获取用户的openid
      wx.cloud.callFunction({
        name:'getUserOpenid',
      })
      .then(back=>{
        that.setData({
          openid:back.result.openid
        })
        console.log('that.data中的openid：'+that.data.openid);
        resolve('success');
        
      });

    }).then(res=>{
      // 请求进行中的集合
      wx.request({
        url: manageSettleUrl,
        data:{
          openid:this.data.openid,
          settleStatus:status_2
        },
        success:res=>{
          console.log(res.data);
          this.setData({
            InProgressList:res.data
          })
          
        }
      })

      // 请求代付款的集合
      wx.request({
        url: manageSettleUrl,
        data:{
          openid:this.data.openid,
          settleStatus:status_3
        },
        success:res=>{
          console.log(res.data);

          this.setData({
            PayMentList:res.data
          })
          
        }
      })

      // 请求已完成的集合
      wx.request({
        url: manageSettleUrl,
        data:{
          openid:this.data.openid,
          settleStatus:status_1
        },
        success:res=>{
          console.log(res.data);
          this.setData({
            FinallyList:res.data
          })
          
        }
      })

    }).then(res=>{
      wx.hideLoading({ })
    })

    

    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Start(1,2,3);
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