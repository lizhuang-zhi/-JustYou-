// pages/pageFill/pageFill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    show: false,
    sortsShow: false,
    actions: [
      {
        name: '背单词',
      },
      {
        name: '试卷测试',
      },
      {
        name: '英语听力',
      },
      {
        name: '看书',
      },
      {
        name: '运动',
      },
      {
        name: '进餐',
      },
      {
        name: '其他',
      },
    ],
  },

  // 点击展示任务分类
  sortsTap(){
    this.setData({
      sortsShow:true
    })
  },
  //任务分类
  sortsSelect(res){
    console.log(res.detail.name);
    this.setData({
      getSorts:res.detail.name
    })
    
  },
  sortsClose(){
    this.setData({
      sortsShow:false
    })
  },

  // 日历
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },


  // 分类选择
  CategoryonClose() {
    this.setData({ show: false });
  },

  CategoryonSelect(event) {
    console.log(event.detail);
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