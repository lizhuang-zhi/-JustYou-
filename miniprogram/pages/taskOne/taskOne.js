// pages/taskOne/taskOne.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    getSorts:'',

    // 时间
    Timeshow: false,
    getTime:'',
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 10, 24).getTime(),
    maxDate: new Date(2023, 10, 24).getTime(),
    currentDate: new Date().getTime(),
    

    // 性别选择
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    isSex:"0",

    // 人数选择
    getPeopleCount:'',
    peoCount: false,
    Peocolumns: ['1', '2', '3', '4', '5','6'],

    // textarea
    hidJudge:false,
    
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
  PeoCountChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Start();
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