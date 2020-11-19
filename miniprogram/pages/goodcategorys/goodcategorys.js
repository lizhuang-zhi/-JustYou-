import common from '../../utils/public';
// var api = require('../../utils/api');
// var bigSortsurl = api.getbigSortsurl();
// var smallSortsurl = api.getsmallSortsurl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    items:[
      {id: 1, bigsortDescription: "科技数码分类", text: "数码"},
      {id: 2, bigsortDescription: "各类书籍", text: "书籍"},
      {id: 3, bigsortDescription: "各类潮鞋", text: "潮鞋"}
    ],
    smallSortsList:[
      {id:1,smallsortName:'手机',smallsortDescription:'拥抱未来'},
      {id:2,smallsortName:'电脑',smallsortDescription:'拥抱未来'},
      {id:3,smallsortName:'照相机',smallsortDescription:'拥抱未来'},
      {id:4,smallsortName:'风衣',smallsortDescription:'拥抱未来'}

    ]
  },

  // 左侧导航点击事件 
  // event.detail.index：被点击的导航的索引
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
    console.log("mainActiveIndex: "+this.data.mainActiveIndex);

    // 通过大分类id请求小分类
    this.getSmallSortsList(this.data.mainActiveIndex+1);

  },

  // 根据大分类id请求小分类集合
  getSmallSortsList(index){
    wx.request({
      url: '',
      data:{
        id:index
      },
      success:res=>{
        console.log(res.data);

        this.setData({
          smallSortsList:res.data
        })
        
      }
    })
  },

  // 去小分类页面
  ToSmallCate(){
    wx.navigateTo({
      url: '/pages/goodsmallcate/goodsmallcate',
    })
  },
  
  // // 右侧导航点击事件
  // // event.detail: 该点击项的数据
  // onClickItem({ detail = {} }) {
  //   console.log("点击右侧: "+detail);
  //   const activeId = this.data.activeId === detail.id ? null : detail.id;
    
  //   this.setData({ activeId });
    
  // },


  // 大分类跳小分类
  ToSmallCate(back){
    console.log(back);
    
    wx.navigateTo({
      url: '/pages/goodsmallcate/goodsmallcate?id='+back.currentTarget.dataset.id+'&smallsortName='+back.currentTarget.dataset.smallsortname+'&smallsortDescription='+back.currentTarget.dataset.smallsortdescription,
    })
  },

  // 初始化大分类数据
  Start(){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: '',
      success:res=>{
        console.log(res.data);
       
        // 更改请求数据中对象的'键名'
        res.data.forEach(obj => 
          common.renameKey(obj, 'bigsortName', 'text'));

        this.setData({
          items:res.data
        })
      }
    })

    setTimeout(()=>{
      wx.hideLoading({})
    },1000)
    
  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化大分类
    this.Start();
    // 初始化小分类
    this.getSmallSortsList(1);

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