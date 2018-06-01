// pages/detail/message/message.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityName: '',
    activityId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var option = options;
    var that = this;
    that.setData({
      activityName: option.activityName,
      activityId: option.activityId
    })
  },

  /**
   * 留言
   */
  setMsg: function(e){
    var msg = e.detail.value.msg;
    if (msg == ''){
      app.showMsgModel('温馨提示','请输入留言内容')
      return
    }
    var that = this;
    app.reqServerData(
      app.config.baseUrl + 'api/activitycomment/create',
      {
        "activityId": that.data.activityId,
        "commentContent": msg
      },
      function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          app.resErrMsg1('温馨提示', res.errMsg);
          return false;
        }
        if (res.data.errorCode != 200) {
          app.resErrMsg2('获取数据失败', res);
          return false;
        }
        wx.showToast({
          title: '留言成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
      }, null, 'POST', app.getCache("token")
    )
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