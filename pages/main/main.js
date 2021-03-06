// pages/main/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actListData: [], // 已结束活动列表
    hasMore: true, // !true?"没有更多数据了":''
    scrollHeight: 0, // 页面高度
    total: 0, // 总数
    pagesize: 10, // 每页显示多少条
    curpage: 1, // 当前页码
    isLoadding: true, // 是否加载中
    totalPageCount: 0,
    userInfo: true
  },
  /**
  * 获取用户信息发布活动
  */
  getWxUser: function (e) {
    var that = this;
    var initData = app.getCache('initdata')
    console.log('-----------checksession cache-initData -------------------')
    console.log(initData);
    console.log(e)
    if (initData) { //初始化信息存在，不用执行任何登录操作
      //用 页面参数 和 缓存参数 对比 看参数是否有变化
      // that.syncAppInfo()
      console.log('跳转')
      that.jump();
    } else {
      //重新初始化
      console.log('重新初始化')
      app.getWxUser(e.detail, that.jump);
    }


  },
  /**
   * naToDetail
   */
  naTo(e) {
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * jump
   */
  jump() {
    app.delCache('activityName');
    app.delCache('activityDesc');
    app.delCache('participantNumberLimit');
    app.delCache('postSrc');
    app.delCache('participantNumberLimit');
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.checkLogin(function () {
      that.getActList(1);
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
    var that = this
    app.checkLogin(function () {
      that.getActList(1);
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
    var that = this
    if (!that.data.hasMore) {
      return
    }

    //是否正在加载中
    if (this.data.isLoadding) {
      return
    }

    //设置显示滚动加载状态


    //加载数据
    var curpage = that.data.curpage


    app.showLoading()

    that.getActList(curpage, true)
  },

  /**
   * 活动预告
   */
  getActList: function (page, isAppend) {

    var that = this

    app.showLoading()

    page = parseInt(page)
    page = page ? page : 1

    //请求进行中列表数据
    app.reqServerData(
      app.config.baseUrl + 'api/activity/list',
      {
        pageIndex: page
      },
      function (res) {
        console.log(res);
        app.hideLoading()

        if (res.statusCode != 200) {
          app.resErrMsg1('请求错误', res)
          return
        }
        var data = res.data;
        console.log(data);
        var result = data.result;
        var userInfo = result.userInfo;
        console.log(result);
        var total = result.totalPageCount // 总页数
        if (!result.resultList){
          return false;
        }
        var listData = result.resultList
        var viewListData = []

        for (var i = 0; i < listData.length; i++) {
          var item = listData[i]
          var activityTimeStatus = item.activityTimeStatus;
          if (activityTimeStatus == 1) {
            activityTimeStatus = '报名中';
          } else if (activityTimeStatus == 2) {
            activityTimeStatus = '进行中';
          } else if (activityTimeStatus == 3) {
            activityTimeStatus = '已结束';
          }
          var viteItem = {
            activityId: item.activityId,
            activityName: item.activityName,
            activityTime: item.activityTime,
            activityTimeStatus: activityTimeStatus,
            locationName: item.locationName,
            mainImagePath: item.mainImagePath
          }
          viewListData.push(viteItem)
        }

        if (page == 1 && viewListData.length == 0) {
          that.setData({
            isShowList: false
          })
        } else {
          that.setData({
            isShowList: true
          })
        }

        //设置页面数据
        var curpage = that.data.curpage;
        var totalPageCount = result.totalPageCount;
        if (curpage != totalPageCount) {
          curpage++;
        } else {
          that.setData({
            hasMore: false
          })
        }
        let actListArr = viewListData;
        if (isAppend) {
          actListArr = that.data.actListData.concat(actListArr);
        }

        that.setData({
          curpage: curpage,
          actListData: actListArr,
          isLoadding: false,
          totalPageCount: result.totalPageCount,
          userInfo: userInfo ? true : false
        })


      }, function () { }, "POST", app.getCache('token')
    )
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})