// components/maincard/maincard.js
var api = require('../../utils/api');
var giveALike = api.getgiveALike();
var followPerson = api.getfollowPerson()
var cancelfolPer = api.getcancelfolPer()
var CancelGiveLike = api.getCancelGiveLike()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:{
			type:[],
			value:""
    },
    txt:{
      type:String,
			value:""
    },
    time:{
      type:String,
			value:""
    },
    username:{
      type:String,
      value:''
    },
    userimg:{
      type:String,
      value:''
    },
    looksNum:{
      type:String,
      value:''
    },
    lovenum:{
      type:Number,
      value:''
    },
    dynamic_id:{
      type:String,
      value:''
    },
    // 点赞判断
    judge:{
      type:Boolean,
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:'',
    show: false,
    actions: [
      {
        name: '私聊',
      },
      {
        name: '关注',
      },
      {
        name: '分享',
        subname: '给好友',
        openType: 'share',
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    GiveLove(){
      if(this.data.judge == false){
        console.log(this.data.dynamic_id);
        
        // 点赞
        wx.request({
          url: giveALike,
          data: {
            dynamic_id: this.data.dynamic_id,
            openId: "vx001"
          },
          success: res=>{
            console.log(res.data.message);
            
          },
          fail: res=>{
            console.log(res);
            
          }
        })

        this.setData({
          judge:true,
          lovenum:this.data.lovenum+1,
        })
      }else{

        // 取消点赞
        wx.request({
          url: CancelGiveLike,
          data: {
            dynamic_id: this.data.dynamic_id,
            openId: "vx001"
          },
          success: res=>{
            console.log(res.data.message);

          },
          fail: res=>{
            console.log(res);
            
          }
        })

        this.setData({
          judge:false,
          lovenum:this.data.lovenum-1,
        })
      }
    },

    // 关注与私聊
    onClick(){
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
  
    // 关注与私聊->选中时触发
    onSelect(event) {
      console.log(event.detail.name);
      // 关注与取消关注
      if(event.detail.name == '关注'){
        wx.request({
          url: followPerson,
          data: {
            MyOpenId: "我的openid",
            HeOpenId: "关注人的openid"
          },
          success: res=>{
            console.log(res);
            
          }
        })

        wx.showToast({
          title: '关注成功',
        })
        this.data.actions[1].name = "已关注"

        this.setData({
          actions: this.data.actions
        })

      }else{

        wx.request({
          url: cancelfolPer,
          data: {
            MyOpenId: "我的openid",
            HeOpenId: "关注人的openid"
          },
          success: res=>{
            console.log(res);
            
          }
        })

        wx.showToast({
          title: '取消关注',
          icon: 'none'
        })

        this.data.actions[1].name = "关注"

        this.setData({
          actions: this.data.actions
        })
      }
      
      
    },

    // 点击内容事件
    init(){
      wx.navigateTo({
        url: '/pages/maincardmore/maincardmore?dynamicId='+this.data.dynamic_id,
      })
    },
    
    // 点击头像事件
    ToAboutUser(){
      wx.navigateTo({
        url: '/pages/attent/attent',
      })
    }
  
  }
})
