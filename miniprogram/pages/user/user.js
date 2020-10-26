// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    judge:[1,2,3,6],
    name:'boy',
    picUrl:'https://s1.ax1x.com/2020/08/02/aYQfFx.jpg',
    // 关于我的
    aboutMeList:[
      {pic:"",tit:"我的发布",url:""},
      {pic:"",tit:"我的动态",url:""},
      {pic:"",tit:"我的性格",url:""}
    ],
    // 周边服务
    aroundSaleList:[
      {pic:"orders-o",text:"订单管理",url:"/pages/goodorder/goodorder"},
      {pic:"cart-o",text:"购物车",url:"/pages/goodcarts/goodcarts"},
      {pic:"star-o",text:"我的收藏",url:""},
      {pic:"location-o",text:"地址管理",url:""},
      {pic:"friends-o",text:"我的相册",url:"/pages/Albumwx/Albumwx"},
      {pic:"comment-o",text:"我的消息",url:""}
    ],
    // 其他服务
    otherList:[
      {pic:"https://s1.ax1x.com/2020/09/02/dz0Gjg.png",text:"在线客服"},
      {pic:"https://s1.ax1x.com/2020/09/02/dz0YuQ.png",text:"授权管理"},
      {pic:"https://s1.ax1x.com/2020/09/02/dz0aEn.png",text:"意见反馈"},
      {pic:"https://s1.ax1x.com/2020/09/02/dz0dNq.png",text:"关于我们",url:"/pages/aboutus/aboutus"}
    ],


  },

  // 我的收藏
  myProServe(){
    var that = this;
    
    wx.getSetting({
      withSubscriptions: true,
      success:function(res){
        console.log(res);
        

        //如果授权成功
        if(res.authSetting['scope.userInfo']==true){
          console.log(that.data.openid);
          
          wx.navigateTo({
            //跳转到收藏页面
            url: '/pages/proserve/proserve?openid='+that.data.openid,   
            success:res=>{
              console.log('跳转到收藏页成功');
              
            }
          })

        }else{       //未授权

          wx.navigateTo({
            url: '/pages/login/login',
            success:res=>{
              console.log('跳转到授权页成功');
              
            }
          })

        }

      }
    })
    
    
  },

  // 初始化数据
  start(){
    wx.showLoading({
      title: '数据加载中..',
    })
    var that = this;

    // 获取用户的openid
    wx.cloud.callFunction({
      name:'getUserOpenid',
    })
    .then(back=>{
      // console.log(back.result.openid);
      this.setData({
        openid:back.result.openid
      })
      // Bestopenid = that.data.openid;
      console.log('that.data中的openid：'+that.data.openid);
      
    })

    // 查看是否授权
    wx.getSetting({
      withSubscriptions: true,
      success: function(res){
        console.log(res);
        
        // 接收授权
        if (res.authSetting['scope.userInfo'] == true) {   
          
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
              that.setData({
                name:res.userInfo.nickName,
                picUrl:res.userInfo.avatarUrl
              })
              
            }
          })
            
        }else if(res.authSetting['scope.userInfo'] === false){  //拒绝授权
          that.setData({
            name:'boy',
            picUrl:'https://s1.ax1x.com/2020/08/02/aYQfFx.jpg'
          })
        }
        
      }
    })

    setTimeout(()=>{
      wx.hideLoading({})
    },1000)
  },

  // 周边服务跳转
  ToAroundService(back){
    console.log(back.currentTarget.dataset.url);
    var url = back.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  // 关于我们跳转
  ToAbout(back){
    wx.navigateTo({
      url: back.currentTarget.dataset.url,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      openid:options.openid,
      name:options.nickName,
      picUrl:options.avatarUrl
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
    // 初始化数据
    this.start();
    

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