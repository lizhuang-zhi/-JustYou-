// pages/moreTask/moreTask.js
var api = require('../../utils/api')
var TaskToProserve = api.getTaskToProserve()
var tools = require('../../utils/public')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片集合
    fileList:[],

    height: 20,
    focus: false,

    // 任务id
    class_id: "",

    // 用户id
    openid: "",

  },

  // 获取输入内容并提交
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
    // 任务需求内容
    var WordContent = e.detail.value.textarea

    // 获取当前时间
    var getTime = tools.changeTimeFormat(new Date)

    var that = this;
    var promise = new Promise(function(resolve,reject){
      // 获取用户的openid
      wx.cloud.callFunction({
        name:'getUserOpenid',
      })
      .then(back=>{
        // console.log(back.result.openid);
        that.setData({
          openid:back.result.openid
        })
        // Bestopenid = that.data.openid;
        console.log('that.data中的openid：'+that.data.openid);
        resolve('success')
      })

    }).then(res=>{
      
      wx.request({
        url: TaskToProserve,
        data: {
          class_id: that.data.class_id,
          open_id: that.data.openid,
          charge: 0,
          need_number: 3,
          recruiting_number: 3,
          task_comment: 1,
          task_description: WordContent,
          start_time: getTime,
          end_time: "",
          money: "",
          task_title: "无",
          tag: "",
          data: {
            base64: that.data.fileList,
          }
        },
        method: 'POST',
        success: res=>{
          console.log(res);
          
        },
        fail: res=>{
          console.log(res);
          
        }
      })

      
      
    }).then(res=>{
      // 跳转发布成功页面
      wx.navigateTo({
        url: '/pages/succPage/succPage',
      })
      
    })
  },

  
  // 图片上传
  afterRead(event) {
    for(var i = 0 ; i < event.detail.file.length ; i++){
      // 存储图片path到pic对象中
      var pic = {}
      pic.url = event.detail.file[i].path
      // 将新建对象压入数组中
      this.data.fileList.push(pic)
    }
    this.setData({
      fileList: this.data.fileList
    })

    console.log(this.data.fileList);
    
  },

  // 删除指定图片
  deletPic(event){
    console.log("要删除的元素的数组下标为：" + event.detail.index);
    
    // 定义一个新的数组（已删除指定图片）
    this.data.fileList.splice(event.detail.index,1);
    this.setData({
      fileList: this.data.fileList
    })
     
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class_id: options.id
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