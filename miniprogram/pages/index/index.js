var api = require('../../utils/api');
var tools = require('../../utils/public');
var indexCate = api.getindexCategory();
var TaskListByCate = api.getTaskListByCate();
var AllTask = api.getAllTask()

// 定义请求页面数
var page_num = 1;

// 定义分类id
var class_id = 0;
var app = getApp();
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
    TaskByCate:[],

    // 判断时间
    JudgeTime:'',

    // 用户昵称
    userName: '',

    // 用户头像
    userImg: '',

    // 任务id
    task_id:'',

    // 首页背景图集合
    backPicList:[
      "https://s3.ax1x.com/2020/11/13/DSGPUO.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3028148277,1614842737&fm=15&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3053072254,2488170492&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=720822740,2245648360&fm=15&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2113130528,967997212&fm=26&gp=0.jpg",
      "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2306010771,3089368377&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1566826507,352179765&fm=26&gp=0.jpg",
      "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2189967026,4181685455&fm=26&gp=0.jpg",
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4249141887,1056952857&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2232845759,169295485&fm=26&gp=0.jpg",
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=390954043,4280002272&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=108879143,4286503539&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=266641814,86922992&fm=26&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3266479433,1999627905&fm=26&gp=0.jpg",
    ]

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
    class_id = res.detail.index;
    // 置空原来存储的任务集合
    this.setData({
      TaskByCate: []
    })
    // 根据分类id获取对应集合
    this.UpdateTask(1,class_id);
    console.log('class_id: '+class_id);
    
    
  },

  // 初始化
  Start(){
    var that = this;
    wx.showLoading({
      title: '数据加载中..',
    }).then(res=>{
      that.setData({
        userName: app.globalData.userInfo.nickName,
        userImg: app.globalData.userInfo.avatarUrl
      })      
  
      var timeNow = new Date();
      if(6 <= timeNow.getHours() && timeNow.getHours() < 12){
        that.setData({
          JudgeTime: '上午'
        })
      }else if(12 <= timeNow.getHours() && timeNow.getHours() < 19 ){
        that.setData({
          JudgeTime: '下午'
        })
      }else{
        that.setData({
          JudgeTime: '晚上'
        })
      }
      
      wx.request({
        url: indexCate,
        method: 'GET',
        success:back=>{
          console.log(back.data.data);
          that.setData({
            CateList:back.data.data
          })
  
          // 初始化请求数据
          that.UpdateTask();
        }
      }) 
    
    }).then(res=>{
      wx.hideLoading({ })
    })
    
  },

  // 触底更新数据
  UpdateTask(pageN = 1,class_id = 0){
    wx.showLoading({
      title: '加载中..',
    }).then(res=>{

      if(class_id == 0){
        wx.request({
          url: AllTask,
          data: {
            pageNum: pageN
          },
          success: res=>{
            console.log(res.data.data.list);
            var oldData = this.data.TaskByCate;
            var newData = oldData.concat(res.data.data.list);
            // 更改时间格式以及添加背景图
            
            res.data.data.list.forEach(element => {
              var num = Math.floor(Math.random()*14);
              console.log('我是随机数：'+num);
              element.release_time = tools.format(element.release_time,"'yyyy-MM-dd");
              element.backpic = this.data.backPicList[num];
            }); 
            this.setData({
              TaskByCate: newData
            })
          }
        })

      }else{

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
              var num = Math.floor(Math.random()*14);
              console.log('我是随机数：'+num);
              element.backpic = this.data.backPicList[num];
            });  
            this.setData({
              TaskByCate: newData
            })
            
          }
        })


      }

      

    }).then(res=>{
      wx.hideLoading({})
    })
    

  },

  // 去到任务详情页
  // ToTask: function(e){
  //   wx.navigateTo({
  //     url: '/pages/TaskInit/TaskInit',
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    app.getUserInfo().then(res=>{
      // 初始化
      this.Start();
    })
    
    // 刷新完成后停止下拉刷新动效
    wx.stopPullDownRefresh({})
    
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
    
    // app.getUserInfo().then(res=>{
    //   // 初始化
    //   this.Start();
    // })

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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page_num++;
    console.log("class_id: "+class_id);
    
    this.UpdateTask(page_num,class_id);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
