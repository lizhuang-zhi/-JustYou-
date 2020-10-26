// components/Album/Album.js
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
    avatarUrl:null,
    pictures: [ 'https://s1.ax1x.com/2020/10/01/0KfnfJ.jpg',
    'https://s1.ax1x.com/2020/10/01/0KfmY4.jpg',
    'https://s1.ax1x.com/2020/10/01/0KfEwT.jpg',
    'https://s1.ax1x.com/2020/10/01/0KfAmV.jpg',
    'https://s1.ax1x.com/2020/10/01/0KfFO0.jpg',
    'https://s1.ax1x.com/2020/10/17/0qHgFf.jpg',
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindViewTap:function(){
      var that = this;
      wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
       count: 1, 
       sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
       sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
       success: function(res){
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
        //将临时变量赋值给已经在data中定义好的变量
         avatarUrl:tempFilePaths
        })
       },
       fail: function(res) {
        // fail
       },
       complete: function(res) {
        // complete
       }
      })
     },
    previewImage: function(e){
      var that = this,
      //获取当前图片的下表
        index = e.currentTarget.dataset.index,
        //数据源
        pictures = this.data.pictures;
      wx.previewImage({
      //当前显示下表
       current: pictures[index],
       //数据源
       urls: pictures
      })
     },
    imgYu:function(event){
      var src = event.currentTarget.dataset.src;//获取data-src
      var imgList = event.currentTarget.dataset.list;//获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
   }
  }
})
