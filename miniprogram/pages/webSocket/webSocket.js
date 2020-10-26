// pages/webSocket/webSocket.js
var tools = require('../../utils/public');
const app = getApp();
var websock = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    input:null,
    openid:null


  },

  // WebSocket测试
  test(){
    let socketOpen = false
    let socketMsgQueue = []
    wx.connectSocket({
      url: 'wss://mrkleo.top/justyou/websocket/1233/2345',
      success:res=>{
        console.log(res);
        
      },
      fail:back=>{
        console.log(back);
        
      }
    })

    wx.onSocketOpen(function(res) {
      socketOpen = true
      console.log(res+"我是李大爷");
      sendSocketMessage('我是阿壮');
      
      for (let i = 0; i < socketMsgQueue.length; i++){
        sendSocketMessage(socketMsgQueue[i])
        console.log("测试： "+socketMsgQueue[i]);
        
      }
      socketMsgQueue = []
    })

    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data:msg,
          success:res=>{
            console.log(res);
            
          },
          fail:back=>{
            console.log(back);
            
          }
          
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
  },

  


  

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // this.test();
    

    var that = this;
    var _this = this;

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
      // wx.getStorage({
      //   key: 'OPENID',
      //   success: function(res) {
      //     _this.setData({
      //       openid:res.data
      //     })
      //     console.log("我是wx.getStore中成功的回调："+res.data);
          
      //   },
      // })
      var _this = this;
      //建立连接
      // wss://mrkleo.top/justyou/websocket/1233/2345
      wx.connectSocket({
        // url: "wss://mrkleo.top/justyou/websocket/"+_this.data.openid+"/"+"ohNiv4nVNsdHsSHQK6A1kFtWVjX8",
        url: "wss://mrkleo.top/justyou/websocket/"+this.data.openid+"/"+options.id,
        success:res=>{
          console.log(res);
        }
      })
      
      //连接成功
      wx.onSocketOpen(function () {
        console.log('连接成功');

        
        // wx.closeSocket({
        //   success:res=>{
        //     console.log("我是在连接成功中调用的关闭");
            
        //   }
        // })
        
        
        
      })

      // 监听关闭事件
      wx.onSocketClose(function(res){
        console.log("断开连接");
        
      })

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
    var _this = this;

    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(function(res){   
          
      var list = [];
      list = _this.data.newsList;
      // var _data = JSON.parse(res.data);
      console.log("服务器返回的消息："+res.data);

      var list = [];
      list = _this.data.newsList;
      var temp = { 
        'message': res.data,
        'date': "2012",
        type: 0
      };
      list.push(temp);
      _this.setData({
        newsList:list,
        input:null
      })
      
      // list.push(_data);
      // console.log("用户的输入为: "+list[0].message);
      // _this.setData({
      //   newsList:list
      // })

    })
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
    console.log('我退出页面了');
    
    


    
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

  },


  send :function(){
    var _this = this;
    var myDate = new Date();
    var finDate = myDate.getMonth()+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes();
    if(_this.data.input){
      wx.sendSocketMessage({
        data: _this.data.input,
      })
      var list = [];
      list = this.data.newsList;
      var temp = { 
        'message': _this.data.input,
        'date': finDate,
        type: 1
      };
      list.push(temp);
      this.setData({
        newsList:list,
        input:null
      })
    }
    
  },
  bindChange:function(res){
    this.setData({
      input: res.detail.value
    })
  },
  back:function(){
    wx.closeSocket();
    console.log('连接断开');
  }

})





