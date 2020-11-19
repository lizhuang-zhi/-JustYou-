// pages/user/user.js
var api = require('../../utils/api')
var tools = require('../../utils/public')
var UserAttionCount = api.getUserAttionCount()
var UserDynamicList = api.getUserDynamicList()
var TaskOfMe = api.getTaskOfMe()
var AttentionPer = api.getAttentionPer()
var CancelAttentionPer = api.getCancelAttentionPer()

var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		dataList:[],
		judge: true,
		atten:"关注",

		// 粉丝人数
		fans:0,

		// 关注人数
		attentionPeo: 0,

		// 动态集合
		DynamicList: [],

		// 发布任务的数量
		NumOfTask:"",

	},

	// 跳转私聊界面
	ChatWithMe(){
		wx.navigateTo({
			url: '/pages/webSocket/webSocket',
		})
	},

	// 关注
	Attention(){
		if(this.data.judge == true){

			//关注用户
			wx.request({
				url: AttentionPer,
				data: {
					MyOpenId: "vx002",
					HeOpenId: "vx001"
				},
				success: res=>{
					console.log(res.data.message);
					
				}
			})

			this.setData({
				judge:false,
				atten:"已关注",
				fans:this.data.fans+1
			})
		}else{

			//取消关注
			wx.request({
				url: CancelAttentionPer,
				data: {
					MyOpenId: "vx002",
					HeOpenId: "vx001"
				},
				success: res=>{
					console.log(res.data.message);	
				}
			})

			this.setData({
				judge:true,
				atten:"关注",
				fans:this.data.fans-1
			})
		}
	},

	myinfo(){
		wx.navigateTo({
			url: '/pages/myinfo/myinfo',
		})
	},

	// 查看关注与粉丝页面
	attent(back){
		var actId = back.currentTarget.dataset.act
		
		wx.navigateTo({
			url: '/pages/attent/attent?actId='+actId,
		})
	},


	// 发布
	Mylist(){
		wx.navigateTo({
			url: '/pages/HistoryTask/HistoryTask?openid='+app.globalData.openid,
		})
	},

	// 初始化数据
	Start(){
		var openid = app.globalData.openid
		console.log('调用app.js中的openid：：'+openid);
		

		// 获取关注数量和粉丝数量
		wx.request({
			url: UserAttionCount,
			data: {
				open_id: 'vx001'
			},
			success: res=>{
				console.log(res.data.data);
				this.setData({
					fans: res.data.data.FansCount,
					attentionPeo: res.data.data.AttentionCount
				})
			}
		})

		// 获取我的动态集合
		wx.request({
			url: UserDynamicList,
			data: {
				openId: 'vx001'
			},
			success: res=>{
				console.log(res.data.data);
				res.data.data.forEach(item => {
					item.dynamicTime = tools.changeTimeFormat(item.dynamicTime)
				})
				this.setData({
					DynamicList: res.data.data
				})
			}
		})

		// 获取我的历史发布任务数量
		wx.request({
			url: TaskOfMe,
			data: {
				openId: 'vx001'
			},
			success: res=>{
				// 获取我的发布“is”的总个数
				var arrLength = res.data.data.is.length + res.data.data.past.length
				this.setData({
					NumOfTask: arrLength
				})
			}
		})

	},



	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.Start();
		// 通过Promise同步调用
		// app.getUserInfo().then(res=>{
		// 	this.Start()
		// })

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