// pages/myact/myact.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      { title: '未开始' },
      { title: '进行中' },
      { title: '已结束' }
    ],
    indexs: 0,
    token: 0,
    expiredActivities: [],
    notStartedActivities: [],
    underWayActivities: []
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
      that.getList();
    })
  },

  /**
   * 获取活动列表
   */
  getList: function () {
    var that = this;
    //
    app.reqServerData(
      app.config.baseUrl + 'api/user/myactivities',
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
          expiredActivities: result.expiredActivities,
          notStartedActivities: result.notStartedActivities,
          underWayActivities: result.underWayActivities
        })
      }, null, null, that.data.token
    )
  },

  /**
   * nav切换
   */
  switchNavData: function (e) {
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      indexs: e.currentTarget.dataset.index,
    })
  },

  /**
   * 活动详情
   */
  toDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
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
    this.getList();
    wx.stopPullDownRefresh();
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