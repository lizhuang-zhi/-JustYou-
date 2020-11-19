// pages/taskOne/taskOne.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var api = require('../../utils/api')
var tools = require('../../utils/public')
var TaskToProserve = api.getTaskToProserve()
var AllTag = api.getAllTag()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片上传集合
    fileList: [],

    // 标题分类
    sortsShowTopic: false,
    actionsTopic: [],
    // 获取标题的值
    getSortsTopic:'',
    

    // 分类
    sortsShow: false,
    actions: [
      {
        name: 'JAVA',
      },
      {
        name: '高数',
      },
      {
        name: '英语',
      },
      {
        name: '线代',
      },
      {
        name: 'Linux',
      },
      {
        name: '政治',
      },
    ],
    // 获取分类的值
    getSorts:'',

    // 时间
    Timeshow: false,
    getTime:'',

    // 标题值
    dataValueTopic:'',

    // 标签值
    dataValue:'',

    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 10, 24).getTime(),
    maxDate: new Date(2023, 10, 24).getTime(),
    currentDate: new Date().getTime(),
    

    // 性别选择
    sex:[
      {name:'1',value:'男',checked:'true'},
      {name:'0',value:'女'}
    ],
    isSex:"0",

    // 人数选择
    // 人数
    PeoNum:'不限人数',
    peoCount: false,
    Peocolumns: ['1', '2', '3', '4', '5','6','不限人数'],

    // textarea
    hidJudge:false,

    // 搜索地址名称
    searchAddress:"",
    // 搜索地址详情
    searchAddressDetail:"",

    // QQ号的输入值
    dataValue_2:"",

    // 备注值
    StayValue:"",

    // 任务id
    class_id:"",

    // 用户id
    openid:"",

    
    
  },

  // 标题输入失去焦点事件
  LostFocusTopic(event){
    this.setData({
      dataValueTopic: event.detail.value
    })
  },

  // 上传图片
  afterRead(event) {
    // console.log(event.detail);
    
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

  // 点击展示标签分类
  sortsTapTopic(){
    this.setData({
      sortsShowTopic:true,
      hidJudgeTopic:true
    })
  },
  //标签分类
  sortsSelectTopic(res){
    console.log(res.detail.name);
    this.setData({
      getSortsTopic:res.detail.name
    })
    
  },
  sortsCloseTopic(){
    this.setData({
      sortsShowTopic:false,
      hidJudgeTopic:false
    })
  },


  // 点击展示学习分类
  sortsTap(){
    this.setData({
      sortsShow:true,
      hidJudge:true
    })
  },
  //学习分类
  sortsSelect(res){
    console.log(res.detail.name);
    this.setData({
      getSorts:res.detail.name
    })
    
  },
  sortsClose(){
    this.setData({
      sortsShow:false,
      hidJudge:false
    })
  },

  // 时间选择的pop
  TimePopup() {
    this.setData({ 
      Timeshow: true,
      hidJudge:true
    });
  },
  TimeClose() {
    this.setData({ 
      Timeshow: false,
      hidJudge:false 
    });
  },

  // 时间选择的picker
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  // 时间选择点击完成
  TapConfirm(event){
    // event.detail 为毫秒时间戳
    this.setData({
      getTime: tools.getMyData(event.detail,"Y-m-d H:i",2),
      Timeshow: false,
      hidJudge: false 
    })
  },

  // 时间选择点击取消
  CanelChose(){
    this.setData({
      Timeshow: false,
      hidJudge: false 
    })
  },


  // 性别选择
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
  },


  // 人数选择
  PeopelCountOpen(){
    this.setData({ 
      peoCount: true,
      hidJudge:true
   });
  },
  PeopelCountClose() {
    this.setData({ 
      peoCount: false,
      hidJudge:false
    });
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
          latitude: res.latitude
        })
        
      }
    })

    // 获取标签
    wx.request({
      url: AllTag,
      method: 'POST',
      success: res=>{
        console.log(res.data.data.list);
        var arr = res.data.data.list
        // 将回调的对象数组中的tagName属性名改为name
        arr = JSON.parse(JSON.stringify(arr).replace(/tagName/g,'name'))
        this.setData({
          actionsTopic: arr
        })
        
      }
    })


  },

  // 选择位置事件
  xuanZe: function (e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          searchAddressDetail: res.address
        })
      }
    })
  },


  // 特别备注失去焦点事件
  StayWordBlur(event){
    this.setData({
      StayValue: event.detail.value
    })

  },


  // 发布
  release(){
    var that = this;
    that.data.fileList = tools.PicListBackBase64(that.data.fileList)

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
          need_number: that.data.PeoNum,
          recruiting_number: 3,
          task_comment: 1,
          task_description: that.data.StayValue,
          start_time: that.data.getTime,
          end_time: "",
          money: "",
          task_title: that.data.dataValueTopic,
          tag: that.data.getSortsTopic,
          data: {
            base64: that.data.fileList,
            address: that.data.searchAddressDetail
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

  // 人数选择确定
  confirmEvent(event){
    console.log(event.detail.value);
    this.setData({
      PeoNum: event.detail.value,
      peoCount: false,
      hidJudge: false
    })
    
  },

  // 人数选择取消
  cancelEvent(){
    this.setData({ 
      peoCount: false,
      hidJudge:false
    });
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var pro = new Promise(function(resolve,reject){
      that.setData({
        class_id: options.id
      })
      resolve('success')

    }).then(res=>{
      that.Start();
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