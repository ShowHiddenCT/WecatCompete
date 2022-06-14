const DB = wx.cloud.database().collection("SignUsers")
var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasDate: false,
    logArr: [],
    userInfo: {
      id: "",
      username: "未登录",
      avator: "https://i.postimg.cc/VNZFTV0b/image.png",
      sum: 0
    }

  },

  // 获取数据
  getDetail(e) {
    let that = this
    return new Promise((reslove, reject) => {
      DB.where({
        userID: wx.getStorageSync('id'),
      }).get({
        success: function (res) {
          if (res.data.length > 0) {
            // 获取当前时间 YY-MM-DD hh:mm:ss
            let arr = [];
            let t = new Date();
            let length = res.data.length;
            let time = util.formatTime(t, 'YY-MM-DD hh:mm:ss')
            for (var i = 0; i < length; i++) {
              let obj = {};
              obj.UserID = res.data[i].userID;
              obj.activeName = res.data[i].activeName;
              obj.STime = res.data[i].STime;
              let status = util.selectStatus(time, res.data[i].SignDTime, res.data[i].STime, res.data[i].FTime);
              obj = Object.assign(obj, status)
              arr.push(obj)
              console.log(obj)
            }
            that.setData({
              logArr: arr,
              ['userInfo.sum']: length,
              hasDate: true
            })
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let that = this
    let id = wx.getStorageSync('id')
    let username = wx.getStorageSync('username')
    let avator = wx.getStorageSync('avator')
    this.setData({
      ['userInfo.id']: id,
      ['userInfo.username']: username,
      ['userInfo.avator']: avator,
      hasDate: false,
      logArr: [],
      sum: 0
    })
    res = await this.getDetail();
  },
  /**
   * 生命周期函数--监听页面卸载
   */

  onUnload() {},
  onHide() {
    console.log("卸载")
    this.setData({
      ['userInfo.id']: "",
      ['userInfo.username']: "",
      ['userInfo.avator']: "",
      hasDate: false,
      logArr: []
    })
  },

})