// pages/missionhall/missionhall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationMain:null,//正面
    animationBack:null,//背面
    backgroundList:[
      {picUrl:"https://s1.ax1x.com/2020/10/20/BS0g1I.gif",backColor:'#FFDDAA',tit:"学习",description:"我们是的发放阿"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BSwvYd.gif",backColor:'#94CCB9',tit:"运动",description:"我们放阿"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BSDkGj.gif",backColor:'#FFECA7',tit:"物品代取",description:"我们是的发放阿"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BS0g1I.gif",backColor:'#D1DBBD',tit:"志愿者招募",description:"我们是画起来的发放阿"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BSDmLV.gif",backColor:'#D1DBBD',tit:"AA制拼餐",description:"我们是的发放阿"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BSDPIg.gif",backColor:'#FFDDAA',tit:"乐跑",description:"我们是的发放阿扯犊子"},
      {picUrl:"https://s1.ax1x.com/2020/10/20/BSBOGd.gif",backColor:'#94CCB9',tit:"考研",description:"的发放阿有趣"},
      {picUrl:"/images/more.png",backColor:'#FFECA7',tit:"更多",description:"更多任务请点击"}
    ],

    // 添加动画
    animationData: {},

    timer:null

  },

  // 点击翻转
  // rotateFn(e) {
  // 	var id = e.currentTarget.dataset.id
  // 	this.animation_main = wx.createAnimation({
  //       duration:400,
  //       timingFunction:'linear'
  //     })
  //     this.animation_back = wx.createAnimation({
  //       duration:400,
  //       timingFunction:'linear'
  //     })
  // 	// 点击正面
 
  // 	if (id==1) {
  //     this.animation_main.rotateY(180).step()
  //     this.animation_back.rotateY(0).step()
  //     this.setData({
  //     	animationMain: this.animation_main.export(),
  //     	animationBack: this.animation_back.export(),
  //     })
  // 	}
  // 	// 点击背面
  // 	else{
  //     this.animation_main.rotateY(0).step()
  //     this.animation_back.rotateY(-180).step()
  //     this.setData({
  //     	animationMain: this.animation_main.export(),
  //     	animationBack: this.animation_back.export(),
  //     })
  // 	}
  // },


  // 反面按钮点击
  // btnClick(e){
  //   console.log('反面点我:'+e.currentTarget.dataset.id);
  //   // wx.navigateTo({
  //   //   url: '/pages/index/index',
  //   // })
    
  // },

  // 发布选择
  chooseMission(e){
    console.log('发布选择点击事件'+e.currentTarget.dataset.id);
  },

  // 去往任务发布编辑页
  ToGetAPage(back){
    var that = this;
    // 获取点击任务的标题
    var title = back.currentTarget.dataset.title;
    
    
    var promise = new Promise(function(resolve,reject){
      
      var animation = wx.createAnimation({
        delay: 0,
        timingFunction:'linear',
        duration:1000
      })
    
      animation.translateX(-350).step();
      animation.translateX(0).step();
 
   
      that.setData({
        animationData:animation.export()
      })
      resolve('success');

    }).then(res=>{

      // 通过任务标题判断要进入的编辑任务页
      if(title == "更多"){
        wx.navigateTo({
          url: '/pages/moreTask/moreTask',
        })
        
      }else if(title == "物品代取"){
        wx.navigateTo({
          // 这里的test页面就是快递代取任务填写页面
          url: '/pages/test/test',
        })
      }else{
        wx.navigateTo({
          url: '/pages/taskOne/taskOne',
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