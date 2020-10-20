// pages/missionhall/missionhall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationMain:null,//正面
    animationBack:null,//背面
    backgroundList:[
      {backColor:'#FFDDAA',tit:"学习",description:"我们是的发放阿"},
      {backColor:'#94CCB9',tit:"运动",description:"我们放阿"},
      {backColor:'#FFECA7',tit:"志愿者招募",description:"我们是的发放阿"},
      {backColor:'#D1DBBD',tit:"跑腿",description:"我们是画起来的发放阿"},
      {backColor:'#91AA9D',tit:"AA制拼餐",description:"我们是的发放阿"},
      {backColor:'#FFDDAA',tit:"乐跑",description:"我们是的发放阿扯犊子"},
      {backColor:'#94CCB9',tit:"考研",description:"的发放阿有趣"},
      {backColor:'#FFECA7',tit:"更多",description:"更多任务请点击"}
    ]

  },

  // 点击翻转
  rotateFn(e) {
  	var id = e.currentTarget.dataset.id
  	this.animation_main = wx.createAnimation({
        duration:400,
        timingFunction:'linear'
      })
      this.animation_back = wx.createAnimation({
        duration:400,
        timingFunction:'linear'
      })
  	// 点击正面
 
  	if (id==1) {
      this.animation_main.rotateY(180).step()
      this.animation_back.rotateY(0).step()
      this.setData({
      	animationMain: this.animation_main.export(),
      	animationBack: this.animation_back.export(),
      })
  	}
  	// 点击背面
  	else{
      this.animation_main.rotateY(0).step()
      this.animation_back.rotateY(-180).step()
      this.setData({
      	animationMain: this.animation_main.export(),
      	animationBack: this.animation_back.export(),
      })
  	}
  },

  // 反面按钮点击
  btnClick(e){
    console.log('反面点我:'+e.currentTarget.dataset.id);
    // wx.navigateTo({
    //   url: '/pages/index/index',
    // })
    
  },

  // 发布选择
  chooseMission(e){
    console.log('发布选择点击事件'+e.currentTarget.dataset.id);
  },


  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:res=>{
        console.log(res);
        
      }
    }
    )

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