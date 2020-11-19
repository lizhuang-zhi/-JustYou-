// pages/TaskInit/TaskInit.js
var api = require('../../utils/api');
var AllTaskCommon = api.getAllTaskCommon();

// 声明任务对象
var taskObj;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 评论集合
    commList: [],

    // 任务对象
    TskObj: {},

    // 申请人数
    numList: [
      {name:"leo",url:"https://s1.ax1x.com/2020/11/01/BwpsLF.png"},
      {name:"小明",url:"https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2902873695,2157267194&fm=111&gp=0.jpg"},
      {name:"德玛",url:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=111&gp=0.jpg"},
      {name:"牟",url:"https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3510986481,3852924315&fm=111&gp=0.jpg"},
      {name:"K",url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=992462929,2195431434&fm=11&gp=0.jpg"}
    ],

    // 任务配图
    PicList: [
      {photoUrl:"https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1657471424,2319316184&fm=26&gp=0.jpg"},
      {photoUrl:"https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=34213197,3924228941&fm=15&gp=0.jpg"},

    ]

  },

  addOne(){
    var obj = {
      name:"boy",
      url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1709216491,2536617744&fm=26&gp=0.jpg"
    };

    this.data.numList.push(obj);

    this.setData({
      numList: this.data.numList
    })
  },

  // 初始化数据
  Start(taskId){
    var that = this;

    // 传输任务对象
    that.setData({
      TskObj: taskObj
    })

    wx.request({
      url: AllTaskCommon,
      data: {
        task_id: taskId
      },
      success: res=>{
        console.log(res.data.data);
        that.setData({
          commList: res.data.data
        })
        
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载..',
    }).then(res=>{
      // 将接受到的参数解析编码并解析JSON字符串
      taskObj = JSON.parse(decodeURIComponent(options.obj));
      
    }).then(res=>{
      this.Start(taskObj.id);
      wx.hideLoading({ })
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