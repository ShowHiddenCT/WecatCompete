import Toast from "../../miniprogram_npm/vtuweapp/toast/vtu-index";
let username = ''
let phone = ''
let password = ''
let introduce = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNameStatus: "",
        phoneStatus: "",
        pwdStatus: "",
        userNameMsg: "",
        phoneMsg: "",
        pwdMsg: "",
        loading: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getUserName(e) {
        username = e.detail.value
    },
    getPhone(e) {
        phone = e.detail.value
    },
    getPassword(e) {
        password = e.detail.value
    },
    getIntroduce(e) {
        introduce = e.detail.value
    },
    detectUserName() {
        if (username.length < 3 || username.length > 12) {
            this.setData({
                userNameStatus: "error",
                userNameMsg: "用户名要求3到12位"
            })
        } else {
            this.setData({
                userNameStatus: "success",
                userNameMsg: ""
            })
        }
    },
    detectPhone() {
        if (phone.length != 11) {
            this.setData({
                phoneStatus: "error",
                phoneMsg: "请输入正确的手机号码"
            })
        } else {
            this.setData({
                phoneStatus: "success",
                phoneMsg: ""
            })
        }
    },
    detectPwd() {
        if (password.length < 6) {
            this.setData({
                pwdStatus: "error",
                pwdMsg: "密码要求最低6位"
            })
        } else {
            this.setData({
                pwdStatus: "success",
                pwdMsg: ""
            })
        }
    },
    register() {
        if (!username || username.length == 0) {
            wx.showToast({
                icon: "none",
                title: '请输入用户名',
            })
            return
        }
        if (!phone || phone.length == 0) {
            wx.showToast({
                icon: "none",
                title: '请输入手机号',
            })
            return
        }
        if (!password || password.length == 0) {
            wx.showToast({
                icon: "none",
                title: '请输入密码',
            })
            return
        }

        const db = wx.cloud.database()
        db.collection("user").add({
            data: {
                phone,
                username,
                introduction: introduce,
                password,
                avator:"/img/zhanghao.png"
            },
            success: (res => {
                this.setData({
                    loading: true
                })
                setTimeout(() => {
                    wx.showToast({
                        icon: "success",
                        title: '注册成功',
                    })
                    wx.navigateTo({
                        url: '../login/login',
                    })
                }, 1500);
            }),
            fail: (err => {
                console.log("出错了", err)
            })
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            userNameStatus: "",
            phoneStatus: "",
            pwdStatus: "",
            userNameMsg: "",
            phoneMsg: "",
            pwdMsg: "",
            loading: false
        })
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