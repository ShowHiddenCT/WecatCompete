const DB = wx.cloud.database().collection("IntegralLog")

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
      integral: 0
    }

  },


  // 获取数据
  getDetail(e) {
    let that = this
    return new Promise((reslove, reject) => {
        DB.where({
          UserID: wx.getStorageSync('id'),
        }).get({
            success: function (res) {
              if (res.data.length != 0) {
                var arr = [];
                for (var i = 0; i < res.data.length; i++) {
                  console.log("进入");
                  let obj = {};
                  obj.UserID = res.data[i].UserID;
                  obj.name = res.data[i].name;
                  obj.integral = res.data[i].integral;
                  obj.time = res.data[i].time;
                  console.log(obj)
                  arr.push(obj);
                }
                that.setData({
                  hasDate: true,
                  logArr: arr
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
    let integral = wx.getStorageSync('integral')
    let username = wx.getStorageSync('username')
    let avator = wx.getStorageSync('avator')
    // let hasInfo = wx.getStorageSync('hasUserInfo')
    // if (hasInfo) {
    this.setData({
      ['userInfo.id']: id,
      ['userInfo.username']: username,
      ['userInfo.avator']: avator,
      ['userInfo.integral']: integral,
      hasDate:false,
      logArr:[]
    })
    // 查数据
    console.log("查数据")
    var res = {};
    res = await this.getDetail();
    // }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  onHide() {
    console.log("卸载")
    this.setData({
      ['userInfo.id']: "",
      ['userInfo.username']: "",
      ['userInfo.avator']:"",
      ['userInfo.integral']: "",
      hasDate:false,
      logArr:[]
    })
  },

})