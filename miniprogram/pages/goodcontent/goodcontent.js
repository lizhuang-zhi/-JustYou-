import common from '../../utils/public';
// var api = require('../../utils/api');
// var ToDetail = api.getToGoodDetail();
// var addCartsUrl = api.getaddCartsUrl();
// var myStarUrl = api.getmyStarUrl();
// var addStarUrl = api.getaddStarUrl();
// var delStarUrl = api.getdelStarUrl();
// var myLikeUrl = api.getmyLikeUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataList:{},
    openid:'',
    msg:'',
    star:'',
    smallsortId:'',
    myLikeGoodsList:[]  //猜你喜欢商品集合
  },

  // 跳转购物车页面
  onClickCart(){
    wx.navigateTo({
      url: '/pages/goodcarts/goodcarts',
    })
  },

  // 收藏商品
  onClickStar(){
    var that = this;
    if(that.data.star === 'star-o'){
      var promise = new Promise(function(resolve,reject){
        that.setData({
          star:'star'
        })
        // 添加收藏
        wx.request({
          url: '',
          data:{
            openid:that.data.openid,
            id:that.data.id
          },
          success:res=>{
            console.log(res.data);
            resolve('success'); 
          }
        })
      }).then(res=>{
        wx.showToast({
          title: '收藏成功',
        })
      })
      
    }else{
      var promise = new Promise(function(resolve,reject){
        that.setData({
          star:'star-o'
        })
        // 取消收藏
        wx.request({
          url: '',
          data:{
            openid:that.data.openid,
            id:that.data.id
          },
          success:res=>{
            console.log(res.data);
            resolve('success');  
          }
        })
      }).then(res=>{
        wx.showToast({
          title: '取消收藏',
        })
      })
      
    }
    
  },

  // 加入购物车
  AddCart(){
    /*  1.判断用户登录
        2.向后台传入open_id与商品id
        3.在后台判断是否已加购
        ->已加 - 数量加1 || 未加 - 加入此商品 */
    // 查看是否授权
    var those = this;
    wx.getSetting({
      withSubscriptions: true,
      success: function(res){
        console.log(res);
        var that = those;
        
        // 接收授权
        if (res.authSetting['scope.userInfo'] == true) {   
          
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);

              var Mypromise = new Promise(function(resolve,reject){
                wx.request({
                  url: '',
                  data:{
                    id:that.data.id,
                    openid:that.data.openid
                  },
                  success:res=>{
                    console.log(res.data.msg);
                    that.setData({
                      msg:res.data.msg
                    })
                    resolve('success');  // 要写这一块
                   
                  }
                })
              }).then(res=>{
                wx.showToast({
                  title: that.data.msg,
                })
              }).catch(res=>{
                console.log(res);
                
              })
            }
          })
            
        }else if(res.authSetting['scope.userInfo'] === false){  //拒绝授权
          console.log('拒绝授权');
        }
      }
    })
  },

  // 初始化请求数据
  Start(){
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
        resolve('success');
      })

    }).then(res=>{
      
      return new Promise((resolve,reject)=>{

        // 请求收藏数据
        wx.request({
          url: '',
          data:{
            openid:this.data.openid,
            id:this.data.id
          },
          success:res=>{
            console.log(res.data);
            if(res.data.flag === true){  //已收藏
              this.setData({
                star:'star'
              })
            }else{
              this.setData({
                star:'star-o'
              })
            }
            resolve('第一个then结尾')
            
          }
        });

      })

    }).then(res=>{ 
      
      return new Promise((resolve,reject)=>{
          // 请求基础数据
          wx.request({
            url: ToDetail,
            data:{
              id:this.data.id
            },
            success:res=>{
              console.log(res.data);
              // 限制介绍长度
              res.data.goodTitInfo = common.getStrLen(res.data.goodTitInfo,23,23);
      
              this.setData({
                dataList:res.data,
                smallsortId:res.data.smallsortId
              })
              resolve('第二个then结尾')
            }
          });
      })
      
    }).then(res=>{
      return new Promise((resolve,reject)=>{
        // 请求猜你喜欢商品集合
        wx.request({
          url: '',
          data:{
            smallsortId:this.data.smallsortId,
            id:this.data.id
          },
          success:res=>{
            console.log(res.data);
            this.setData({
              myLikeGoodsList:res.data
            })
            resolve('第三个then结尾')
          }
        }); 
      })

    }).then(res=>{  
      wx.hideLoading({})
    })
  },

  // 点击猜你喜欢
  ToDetailByLike(back){
    wx.navigateTo({
      url: '/pages/goodcontent/goodcontent?id='+back.currentTarget.dataset.id,
      success:res=>{
        console.log(res);
      }
    })
  },

  // 立即购买
  onClickButtonToBuy(){
    wx.navigateTo({
      url: '/pages/goodsettle/goodsettle?id='+this.data.id,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中..',
    })
    this.setData({
      id:options.id
    })
    // 初始化数据
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