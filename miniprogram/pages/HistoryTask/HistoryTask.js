// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
var api = require('../../utils/api')
var TaskOfMe = api.getTaskOfMe()
var tools = require('../../utils/public')

let chart = null;

// 用户发布任务类型数量图
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
   
    series : [
      {
          type: 'pie',
          name: '分类任务数据统计',
          radius: '55%',
          roseType: 'area',
          data:[
              {value:1, name:'考研'},
              {value:3, name:'乐跑'},
              {value:2, name:'快递代取'},
              {value:1, name:'运动'},
              {value:3, name:'学习'}
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
    },

    // 默认选中tab
    active: 0,
    
    // 正在进行的任务
    IngTask: [],

    // 已结束的任务
    PastTask: [],

    // 只存在正在进行的任务
    JustIng: '',
  },

  // 初始化数据
  Start(openid,notpast){

    if(notpast){
      console.log('我是notpast');
      
      wx.request({
        url: TaskOfMe,
        data: {
          openId: 'vx001'
        },
        success: res=>{
          console.log(res.data.data);
          // 修改时间格式
          res.data.data.is.forEach(t => {
            t.release_time = 
            tools.format(t.release_time,'MM-dd HH:mm')
          })
  
          this.setData({
            IngTask: res.data.data.is,
            JustIng: true
          })
        }
        
      })

    }else{
      console.log('我是else');

      wx.request({
        url: TaskOfMe,
        data: {
          openId: 'vx001'
        },
        success: res=>{
          console.log(res.data.data);
          // 修改时间格式
          res.data.data.is.forEach(t => {
            t.release_time = tools.format(t.release_time,'MM-dd HH:mm')
          })
          res.data.data.past.forEach(t => {
            t.release_time = tools.format(t.release_time,'MM-dd HH:mm')
          })
  
          this.setData({
            PastTask: res.data.data.past,
            IngTask: res.data.data.is
          })
        }
        
      })

    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    new Promise(function(resolve,reject){
      wx.showLoading({
        title: '数据加载中',
      })
      resolve('success');
    
    }).then(res=>{

      return new Promise(function(resolve,reject){
        if(options.NotPast === '1'){
          that.Start(options.openid,options.NotPast);
        }else{
          // 初始化数据
          that.Start(options.openid);
        }
        resolve('success');
      })
      
    }).then(res=>{
      wx.hideLoading({ })
    })
    
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // setTimeout(function () {
    //   // 获取 chart 实例的方式
    //   console.log(chart);
    // }, 2000);

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


// 折线图
function initChart2(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width:width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    //定义图标的标题和颜色
    title: {
      text: '今日',
      left: 'center'
    },
    color: ["#AA314D"],
    //定义你图标的线的类型种类
    legend: {
      data: ['A'],
      top: 10,
      left: 'center',
      backgroundColor: '#ccc',
      z: 100
    },
    grid: {
      containLabel: true
    },
    //当你选中数据时的提示框
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    //	x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['一', 'stu', '三', '四', 
      '五', '六', '日', '一', '二', '三'],//x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ccc',
          fontSize: '14',
        },
        fontStyle: 'oblique'
        
      },
      // 控制网格线是否显示
      splitLine: {
        show: false,
        //  改变轴线颜色
        lineStyle: {
          // 使用深浅的间隔色
          color: ['#999']
        }
      },
      // x轴的颜色和宽度
      axisLine: {
        lineStyle: {
          color: '#2EDBC4',
          width: 1,   //这里是坐标轴的宽度,可以去掉
        }
      }
      // show: false //是否显示坐标
    },
    
    yAxis: {
      x: 'center',
      type: 'value',
      //网格线
      splitLine: {
        lineStyle: {
          type: 'dotted'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#298EFF',
          fontSize: '14',
        },
        
      },
      
      // show: false
    },

    // 系列列表
    series: [{
      name: 'A',
      type: 'line',
      smooth: false,
      data: [15, 2, 30, 16, 10, 17, 15, 22, 27, 9]
    }]
  };
  chart.setOption(option);
  return chart;
}

// 竖形图
function initChart4(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width:width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
  
    chart.setOption(option);
    return chart;
  }


