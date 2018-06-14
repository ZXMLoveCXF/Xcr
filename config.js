/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "vshop.xtep.com"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  //base login
  baseUrl: `http://${host}/`,

  // 登录地址，用于建立会话
  loginUrl: `http://${host}/api/User/Login`,

  //发送用户信息到服务端
  initUserUrl: `http://${host}/api/User/GetUserInfo`,

  //APPid
  wxAppId: 'wxaa1cde4ecb06a7e3',

  //本地缓存前缀
  cachePrefix: 'xtep_',

  //app名称
  appName: '特步跑步俱乐部',

  //image合法域名
  imageUrl: 'https://xtepactive.image.alimmdn.com'
};

module.exports = config