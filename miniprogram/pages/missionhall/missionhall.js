// pages/missionhall/missionhall.js
var api = require('../../utils/api')
var AllTaskClassifi = api.getAllTaskClassifi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationMain:null,//正面
    animationBack:null,//背面
    backgroundList:[],

    // 添加动画
    animationData: {},

    timer:null

  },

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
        timingFunction:'ease',
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
          url: '/pages/moreTask/moreTask?id='+back.currentTarget.dataset.id,
        })
        
      }else if(title == "物品代取"){
        wx.navigateTo({
          // 这里的test页面就是快递代取任务填写页面
          url: '/pages/test/test?id='+back.currentTarget.dataset.id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/taskOne/taskOne?id='+back.currentTarget.dataset.id,
        })
      }

    })


    
    
  },


  // 初始化数据
  Start(){
    wx.request({
      url: AllTaskClassifi,
      data: {
        pageNum: 1
      },
      success:res=>{
        console.log(res.data.data.list);

        // 随机添加颜色
        res.data.data.list.forEach(item =>{
          item.backColor = this.GetColor();
        })

        this.setData({
          backgroundList: res.data.data.list
        })
        
      }
    })
  },


  // 获取随机颜色
  GetColor(){
    var arrColor = [
    '#FFDDAA','#94CCB9','#FFECA7',
    '#D1DBBD','#D1DBBD','#FFDDAA',
    '#94CCB9']

    var num = Math.floor(Math.random()*7)

    return arrColor[num]
  },



  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.Start()
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