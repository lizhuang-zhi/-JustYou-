// pages/listline/listline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //时间
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },


    // 文件
    fileList: [],
    //数据
    dataList:[],

    username:'',
    position:'',
    message:'',
    value: '',
    name:''
  },
  // 时间
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  // 上传文件
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      success:res=>{

        res.data.forEach(item => {
          var time=item.posttime*1000
          var d=new Date(time);
          var year=d.getFullYear()
          var month=(d.getMonth()+1)<10? "0" + (d.getMonth()+1) : (d.getMonth()+1)
          var day=d.getDate()<10 ? "0" + d.getDate() :d.getDate()
          var posttime=year+"-"+month+"-"+day
          item.posttime=posttime
        })
        this.setData({
          dataList:res.data
        })
      }
    })

    
    console.log(options.name)
    this.setData({
    name:options.name
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