Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    // show: false,
    ani:'',
    active: 1,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://s1.ax1x.com/2020/09/02/wpSWE8.png',
    },
    show: false,

    // 添加动画
    animationData: {}

  },

  // 去搜索页面
  ToSearchPage(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 未开发给出提示
  GiveToast(){
    wx.showToast({
      title: '暂未开发',
      icon: 'none'
    })
  },

  // 关闭左侧弹出层
  onClose() {
    this.setData({ show: false });
  },

  // 开启左侧弹出层
  showPopup() {
    this.setData({ show: true });
  },

  // 去到任务大厅
  TaskContent(){
    wx.navigateTo({
      url: '/pages/missionhall/missionhall',
    })
  },

  // 去到项目商城
  ShoppingContent(){
    wx.switchTab({
      url: '/pages/goodindexbar/goodindexbar',
    })
  },


  // tabbar点击事件
  onChange(event) {
    var that = this;
    // event.detail 的值为当前选中项的索引
    
    var promise = new Promise(function(resolve,reject){
      that.setData({ active: event.detail });
      resolve('success')

    }).then(res=>{
      if(this.data.active == 1){
        // var animationg = wx.createAnimation({
        //   delay: 0,
        //   duration:400,
        //   timingFunction:'linear'
        // })
        // animationg.rotate(0).step();
        // this.setData({
        //   ani:animationg.export()
        // })
      }else if(this.data.active == 2){
        var animationg = wx.createAnimation({
          delay: 0,
          duration:400,
          timingFunction:'linear'
        })
        animationg.rotate(135).step();
        this.setData({
          ani:animationg.export()
        })
      }else if(this.data.active == 0){
        var animationg = wx.createAnimation({
          delay: 0,
          duration:400,
          timingFunction:'linear'
        })
        animationg.rotate(-135).step();
        this.setData({
          ani:animationg.export()
        })
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
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'linear',
    })

    this.animation = animation;

    var next = true;
    setInterval(function(){
      if(next){
        this.animation.scale(0.95).step();
        next = !next;
      }else{
        this.animation.scale(1.1).step();
        next = !next;
      }
      this.setData({
        animationData:animation.export()
      })

    }.bind(this),600)

    // animation.scaleX(1).step();

    // this.setData({
    //   animationData:animation.export()
    // })
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
