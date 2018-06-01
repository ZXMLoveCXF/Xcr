// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{},
    token: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = app.getCache("token");
    var that = this;
    that.setData({
      token: token
    })
    that.getDetailData(id);
  },
  /**
   * 获取活动详情
   */
  getDetailData(id){
    var that = this;
    //
    app.reqServerData(
      app.config.baseUrl + 'api/Activity/Details',
      {
        "activityId": id
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
        var result = res.data.result.activityDetails;
        
        that.setData({
          result: result
        })
      },null,null,that.data.token
    )
  },

  /**
   * 写留言
   */
  setMessage: function () {
    wx.navigateTo({
      url: 'message/message',
    })
  },

  /**
   * 我要报名
   */
  signUp: function(){
    var that = this;
    app.reqServerData(
      app.config.baseUrl + 'api/activity/signup',
      {
        "activityId": id,
        "mobileNo": mobileNo,
        "verificationCode": '5732',
        "userRealName":'张三',
        "userIDNo":'350532197501222020'
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

      }, null, 'POST', that.data.token
    )
  },

  /**
   * 留言
   */
  setComment: function () {
    var that = this;
    app.reqServerData(
      app.config.baseUrl + 'api/activitycomment/create',
      {
        "activityId": id,
        "commentContent": commentContent
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

      }, null, 'POST', that.data.token
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