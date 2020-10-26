// pages/demo2/demo2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    isSex:"0",
    information:[],
    userSex:'',
    modalHidden:true
  },
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
  },
 
  //表单提交
  formSubmit(e){
    console.log(e);
    var userSex=this.data.isSex==0?'男':'女';
    var information= e.detail.value;
    console.log(userSex);
    this.setData({
      information: e.detail.value,
      userSex,
      modalHidden:false
    });
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
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