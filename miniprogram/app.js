//app.js

App({

  globalData: { 
    openid: null,
    token: '', 
    userInfo: null
  }, 
  
  onLaunch: function () {
    // var that = this;
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // 初始化用户openid
    // this.getUserInfo()

  },

  onShow (options) {
    

  },

  onHide () {
    
  },

  onUnhandledRejection(options){
    console.log(options);
    

  },

  // 获取用户信息 与 openid
  getUserInfo: function(cb) {
    var that = this
    // 使用Promise完成同步！！
    return new Promise(function(resolve,reject){

      if (that.globalData.userInfo) {
          typeof cb == "function" && cb(that.globalData.userInfo)
      } else {
          //调用登录接口
          wx.login({
              success: function (res) {
                // console.log(res);
                var code = res.code
                
                // 获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res.userInfo);
                    
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                    
                    wx.request({
                      //获取openid接口
                      url: 'https://mrkleo.top/justyou/publish/getKey?js_code='+code,
                      data: {},
                      method: 'GET',
                      success: function (res) {
                        console.log('app.js中的返回的openid： '+res.data.openid)
                        that.globalData.openid = res.data.openid
                        resolve('success')

                      },
                      fail: res => {
                        console.log(res);
                        reject('error')
                        
                      }
                        
                    })  
                  }

              })

                  
            },
          })
      }


    })
    
      
  },

  
})
