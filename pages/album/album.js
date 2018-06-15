// pages/album/album.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: '60',
    result:[]
  },
  /**
 * preImg
 */
  preImg(e) {
    console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.index;
    var src = e.currentTarget.dataset.src;
    var temp = [];
    var result = that.data.result[index];
    for (var i in result.images){
      temp.push(result.images[i].imageUrl);
    }
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: temp // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var name = options.name;
    var token = app.getCache("token");
    var that = this;
    that.setData({
      token: token
      , id: id
      , name: name
    })
    app.reqServerData(
      app.config.baseUrl + 'api/activity/activityImageList',
      {
        "activityId": that.data.id,
        "pageIndex": 1
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
        that.setData({
          result: result
        })
        console.log(result);


      }, null, 'GET', that.data.token
    )

    var arrHight = [];
    var arr = [];
    for (var i = 0; i < 48; i++) {
      arr[i] = false;
      arrHight[i] = Math.floor(i / 3) * 60;
    }

    that.setData({
      arr: arr,
      // productArr: Array.from(res.data.data.products),
      arrHight: arrHight
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