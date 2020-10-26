// components/maincardmore/maincardmore.js
let content=''
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
    judge:true,
    lovenum:100,
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
  inputBlur(e) {
    content=e.detail.value
    console.log(content)
    this.setData({
      isInput: false
    })
  },
  focusButn: function () {
    this.setData({
      focusInput: true,
      isInput: true
    })
  },
  // 发表评论
  fabiao(){
    if(content.length<4){
      wx.showToast({
        icon:"none",
        title: '评论太短了'
      })
    return 
    }
  },
    tapMe(){
      if(this.data.judge == true){
        this.setData({
          judge:false,
          lovenum:this.data.lovenum+1
        })
      }else{
        this.setData({
          judge:true,
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
