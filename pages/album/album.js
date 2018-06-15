// pages/album/album.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight: '60',
    productArr: [//图片地址
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }
    ],
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

    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res);
    //     // 可使用窗口宽度、高度
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // var num = parseInt(res.windowHeight / that.data.imageHeight);
    //     // for (var i = 0; i < num; i++){
    //     //   that.data.arry[i] = true;
    //     //   that.setData({
    //     //     arry: that.data.arry
    //     //   })
    //     // }
    //     // 计算主体部分高度,单位为px
    //     that.setData({
    //       // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
    //       _height: res.windowHeight,
    //       _width: res.windowWidth
    //     })
    //   }
    // })

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
   * onPageScroll
   */
  // onPageScroll(res) {
  //   console.log(res.scrollTop);
  //   var that = this;
  //   var _height = that.data._height;
  //   var arrHight = that.data.arrHight;
  //   var event = e;
  //   var scrollTop = res.scrollTop;
  //   var arr = that.data.arr;
  //   // var height = that.data._height + res.scrollTop;
  //   // var str = parseInt(height / that.data.imageHeight);
  //   // that.data.arry[str] = true;
  //   // that.setData({
  //   //   arry: that.data.arry
  //   // })
  //   for (var i = 0; i < this.data.productArr.length; i++) {
  //     if (arrHight[i] < scrollTop) {
  //       if (arr[i] == false) {
  //         arr[i] = true;
  //         // arr[i*2]   arr[i*2+1] 
  //       }
  //       //n = i + 1;
  //     }
  //     //arr[i] = true;
  //   }
  //   this.setData({
  //     arr: arr
  //   })
  // },
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
  // scroll: function (e) {
  //   var _height = this.data._height; //可见区域高度
  //   var arrHight = this.data.arrHight;
  //   var event = e;
  //   var scrollTop = event.detail.scrollTop + _height;
  //   var arr = this.data.arr;
  //   console.log(scrollTop)
  //   for (var i = 0; i < this.data.productArr.length; i++) {
  //     if (arrHight[i] < scrollTop) {
  //       if (arr[i] == false) {
  //         arr[i] = true;
  //         // arr[i*2]   arr[i*2+1] 
  //       }
  //       //n = i + 1;
  //     }
  //     //arr[i] = true;
  //   }
  //   this.setData({
  //     arr: arr
  //   })
  // },

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