var api = require('../../utils/api');
// var picSearchUrl = api.getpicSearchUrl();
// var picSearchbyBriefUrl = api.getpicSearchbyBriefUrl();
// var searchByNameUrl = api.getsearchByNameUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'',
    goodsList:[]
  },

  // 图片搜索
  onClick(){
    wx.chooseImage({
      count: 1,
      success:res=>{
        console.log(res.tempFilePaths);
        this.setData({
          photo:res.tempFilePaths[0]
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // Base64图片内容
            // console.log('data:image/png;base64,' + res.data);

            wx.request({
              url: picSearchUrl,
              data:{
                filePath:res.data
              },
              success:res=>{
                console.log(res.data);
                
                wx.request({
                  url: picSearchbyBriefUrl,
                  data:{
                    brief:res.data.result[0].brief
                  },
                  success:res=>{
                    // 模糊查询返回的商品集合
                    console.log(res.data);
                    wx.showLoading({
                      title: '搜索中...',
                    })
                    this.setData({
                      goodsList:res.data
                    })
                    setTimeout(()=>{
                      wx.hideLoading({})
                    },1000)
                  }
                })
                
              }
            })
            
          }
        })
        
      }
    })

  },

  // 文字搜索
  onSearch(event){
    wx.request({
      url: searchByNameUrl,
      data:{
        tit:event.detail
      },
      success:res=>{
        console.log(res);
        wx.showLoading({
          title: '搜索中...',
        })
        this.setData({
          goodsList:res.data
        })
        setTimeout(()=>{
          wx.hideLoading({})
        },1000)
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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