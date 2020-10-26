// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
let chart = null;
// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
   
    series : [
      {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          roseType: 'angle',
          data:[
              {value:235, name:'视频广告23323'},
              {value:235, name:'联盟广告'},
              {value:235, name:'邮件营销'},
              {value:235, name:'直接访问'},
              {value:235, name:'搜索引擎'}
          ]
      }
  ]
    
  };    
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donghua:'',
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },

  click(){
    var option = chart.getOption();
    option.series[0].data[0].value++;
    console.log(option.series[0].data);
    chart.setOption(option);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart);
    }, 2000);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})