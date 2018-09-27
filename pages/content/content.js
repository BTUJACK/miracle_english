// pages/content/content.js
const innerAudioContext = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    showModal2: false,
    duration: 0,
    curTimeVal: 0,
    isPlay: false,
    zaojuList: [
      {
        id: 1,
        en: 'Did you do like you should?',
        ch: '试写：你好好上学了吗？',
        cankao: 'Did you go to school like you should?'
      },
      {
        id: 2,
        en: 'How did it taste?Yum, Yum, Yum.',
        ch: '试写：妈妈声音听起来怎么样？温柔温柔又温柔！',
        cankao: 'How does Mum’s voice sound?Gentle, gentle, gentle!'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var audioSrc = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    innerAudioContext.src = audioSrc;
  },

  play: function (e) {
    var that = this;
    that.setData({
      isPlay: true
    });
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      that.updateTime(that);
    })
  },

  pause: function (e) {
    var that = this;
    that.setData({
      isPlay: false
    });
    innerAudioContext.pause();
  },

  updateTime: function (that) {
    innerAudioContext.onTimeUpdate((res) => {
      //更新时把当前的值给slide组件里的value值。slide的滑块就能实现同步更新
      console.log("duratio的值：", innerAudioContext.duration);
      that.setData({
        duration: innerAudioContext.duration.toFixed(2) * 100,
        curTimeVal: innerAudioContext.currentTime.toFixed(2) * 100,
      })
      console.log(this.data.curTimeVal);
    })

    //播放到最后一秒
    if (innerAudioContext.duration.toFixed(2) - innerAudioContext.currentTime.toFixed(2) <= 0) {
      that.setStopState(that)
    }
    innerAudioContext.onEnded(() => {
      that.setStopState(that)
    })
  },

  //拖动滑块
  slideBar: function(event){
    var that = this;
    var curval = event.detail.value; 
    console.log('滑块：'+curval);
    //滑块拖动的当前值
    innerAudioContext.seek(curval); 
    //让滑块跳转至指定位置
    innerAudioContext.onSeeked((res) => {
      that.updateTime(that) //注意这里要继续出发updataTime事件，
    })
  },

  setStopState: function(that){
    that.setData({
      curTimeVal: 0
    })
    innerAudioContext.stop()
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