var api = require('../../utils/api');
var myLikeUrl = api.getmyLikeUrl();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      {picUrl:"/images/我的收藏.png",title:"我的收藏",pageurl:"/pages/goodcategorys/goodcategorys"},
      {picUrl:"/images/定制开发.png",title:"私人定制",pageurl:"/pages/taskindexbar/taskindexbar"},
      {picUrl:"/images/商业合作.png",title:"商业合作",pageurl:"/pages/goodcarts/goodcarts"},
    ],
    //好物甄选商品集合
    myLikeGoodsList:[

    ],
      
  },

  // 跳转对应页面
  ToPageWay(back){
    // 跳转路径
    var roadway = back.currentTarget.dataset.pageurl;
    wx.navigateTo({
      url: roadway,
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求猜你喜欢商品集合
    wx.request({
      url: myLikeUrl,
      data:{
        smallsortId:3,
        id:1
      },
      success:res=>{
        console.log(res.data);
        this.setData({
          myLikeGoodsList:res.data
        })
      }
    }); 
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

