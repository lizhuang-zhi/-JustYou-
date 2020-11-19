// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
var api = require('../../utils/api');
var tools = require('../../utils/public');
var analyzeText = api.getanalyzeText();
var analyzePic = api.getanalyzePic();

// 竖型图
let chart_vertical  = null;

// 玫瑰图
let chart_flo = null;


// 存储返回mood到arr中
var arr_vertical = [];

// 玫瑰图
function initChart_flo(canvas, width, height) {
  chart_flo = echarts.init(canvas, null, {
    width:width,
    height: height
  });
  canvas.setChart(chart_flo);

  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      x : 'center',
      y : 'bottom',
      data:['已处理','已结案','待处理','处理中','已回复']
    },
    toolbox: {
      show: false,
      feature: {
        mark: {show: true},
        magicType: {
          show: true,
          type: ['pie']
        },
      }
    },
    calculable: true,
    series: [
      {
        name: '九形人格',
        type: 'pie',
        radius: [20, 110],
        center: ['50%', '50%'],
        roseType: 'radius',
        x: '70%', // for funnel
        y: '30%',
        max: 20,                // for funnel
        sort: 'ascending',     // for funnel
        data: [
          {value: 10, name: '热情'},
          {value: 5, name: '喜悦'},
          {value: 15, name: '直率'},
          {value: 25, name: '悲愁'},
          {value: 10, name: '乐观'},
          {value: 30, name: '活泼'},
          {value: 15, name: '热情'},
          {value: 20, name: '仁慈'},
          {value: 20, name: '拘谨'},

        ],
        itemStyle:{
          normal:{
            label:{
              show:true,
              formatter: '{b}',
              textStyle:{
                fontSize:14,
                fontWeight:'700'
              }
            },
            // 阴影
            shadowBlur: 10,
            
          },
        },
      }
    ]
  };

  
  chart_flo.setOption(option);
  return chart_flo;
}
// 竖形图
function initChart(canvas, width, height) {
    chart_vertical = echarts.init(canvas, null, {
      width:width,
      height: height
    });
    canvas.setChart(chart_vertical);
    

    var option = {
        title: {
            text: '情绪管理'
        },
        tooltip: {},
        legend: {
            data:['情绪']
        },
        xAxis: {
            data: ["一周","二周","三周",
            "四周","五周","六周","七周","Now"]
        },
        yAxis: {},
        series: [{
            name: '情绪值',
            type: 'bar',
            data: []
        }]
    };
  
    chart_vertical.setOption(option);
    return chart_vertical;
}

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donghua:'',
    ec_ver: {
      onInit: initChart // 3、将数据放入到里面
    },
    ec_flower: {
      onInit: initChart_flo // 3、将数据放入到里面
    },

    // 用户openid
    openid: '',

  },

  // 图标赋值数据
  AddData(){

    var option = chart_vertical.getOption();
    option.series[0].data = arr_vertical;
    chart_vertical.setOption(option);

  },

  // 文字性格测试
  TextAnalyze(openid){
    // 请求竖型图中数据
    wx.request({
      url: analyzeText,
      data: {
        openId: 'vx001'
      },
      success: res=>{
        // new Promise(function(resolve,reject){

          console.log(res.data.data.result);
        
          // 将mood存入一个新数组
          var count = 0;
          res.data.data.result.forEach(item => {
            arr_vertical[count] = Math.floor(item.mood*100)/100;
            count++;
            
          })
          console.log(arr_vertical);
          // resolve('success');

        // }).then(res=>{
          // var option = chart_vertical.getOption();
          // option.series[0].data = arr_vertical;
          // chart_vertical.setOption(option);


        // })
        setTimeout(()=>{
          this.AddData();

        },1000)

        
        
      }
    })

    // 请求玫瑰图数据
    // wx.request({
    //   url: analyzePic,
    //   data: {
    //     openId: 'vx001'
    //   },
    //   success: res=>{
    //     // 更改数据键名
    //     res.data.data.result.forEach(item => {
    //       tools.renameKey(item,'mood','name');
    //       tools.renameKey(item,'number','value');
    //     })
    //     console.log(res.data.data.result);

    //     setTimeout(()=>{
    //       var option = chart_flo.getOption();
    //       option.series[0].data = res.data.data.result;
    //       chart_flo.setOption(option);
    //     },1000)

    //   }
    // })

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中..',
    }).then(res=>{

      this.TextAnalyze(app.globalData.openid)
    }).then(res=>{
      wx.hideLoading({ })
    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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





