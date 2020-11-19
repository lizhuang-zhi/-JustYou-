// var api = require('../../utils/api');
// var myLikeUrl = api.getmyLikeUrl();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      {picUrl:"https://s1.ax1x.com/2020/11/07/B4yPYt.png",title:"分类",pageurl:"/pages/goodcategorys/goodcategorys"},
      {picUrl:"https://s1.ax1x.com/2020/11/07/B46mjO.png",title:"订单",pageurl:"/pages/goodorder/goodorder"},
      {picUrl:"https://s1.ax1x.com/2020/11/07/B4sHF1.png",title:"购物车",pageurl:"/pages/goodcarts/goodcarts"},
      {picUrl:"/images/我的收藏.png",title:"我的收藏",pageurl:"/pages//"},
      {picUrl:"/images/定制开发.png",title:"私人定制",pageurl:"/pages/taskindexbar/taskindexbar"},
      {picUrl:"/images/商业合作.png",title:"商业合作",pageurl:"/pages/aboutus/aboutus"},
    ],
    //好物甄选商品集合
    myLikeGoodsList:[
      {picUrl:"https://img12.360buyimg.com/mobilecms/s600x600_jfs/t14575/78/2373100183/17181/3a4ceb15/5a9c08c1N750c02b6.jpg!q70.jpg",id: 1, goodName: "联想笔记本Pro", goodTitInfo: "学习办公看剧的好帮手，必备利器！是你生活的好助手", goodPrice: 6789.99, goodStore: 125},
      {picUrl:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2110103830,220855216&fm=26&gp=0.jpg",id: 9, goodName: "华硕 量子蜂巢散热", goodTitInfo: "Asus/华硕天选FA506新锐龙8核R7-4800H", goodPrice: 18728, goodStore: 3225},
      {picUrl:"https://img12.360buyimg.com/ceco/s600x600_jfs/t1/145185/32/3092/137665/5f109236E90dea00c/c74e3bfa00a93740.jpg!q70.jpg",id: 8, goodName: "惠普 WIFI6 八核轻薄本", goodTitInfo: "实战利器，GTX1650独显9代i5", goodPrice: 6538.3, goodStore: 370},
      
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

  // 跳转到商品详情页
  ToDetailByLike(){
    wx.navigateTo({
      url: '/pages/goodcontent/goodcontent',
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求猜你喜欢商品集合
    wx.request({
      url: '',
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

