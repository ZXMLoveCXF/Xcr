// pages/detail/detail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadedImgs: [],
    uploadedIds: [],
    result: {},
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
   * edit active
   */
  edit(){
    wx.navigateTo({
      url: '../publish/publish?id=' + this.data.id + '&type=edit',
    })
  },
  /**
 * choose image
 */
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        upload(that, res.tempFilePaths);
      }
    })
  },
  /**
   * 获取活动详情
   */
  getDetailData(id) {
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
        var user = res.data.result.user;

        that.setData({
          result: result,
          user: user
        })
      }, null, null, that.data.token
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
  signUp: function () {
    var that = this;
    wx.navigateTo({
      url: '../join/join?activityId=' + that.data.id + '&needIDNo=' + that.data.result.needIDNo + '&needRealName=' + that.data.result.needRealName,
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
   * toAlbum
   */
  toAlbum(){
    console.log(this.data.result);
    wx.navigateTo({
      url: '../album/album?id=' + this.data.id + '&name=' + this.data.result.activityName,
    })
  },
  /**
   * toUser
   */
  toUser() {
    wx.navigateTo({
      url: '../user/user?id=' + this.data.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

var uploadedImgs = [], uploadedIds = [], aTempIds = [];

function upload(page, pathes) {

  wx.showToast({
    icon: "loading",
    title: "正在上传"
  })

  var path = pathes.shift(pathes)

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
      uploadedIds = page.data.uploadedIds;
      uploadedImgs = page.data.uploadedImgs;
      uploadedIds.push(data.guid);
      console.log(uploadedIds);
      aTempIds.push(data.guid);
      console.log(aTempIds);
      uploadedImgs.push({
        imgUrl: path,
        id: data.guid
      })
      console.log(uploadedImgs);
      console.log(uploadedImgs)
      console.log(uploadedIds)
      page.setData({  //上传成功修改显示图片
        uploadedIds: uploadedIds,
        uploadedImgs: uploadedImgs
      })
      //继续上传
      if (pathes.length > 0) {
        upload(page, pathes)
      }else{
        // app.showMsgModel('温馨提示', '上传成功'); 
        // return false;
        uploadedIds = JSON.stringify(uploadedIds);
        app.reqServerData(
          app.config.baseUrl + 'api/activity/UploadImages',
          {
            "activityId": page.data.id,
            "imageGuids": uploadedIds
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
            wx.hideToast();

          }, null, 'POST', page.data.token
        )
      }
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
        //隐藏Toast
    }
  })
}