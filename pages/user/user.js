// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actList: [],    //列表
    resultList:[]
    , currentPage:1
    ,totalPages: 0,  //总页数
    isMore: true //是否有更多内容
  },
  /**
  * 获取跑团活动
  */
  getAct: function (page, isAppend) {
    let that = this;
    app.reqServerData(
      app.config.baseUrl + 'api/activity/activityUserList',
      {
        "activityId": that.data.id,
        "pageIndex": page
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

       
        var result = res.data.result;
        var resultList = res.data.result.resultList;
        let actListArr = result.totalPageCount == 0 ? [] : resultList;
        if (isAppend) {
          actListArr = that.data.actList.concat(actListArr);
        }
        that.setData({
          totalCount: result.totalCount,
          totalPages: result.totalPageCount,
          // currentPage: data.page.currentPage,
          actList: actListArr,
          // hasActList: actListArr.length == 0 ? false : true,
          isMore: result.totalPageCount > page
        });

      }, null, 'GET', that.data.token
    )
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
      , id: id
    })
    that.getAct(1);
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
    var that = this;
    if (!that.data.isMore) {
      return
    }
    app.showLoading();
    that.getAct(that.data.currentPage + 1, true);
    app.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})