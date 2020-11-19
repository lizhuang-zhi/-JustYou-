// components/Message/Message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    scentence: String,
    time: String,
    pic: String,
    openid: String

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    Tapme(){
      wx.navigateTo({
        url: '/pages/webSocket/webSocket?otherOpenid='+this.data.openid
      })
    }
  }
})
