// components/Taskbar/Taskbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:String,
    looks:String,
    category:String,
    title:String,
    picture:String,
    task_id:String,

    // 任务对象
    takObj:Object


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
    // 跳转到任务详情页
    ToDetailTask: function(e){
      console.log(this.data.takObj);
      // 将任务对象转化为Json字符串
      var obj = JSON.stringify(this.data.takObj);
      
      wx.navigateTo({
        url: '/pages/TaskInit/TaskInit?obj='+encodeURIComponent(obj),
      })
    }

  }
})
