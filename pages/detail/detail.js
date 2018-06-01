// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{},
    id: '',
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
      token: token,
      id: id
    })
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
    var that = this;
    wx.navigateTo({
      url: 'message/message?activityId=' + that.data.id + '&activityName=' + that.data.result.activityName,
    })
  },

  /**
   * 我要报名
   */
  signUp: function(){
    wx.navigateTo({
      url: '../join/join?activityId=' + this.data.id,
    })
  },

  /**
   * 点赞
   */
  heart: function (e) {
    console.log(e.currentTarget.dataset.commentid);
    var that = this;
    app.reqServerData(
      app.config.baseUrl + 'api/activitycomment/like',
      {
        "activityId": that.data.id,
        "commentId": e.currentTarget.dataset.commentid
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
        that.getDetailData(that.data.id);

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
    var that = this;
    that.getDetailData(that.data.id);
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