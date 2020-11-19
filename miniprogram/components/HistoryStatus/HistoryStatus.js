// components/HistoryStatus/HistoryStatus.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userImg:String,
    Tag:String,
    Content:String,
    Time:String,

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
    ClickMe(){
      wx.navigateTo({
        url: '/pages/TaskInit/TaskInit',
      })
    }
  }
})
