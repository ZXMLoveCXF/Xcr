var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();

Page({
  data: {
    uploadedImg: '',
    uploadedId: '',
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    bSelectTime: false,
    allowComment: 1,
    needRealName: 0,
    needIDNo: 0,
    name: '请选择活动地点',
    address: ''
    , location: {
      latitude: null,
      longitude: null
    },
    fillTime: false
    , activityDetails: {}
    , activityTime: '请选择活动时间'
    , bEdit: false
  },
  /**
   * submit
   */
  submit(e) {
    console.log(e);
    var that = this;
    var activityName = app.getCache('activityName');
    var activityTime = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + '-' + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + '-' + that.data.dateTimeArray1[2][that.data.dateTime1[2]] + ' ' + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ':' + that.data.dateTimeArray1[4][that.data.dateTime1[4]];
    var locationName = that.data.name;
    var locationAddress = that.data.address;
    var locationLatitude = that.data.location.latitude;
    var locationLongitude = that.data.location.longitude;
    var activityDesc = app.getCache('activityDesc');
    var participantNumberLimit = app.getCache('participantNumberLimit');

    if (!activityName) {
      app.showMsgModel('温馨提示', '请输入活动名称');
      return false;
    }
    if (!that.data.bEdit) {
      if (!that.data.bSelectTime) {
        app.showMsgModel('温馨提示', '请输入活动时间');
        return false;
      }
    }

    if (locationName == '请选择活动地点') {
      app.showMsgModel('温馨提示', '请选择活动地点');
      return false;
    }
    if (!activityDesc) {
      app.showMsgModel('温馨提示', '请输入活动简介');
      return false;
    }
    if (!participantNumberLimit) {
      app.showMsgModel('温馨提示', '请输入活动参与人数限制');
      return false;
    }

    if (!that.data.bEdit) {
      //创建活动
      app.reqServerData(
        app.config.baseUrl + 'api/activity/create',
        {
          "activityName": activityName,
          "activityTime": activityTime,
          "locationName": locationName,
          "locationAddress": locationAddress,
          "locationLatitude": locationLatitude,
          "locationLongitude": locationLongitude,
          "activityDesc": activityDesc,
          "mainImageGuid": that.data.uploadedId,
          "allowComment": that.data.allowComment,
          "participantNumberLimit": participantNumberLimit,
          "needRealName": that.data.needRealName,
          "needIDNo": that.data.needIDNo
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

          app.delCache('postSrc');
          app.delCache('activityName');
          app.delCache('activityDesc');
          app.delCache('participantNumberLimit');

          console.log(res.data.result.activityId);
          wx.redirectTo({
            url: '../detail/detail?id=' + res.data.result.activityId,
          })

        }, null, 'POST', app.getCache('token')
      )
    } else {
      //修改活动
      app.reqServerData(
        app.config.baseUrl + 'api/activity/update',
        {
          "activityId": that.data.id,
          "activityName": activityName,
          "activityTime": that.data.bSelectTime ? activityTime : that.data.activityTime,
          "locationName": locationName,
          "locationAddress": locationAddress,
          "locationLatitude": locationLatitude,
          "locationLongitude": locationLongitude,
          "activityDesc": activityDesc,
          "mainImageGuid": that.data.uploadedId,
          "allowComment": that.data.allowComment,
          "participantNumberLimit": participantNumberLimit,
          "needRealName": that.data.needRealName,
          "needIDNo": that.data.needIDNo
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

          app.delCache('postSrc');
          app.delCache('activityName');
          app.delCache('activityDesc');
          app.delCache('participantNumberLimit');

          wx.redirectTo({
            url: '../detail/detail?id=' + that.data.id,
          })

        }, null, 'POST', app.getCache('token')
      )
    }



  },
  /**
   * fill in
   */
  fillIn(e) {
    console.log(e);
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../fill/fill?type=' + type,
    })
  },
  /**
   * toPost
   */
  toPost() {
    wx.navigateTo({
      url: '../poster/poster',
    })
  },
  /**
   * change switch of comment
   */
  comment(e) {
    console.log(e.detail.value); // true or false
    if (e.detail.value == true) {
      this.setData({
        allowComment: 1
      })
    } else {
      this.setData({
        allowComment: 0
      })
    }
  },
  /**
   * change switch of realName
   */
  realName(e) {
    console.log(e.detail.value); // true or false
    if (e.detail.value == true) {
      this.setData({
        needRealName: 1
      })
    } else {
      this.setData({
        needRealName: 0
      })
    }
  },
  /**
   * change switch of userId
   */
  userId(e) {
    console.log(e.detail.value); // true or false
    if (e.detail.value == true) {
      this.setData({
        needIDNo: 1
      })
    } else {
      this.setData({
        needIDNo: 0
      })
    }
  },
  onLoad(options) {
    var that = this;
    if (options.type == 'edit') {
      that.setData({
        bEdit: true,
        id: options.id
      })
      //请求进行中列表数据
      app.reqServerData(
        app.config.baseUrl + 'api/Activity/Details',
        {
          "activityId": options.id,
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
          var activityDetails = res.data.result.activityDetails;
          that.setData({
            activityDetails: activityDetails
            , needRealName: activityDetails.needRealName
            , needIDNo: activityDetails.needIDNo
            , allowComment: activityDetails.allowComment
            , name: activityDetails.locationName
            , address: activityDetails.locationAddress
            , location: {
              latitude: activityDetails.locationLatitude,
              longitude: activityDetails.locationLongitude
            }
            , activityTime: activityDetails.activityTime.split('星')[0]
            , uploadedImg: activityDetails.mainImagePath
            , activityName: activityDetails.activityName
            , activityDesc: activityDetails.activityDesc
            , participantNumberLimit: activityDetails.participantNumberLimit
          })
          app.setCache('activityName', activityDetails.activityName);
          app.setCache('activityDesc', activityDetails.activityDesc);
          app.setCache('participantNumberLimit', activityDetails.participantNumberLimit);
          app.setCache('postSrc', activityDetails.mainImagePath);
          app.setCache('participantNumberLimit', activityDetails.participantNumberLimit);


        }, null, 'GET', app.getCache('token')
      )
    }

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      uploadedId: app.getCache('postId'),
      uploadedImg: app.getCache('postSrc')
    });


  },
  onShow() {
    this.setData({
      activityName: app.getCache('activityName'),
      activityDesc: app.getCache('activityDesc'),
      participantNumberLimit: app.getCache('participantNumberLimit'),
      uploadedId: app.getCache('postId'),
      uploadedImg: app.getCache('postSrc')
    })
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value,
      bSelectTime: true
    });
    console.log(e.detail.value);
    console.log(this.data.dateTimeArray1);
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  chooseLocation: function (e) {
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          address: res.address,
          name: res.name
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})

