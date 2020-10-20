// pages/map/map.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ],

    // 具体信息
    show: false,
    actions: [
      {
        name: '不选择',
      },
      {
        name: '高温',
      },
      {
        name: '雨雪天',
      }
    ],

    // 弹出
    Popshow:false,

    // 选择器
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
 
  },

  // 查看详情
  CheckContent(){
    Dialog.alert({
      title: '通知公告',
      message: '各位同学发布任务一定要上传取件码，发布任务后，我们会尽快小伙伴配送',
    }).then(() => {
      // on close
    });
  },

  // 图片上传
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },

  // 具体信息
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },

  // 选择商品重量点击事件
  SelectTianQi(){
    this.setData({
      show:true
    })
  },

  // 弹出层
  showPopup() {
    this.setData({ Popshow: true });
  },

  PoponClose() {
    this.setData({ Popshow: false });
  },

  // 去备注页面
  ToExpressNotes(){
    wx.navigateTo({
      url: '/pages/Expressnotes/Expressnotes',
    })
  },

  // 选择器
  PickeronChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },

  


  chaKan: function (e) {
      wx.openLocation({
        latitude: 31.38475,
        longitude: 120.98181,
      })
  },

  // 选择位置事件
  xuanZe: function (e) {
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
      }
    })
  },
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前位置
    wx.getLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
        
      }
    })

    
  },
 
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    // this.mapCtx = wx.createMapContext('myMap')
    // this.mapCtx = wx.createMapContext('map');
    // this.moveToLocation();
  },
 
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function(res){
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  // translateMarker: function() {
  //   this.mapCtx.translateMarker({
  //     markerId: 0,
  //     autoRotate: true,
  //     duration: 1000,
  //     destination: {
  //       latitude:23.10229,
  //       longitude:113.3345211,
  //     },
  //     animationEnd() {
  //       console.log('animation end')
  //     }
  //   })
  // },
  // includePoints: function() {
  //   this.mapCtx.includePoints({
  //     padding: [10],
  //     points: [{
  //       latitude:23.10229,
  //       longitude:113.3345211,
  //     }, {
  //       latitude:23.00229,
  //       longitude:113.3345211,
  //     }]
  //   })
  // }
 
 
})