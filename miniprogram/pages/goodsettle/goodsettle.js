var api = require('../../utils/api');
// var allCartsUrl = api.getallCartsUrl();
// var toPayUrl = api.gettoPayUrl();
// var singleGoodUrl = api.getsingleGoodUrl();
// var CartGoodUrl = api.getCartGoodUrl();
var total = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    goodsList:[],
    totalPrice:0,
    show: false,
    id:'',
    goodobject:{}
  },


  // 初始化购物车
  Start(){  var that = this;
    
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
            total = 0;
            // 计算购物车商品总价格
            res.data.forEach(item=>{
              total += item.goodNum * item.goodPrice
            });
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

  // 初始化立即支付(传入了某件商品id)
  StartByGoodsId(){

    // 请求基础数据
    wx.request({
      url: toPayUrl,
      data:{
        id:this.data.id
      },
      success:res=>{
        console.log(res.data);
        total = 0;
        // 商品未加入购物车，直接立即支付
        if(res.data.goodNum == null){  
          total = res.data.goodPrice * 1;
        }else{
          total = res.data.goodNum * res.data.goodPrice;
        }

        this.setData({
          goodobject:res.data,
          totalPrice:total
        })
      }
    });

  },

  // 确认支付 --> 弹出支付二维码
  onClickButton(){
    this.setData({ show: true });
    var that = this;


    var promise = new Promise(function(resolve,reject){
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
      if(this.data.id != ""){
        wx.request({
          url: singleGoodUrl,
          data:{
            id:this.data.id,
            openid:this.data.openid,
            totalPrice:this.data.totalPrice

          },
          success:res=>{
            console.log(res);
          }
        })
      }else{
        wx.request({
          url: CartGoodUrl,
          data:{
            openid:this.data.openid,
            totalPrice:this.data.totalPrice
          },
          success:res=>{
            console.log(res);
          }
        })
      }

    })

    
  },

  // 隐藏二维码
  onClickHide() {
    this.setData({ show: false });
  },

  noop() {},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果页面未接收到商品id参数
    if(options.id == null){
      this.Start();
    }else{
      this.setData({
        id:options.id
      })
      this.StartByGoodsId();
    }

    

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