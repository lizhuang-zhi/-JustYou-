var api = require('../../utils/api');
var indexCate = api.getindexCategory();
var TaskListByCate = api.getTaskListByCate();
var tools = require('../../utils/public');

// 定义请求页面数
var page_num = 1;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    ani:'',
    active: 1,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://s1.ax1x.com/2020/09/02/wpSWE8.png',
    },
    show: false,

    // 添加动画
    animationData: {},

    // 分类集合
    CateList:[],
    // 分类所对应的任务集合
    TaskByCate:[]

  },

  // 去搜索页面
  ToSearchPage(){
    wx.showLoading({
      title: '跳转中..'
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }).then(res=>{
      wx.hideLoading({})
    })
  },

  // 未开发给出提示
  GiveToast(){
    wx.showLoading({
      title: '跳转中..'
    }).then(res=>{
      wx.switchTab({
        url: '/pages/spaceDynamic/spaceDynamic',
      })
    }).then(res=>{
      wx.hideLoading({})
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

  // 点击进入具体bar
  GetTheBar(back){
    console.log(back);
    
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

  // 改变tabs分类时触发
  ChangeTabs(res){
    console.log(res.detail.index);
    // 获取分类id
    var class_id = res.detail.index + 1;
    // 置空原来存储的任务集合
    this.setData({
      TaskByCate: []
    })
    // 根据分类id获取对应集合
    this.UpdateTask(1,class_id);
    
  },

  // 初始化
  Start(){
    wx.request({
      url: indexCate,
      method: 'GET',
      success:back=>{
        console.log(back.data.data);
        this.setData({
          CateList:back.data.data
        })

        // 初始化请求数据
        this.UpdateTask();
      }
    })   
  },

  // 触底更新数据
  UpdateTask(pageN = 1,class_id = 1){
    wx.showLoading({
      title: '加载中..',
    }).then(res=>{
      // 通过分类请求对应的集合
      wx.request({
        url: TaskListByCate,
        method: 'GET',
        data: {
          pageNum: pageN,
          class_id: class_id
        },
        success:res=>{
          console.log(res.data.data.list);
          var oldData = this.data.TaskByCate;
          var newData = oldData.concat(res.data.data.list);
          // 更改时间格式
          res.data.data.list.forEach(element => {
            element.release_time = tools.changeTimeFormat(element.release_time);
          });  
          this.setData({
            TaskByCate: newData
          })
          
        }
      })

    }).then(res=>{
      wx.hideLoading({})
    })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // 初始化
    this.Start();
    
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  // 箭头移动的动画
  moveJianTou(){
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.moveJianTou();
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
    page_num++;
    this.UpdateTask(page_num,1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
