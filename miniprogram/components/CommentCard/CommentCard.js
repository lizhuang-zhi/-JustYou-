// components/CommentCard/CommentCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userImg: String,
    username: String,
    realseTime: String,
    Num: String,
    txt: String

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
    tapMe(){
      wx.navigateTo({
        url: '/pages/user/user',
      })
    }
  }
})
