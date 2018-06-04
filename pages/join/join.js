// pages/join/join.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:'',
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
  },
  /**
   * submit
   */
  submit(e) {
    console.log(e);
    var that = this;
    var _value = e.detail.value, mobileNo = _value.phone, verificationCode = _value.code, userRealName = _value.name, userIDNo = _value.IDcard, activityId = this.data.activityId;
    console.log(mobileNo, verificationCode, userRealName, userIDNo);
    if (!userRealName) {
      app.showMsgModel('温馨提示', '请输入姓名');
      return false;
    }
    if (!userIDNo) {
      app.showMsgModel('温馨提示', '请输入正确的身份证号');
      return false;
    }
    if (!mobileNo || mobileNo.length != 11){
      app.showMsgModel('温馨提示', '手机号输入有误');
      return false;
    }
    if (!verificationCode) {
      app.showMsgModel('温馨提示', '请输入验证码');
      return false;
    }
    if (!this.data.checked) {
      app.showMsgModel('温馨提示', '请勾选我同意');
      return false;
    }
    app.reqServerData(
      app.config.baseUrl + 'api/activity/signup',
      {
        "activityId": activityId,
        "mobileNo": mobileNo,
        "verificationCode": verificationCode,
        "userRealName": userRealName,
        "userIDNo": userIDNo
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
          title: '报名成功',
          duration: 2000
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '',
          })
        },2000)

      }, null, 'POST', that.data.token
    )
  },
  /**
   * checkbox
   */
  checkbox(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    if (e.detail.value == 'checked'){
      this.setData({
        checked: true
      })
    }else{
      this.setData({
        checked: false
      })
    }
   
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