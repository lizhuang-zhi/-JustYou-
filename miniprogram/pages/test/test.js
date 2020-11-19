// pages/map/map.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var api = require('../../utils/api')
var TaskToProserve = api.getTaskToProserve()
var tools = require('../../utils/public')
var app = getApp();
// 收费分类
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 图片集合
    fileList: [],

    // 天气信息
    show: false,
    actions: [
      {
        name: '不选择',
      },
      {
        name: '高温',
      },
      {
        name: '雨雪天',
      }
    ],
    getWeather:"",

    // 物品重量弹出
    Popshow:false,

    // 取件数量弹出
    PopshowNum:false,

    //物品数量选择器
    Numcolumns: ['1件', '2件', '3件', '4件', '5件'],
    getNum:"",

    // 物品重量选择器
    columns: ['1kg', '2kg', '3kg', '4kg', '5kg'],
    getWeight:"",

    // 留言内容
    StaySentence:"",

    // 取件地址
    GetAddress:null,

    // 收货地址
    ShippingAddress:null,

    // 用户id
    openid:"",

    // 任务id
    class_id: ""
 
  },

  // 查看详情
  CheckContent(){
    Dialog.alert({
      title: '通知公告',
      message: '各位同学发布任务一定要上传取件码，发布任务后，我们会尽快小伙伴配送',
    }).then(() => {
      // on close
    });
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

  // 关闭天气服务
  onClose() {
    this.setData({ 
      show: false
    });
  },

  // 选择天气服务
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      getWeather:event.detail.name
    })
  },

  // 选择商品重量点击事件
  SelectTianQi(){
    this.setData({
      show:true
    })
  },

  // 物品重量弹出层
  showPopup() {
    this.setData({ Popshow: true });
  },
  PoponClose() {
    this.setData({ Popshow: false });
  },

  // 取件数量弹出层
  showPopupNum() {
    this.setData({ PopshowNum: true });
  },
  PoponCloseNum() {
    this.setData({ PopshowNum: false });
  },

  // 物品重量选择器
  PickeronChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前选择：${value}`);
  },

  // 取件数量选择器
  PickeronChangeNum(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前选择：${value}`);
  },

  // 常用地址填写页面
  ToGetUsualAddress(){
    wx.navigateTo({
      url: '/pages/userAddress/userAddress',
    })
  },

  // 物品重量取消时间
  cancelEvent(){
    this.setData({ Popshow: false });
  },

  // 物品重量确定时间
  confirmEvent(event){
    console.log(event.detail.value);
    
    this.setData({ 
      Popshow: false,
      getWeight: event.detail.value

     });
  },

  // 取件数量取消时间
  cancelEventNum(){
    this.setData({ PopshowNum: false });
  },

  // 取件数量确定时间
  confirmEventNum(event){
    console.log(event.detail.value);
    
    this.setData({ 
      PopshowNum: false,
      getNum: event.detail.value

     });
  },


  // 选择送货位置事件
  xuanZe_Get: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        var strAddress = tools.getStrLen(res.address,17,18)
        that.setData({
          GetAddress: strAddress
        })
      }
    })
  },

  // 选择收货位置事件
  xuanZe_Ship: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        var strAddress = tools.getStrLen(res.address,17,18)
        that.setData({
          ShippingAddress: strAddress
        })
      }
    })
  },
  
  // 初始化获取地址位置
  Start(){
    var that = this;
    //获取当前位置
    wx.getLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
        
      }
    })
  },

  // 留言失去焦点时间
  BlurWords(event){
    this.setData({
      StaySentence: event.detail.value 
    })
  },

  // 提交快递
  Release(){
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
          need_number: 1,
          recruiting_number: 3,
          task_comment: 1,
          task_description: that.data.StaySentence,
          start_time: getTime,
          end_time: "",
          money: 30,
          task_title: "代取快递",
          tag: "",
          data: {
            base64: that.data.fileList,
            firstAddress: that.data.GetAddress,
            lastAddress: that.data.ShippingAddress,
            weight: that.data.getWeight,
            number: that.data.getNum,
            weather: that.data.getWeather
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
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class_id: options.id
    })


    // 初始化位置信息
    this.Start();

    
  },
 
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  onReady: function (e) {
    
  },
 
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
 
 
})