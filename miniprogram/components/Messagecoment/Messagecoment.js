// components/Messagecoment/Messagecoment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
        url: '/pages/maincardmore/maincardmore',
      })
    },
    Tapother(){
      wx.reLaunch({
        url: '/pages/user/user',
      })
    }
  }
})
