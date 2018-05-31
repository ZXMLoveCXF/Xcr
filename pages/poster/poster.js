// pages/poster/poster.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedImg: '',
    uploadedId: '',
    aPosterList: [],
    sIndex: 0,
    sSelectedSrc: '',
    sSelectedId: '',
  },
  /**
  * choose image
  */
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        upload(that, res.tempFilePaths);
      }
    })
  },
  /**
   * click Image
   */
  select(e) {
    var that = this;
    console.log(e);
    var currentTarget = e.currentTarget;
    var dataset = currentTarget.dataset;
    that.setData({
      sIndex: dataset.index,
      sSelectedSrc: dataset.src,
      sSelectedId: dataset.id,
    })
  },
  /**
   * submit
   */
  submit() {
    var that = this;

    if (that.data.uploadedId) {
      app.setCache('postId', that.data.uploadedId);
      app.setCache('postSrc', that.data.uploadedImg);
    } else {
      app.setCache('postId', that.data.sSelectedId);
      app.setCache('postSrc', that.data.sSelectedSrc);
    }
    // wx.redirectTo({
    //   url: '../publish/publish',
    // })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //get data from database
    app.reqServerData(
      app.config.baseUrl + 'api/image/getMainImageTempleteList',
      {},
      function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          app.showMsgModel('温馨提示', res.errMsg);
          return false;
        }
        var result = res.data.result;
        that.setData({
          aPosterList: result,
          sSelectedSrc: result[0].imageUrl
        })


      }, function () { }, "GET"
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

function upload(page, pathes) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  })

  var path = pathes.shift(pathes)

  console.log(path);

  var initData = app.getCache('initdata')
  var token = app.getCache('token')
  wx.uploadFile({
    url: app.config.baseUrl + 'api/image/upload',
    filePath: path,
    name: 'fieldNameHere',
    header: { "Content-Type": "multipart/form-data" },
    success: function (res) {
      console.log('---------------------------UPLOAD complete');
      console.log(res);
      if (res.statusCode != 200) {
        app.showMsgModel('上传失败', res.errMsg + '(statusCode=' + res.statusCode + ')')
        return
      }

      var data = JSON.parse(res.data)
      if (data.errorCode != 200) {
        app.showMsgModel('上传失败', 'status=' + res.data.status)
        return
      }
      data = data.result;

      page.setData({
        uploadedId: data.guid,
        uploadedImg: data.imageUrl,
        sSelectedSrc: data.imageUrl,
        sIndex: -1
      })

    },
    fail: function (e) {
      console.log(e);
      wx.showModal({
        title: '提示',
        content: '上传失败(' + e.errMsg + '), 上传已被终止, 请重新上传',
        showCancel: false
      })
    },
    complete: function () {
      wx.hideToast();  //隐藏Toast
    }
  })
}