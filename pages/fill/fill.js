// pages/fill/fill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    typeName: '',
    value:'',
    max: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var type = options.type;
    var typeName = '';
    var maxNum = 30;
    switch (type) {
      case 'activityName':
        typeName = '活动名称';
        break;
      case 'activityDesc':
        typeName = '活动简介';
        maxNum = 1000;
        break;
      case 'participantNumberLimit':
        typeName = '限制人数';
        break;
    }
    that.setData({
      typeName: typeName,
      type: type,
      value:app.getCache(type),
      max: maxNum
    })
  },
  /**
   * submit
   */
  submit(e) {
    var temp = e.detail.value.text, that = this;
    var str = temp.split('\n').join('&hc');
    app.setCache(that.data.type, str);
    wx.navigateBack({
      delta: 1
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