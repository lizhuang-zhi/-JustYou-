// components/maincard/maincard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:{
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
    username:{
      type:String,
      value:''
    },
    userimg:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:'',
    judge:true,
    lovenum:0,
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
    tapMe(){
      if(this.data.judge == true){
        this.setData({
          judge:false,
          lovenum:this.data.lovenum+1,
        })
      }else{
        this.setData({
          judge:true,
          lovenum:this.data.lovenum-1,
        })
      }
    },
    onClick(){
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
  
    onSelect(event) {
      console.log(event.detail);
    },
    // 点击内容事件
    init(){
      wx.navigateTo({
        url: '/pages/maincardmore/maincardmore?value=input',
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
