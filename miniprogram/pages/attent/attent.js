// pages/attent/attent.js
var api = require('../../utils/api')
var tools = require('../../utils/public')
var AttentionUser = api.getAttentionUser()
var FansList = api.getFansList()

var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 关注
		UserList:[],
		// 粉丝
		FansList:[],

		// 默认进入显示关注
		activeId: 0,

	},
	

	// 初始化数据
	Start(){
		var openid = app.globalData.openid
		console.log('调用app.js中的openid：：'+openid);

		// 请求关注列表
		wx.request({
			url: AttentionUser,
			data: {
				open_id: 'vx001'
			},
			success: res=>{
				console.log(res.data.data.list);
				res.data.data.list.forEach(item => {
					item.attentionTime = tools.changeTimeFormat(item.attentionTime)
				})
				this.setData({
					UserList: res.data.data.list
				})
			}
		})

		// 请求粉丝列表
		wx.request({
			url: FansList,
			data: {
				open_id: 'vx001'
			},
			success: res=>{
				console.log(res.data.data.list);
				res.data.data.list.forEach(item => {
					item.attentionTime = tools.changeTimeFormat(item.attentionTime)
				})
				this.setData({
					FansList: res.data.data.list
				})
			}
		})

	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 传入页面默认tab的标签（0/1）但是没起作用
		this.setData({
			activeId: options.actId
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
		// 通过Promise同步调用
		app.getUserInfo().then(res=>{
			this.Start()
		})
		

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