// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    isAuthorize: true,  //是否授权
    token: 0,
    result: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
    var token = app.getCache("token");
    that.setData({
      token: token
    })
    app.checkLogin(function () {
      that.getUserInfo();
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    var that = this;
    //
    app.reqServerData(
      app.config.baseUrl + 'api/user/baseinfo',
      null,
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
        var result = res.data.result;

        that.setData({
          result: result
        })
      }, null, null, that.data.token
    )
  },

  /**
   * 获取微信用户信息
   */
  getWxUser: function(){
    app.getWxUser(e.detail, function () {
      wx.navigateTo({
        url: '../publish/publish'
      });
    });
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