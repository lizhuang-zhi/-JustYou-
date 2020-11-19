// components/maincardmore/maincardmore.js
let content=''
var api = require('../../utils/api')
var comment = api.getcomment()
var giveALike = api.getgiveALike();
var CancelGiveLike = api.getCancelGiveLike()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagel:{
			type:String,
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
    userid:{
      type:String,
      value:''
    },
    userimg:{
      type:String,
      value:''
    },
    lovenum:{
      type:Number,
      value:''
    },
    looksNum:{
      type:Number,
      value:''
    },
    image:{
			type:[],
			value:""
    },
    dynamicId: String,
    // 判断是否点赞
    judge: Boolean
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    focusInput: false,
    height: '',
    isInput: false,
    atten:"关注",
    at:true,
    light:true,
    // 发布内容
    ContentWords:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
    // 输入框
    inputFocus(e) {
      console.log(e, '键盘弹起')
      this.setData({
        height: e.detail.height,
        isInput: true
      })
    },

    // 输入框失去焦点
    inputBlur(e) {
      content=e.detail.value
      console.log('发布的评论文字：'+content)
      this.setData({
        isInput: false,
        ContentWords: content
      })
    },

    // 点击 “评论” 弹出输入框
    focusButn: function () {
      this.setData({
        focusInput: true,
        isInput: true
      })
    },

    // 发表评论
    SendComment(e){
      console.log(e);
      
      var that = this

      var promise = new Promise(function(resolve,reject){
        // 发表评论
        wx.request({
          url: comment,
          data: {
            dynamic_id: that.data.dynamicId,
            open_id: 'vx002',
            comm_father_id: 0,
            content: that.data.ContentWords
          },
          success: res=>{
            console.log(res.data.message);
            resolve('success')
          }
        })


      }).then(res=>{
        // 置空输入框
        that.setData({
          ContentWords: ''
        })

      })

      // 传递点击事件
      this.triggerEvent("UpdateComment",{ "dynamic_id": that.data.dynamicId })

    },

    // 点赞
    tapLike(){
      if(this.data.judge == false){

        // 点赞
        wx.request({
          url: giveALike,
          data: {
            dynamic_id: this.data.dynamicId,
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
          lovenum:this.data.lovenum+1
        })
      }else{

        // 取消点赞
        wx.request({
          url: CancelGiveLike,
          data: {
            dynamic_id: this.data.dynamicId,
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
          lovenum:this.data.lovenum-1
        })
      }
    },

    onClick(){
      if(this.data.at == true){
        this.setData({
          at:false,
          atten:"已关注",
        })
      }else{
        this.setData({
          at:true,
          atten:"关注",
        })
      }
    },

    // 点击收藏
    Tapstart(){
      
      if(this.data.light == true){
        this.setData({
          light:false,
        })
      }else{
        this.setData({
          light:true,
        })
      }
    },

  }
})
