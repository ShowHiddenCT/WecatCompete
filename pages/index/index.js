const DB = wx.cloud.database().collection("user")

Page({
  data: {
    hasUserInfo: false,
    per:0,
    userInfo: {
      id: "",
      username: "未登录",
      avator: "https://i.postimg.cc/VNZFTV0b/image.png",
      introduction:"什么也没有~~",
      Lv:1,
      exp:0
    }
  },
  // 跳转我的积分页面
  navigateIntegral(){
    // console.log("hinrufsdf")
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  //修改头像
  ChooseChange(e) {
    if (this.data.hasUserInfo) {
      this.changePhoto()
    }else{
      this.ToLogin()
    }
  },
  //修改个人图片
  changePhoto() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        //上传云服务器
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+'.png',
          filePath: tempFilePaths[0],
          success: res => {
            //更新图片
            that.setData({
              ['userInfo.avator']:res.fileID
            })
            // 更新sstorage
            wx.setStorage({
              key:"avator",
              data:res.fileID
            })
            //更新数据库字段
            DB.doc(that.data.userInfo.id).update({
              data:{
                avator:res.fileID
              }
            })
          },
        })
      }
    })
  },
  //转到登陆界面
  ToLogin() {
    console.log("登录")
  },
  onLoad() {
    let id = wx.getStorageSync('id')
    let username = wx.getStorageSync('username')
    let avator = wx.getStorageSync('avator')
    let hasInfo = wx.getStorageSync('hasUserInfo')
    console.log("has"+hasInfo)
    let LV= wx.getStorageSync('lv')
    let exp= wx.getStorageSync('exp')
    let introduction = wx.getStorageSync('introduction')
    let PER = exp/1000
    if (hasInfo) {
      this.setData({
        hasUserInfo: hasInfo,
        per:PER,
        ['userInfo.id']: id,
        ['userInfo.username']: username,
        ['userInfo.avator']: avator,
        ['userInfo.Lv']:LV,
        ['userInfo.exp']:exp,
        ['userInfo.introduction']:introduction
      })
    }
  }
})