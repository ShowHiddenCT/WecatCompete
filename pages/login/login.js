// pages/login/login.js
import Toast from "../../miniprogram_npm/vtuweapp/toast/vtu-index"
let phone = ''
let password = ''
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPassword: true,
        isCheck: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            isPassword: true,
            isCheck: false
        })
    },
    eyeOpen() {
        this.setData({
            isPassword: !this.data.isPassword
        })
        console.log(this.data.isPassword)
    },
    chooseCheck() {
        this.setData({
            isCheck: !this.data.isCheck
        })
    },
    getPhone(e) {
        phone = e.detail.value
    },
    getPassWord(e) {
        password = e.detail.value
    },
    login() {
        if (!this.data.isCheck) {
            wx.showToast({
                icon: "none",
                title: '请先勾选使用协议!',
            })
        } else {
            if (!phone || phone.length == 0) {
                wx.showToast({
                    icon: "none",
                    title: '请输入账号！',
                })
                return
            }
            if (!password || password.length == 0) {
                wx.showToast({
                    icon: "none",
                    title: '请输入密码！',
                })
                return
            }
            db.collection('user').where({
                    phone: phone,
                    password: password
                }).get()
                .then(res => {
                    console.log(res)
                    if (res.data.length == 0) {
                        wx.showToast({
                            icon: "error",
                            title: '账号或密码错误',
                        })
                        return
                    } else {
                        wx.showToast({
                            icon: "success",
                            title: '登录成功',
                        })
                        wx.setStorageSync('id', res.data[0]._id)
                        wx.setStorageSync('username', res.data[0].username)
                        wx.setStorageSync('avator', res.data[0].avator)
                        wx.setStorageSync('hasUserInfo', true)
                        console.log(res)
                        //开发测试
                        // wx.setStorageSync('id',"6d85a2b962766f95024510ba5de0dce5")
                        wx.navigateTo({
                          url: '../index/index',
                        })
                    }
                }).catch(err => {
                    console.log("出错了", err)
                })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})