import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
// var api = require('../../utils/api');
// var allCartsUrl = api.getallCartsUrl();
// var cartGoodsNumChangeUrl = api.getcartGoodsNumChangeUrl();
// var delGoodsUrl = api.getdelGoodsUrl();
var total = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    goodsList:[],
    totalPrice:0,
    empty:false
  },

  // 初始化购物车
  Start(){
    var that = this;
    
    var promise = new Promise(function(resolve,reject){
      wx.showLoading({
        title: '玩命加载中..',
      })
      // 获取用户的openid
      wx.cloud.callFunction({
        name:'getUserOpenid',
      })
      .then(back=>{
        that.setData({
          openid:back.result.openid
        })
        console.log('that.data中的openid：'+that.data.openid);
        resolve('success');
        
      });
    }).then(res=>{
        wx.request({
          url: '',
          data:{
            openid:this.data.openid
          },
          success:res=>{
            console.log(res.data);
            if(res.data == ""){
              this.setData({
                empty:true
              })
            }
            total = 0;
            // 计算购物车商品总价格
            res.data.forEach(item=>{
              total += item.goodNum * item.goodPrice
            })
            this.setData({
              goodsList:res.data,
              totalPrice:total
            })
          }
        });
    }).then(res=>{
      wx.hideLoading({})
    });
    
  },

  // 改变购物车商品数量
  onChangeNum(back){
    console.log(back.currentTarget.dataset.id);
    
    wx.request({
      url: cartGoodsNumChangeUrl,
      data:{
        goodsNum:back.detail,
        goodsId:back.currentTarget.dataset.id,
        userOpenid:this.data.openid
      },
      success:res=>{
        console.log(res);
        this.Start();
        
      }
    })
  },

  // 删除订单
  delGoodsCart(back){

    Dialog.confirm({
      title: '消息确认',
      message: '你确定要将此商品移除购物车吗？',
    })
    .then(() => {
      // on confirm
      wx.request({
        url: '',
        data:{
          id:back.currentTarget.dataset.id,
          openid:this.data.openid
        },
        success:res=>{
          console.log(res.data);
          // 再次渲染页面
          this.Start();
        }
      })
    })
    .catch(() => {
      // on cancel
      console.log('取消移除');
      
    });

  },

  //立即购买
  goToBuy(back){
    wx.navigateTo({
      url: '/pages/goodsettle/goodsettle?id='+back.currentTarget.dataset.id,
    })

  },

  // 提交订单
  onSubmit(){
    var that = this;
    // 购物车为空
    if(this.data.empty === true){
      wx.showToast({
        title: '您还没有添加宝贝诶~',
        icon:'none'
      })

    }else{
      wx.navigateTo({
        url: '/pages/goodsettle/goodsettle',
      })
    }
    
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