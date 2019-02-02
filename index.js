// components/uuid/index.js
const canvasId = "canvas_uuid";
const md5 = require('./utils/md5.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUUID: function () {
      let ctx = wx.createCanvasContext(canvasId, this);

      ctx.moveTo(10, 10)
      ctx.rect(10, 10, 100, 50)
      ctx.lineTo(110, 60)
      ctx.stroke()

      ctx.draw(false, () => {
        wx.canvasGetImageData({
          canvasId,
          x: 0,
          y: 0,
          width: 300,
          height: 150,
          success: (res) => {
            let base64 = wx.arrayBufferToBase64(res.data);
            let uuid = this.getHash(base64);
            console.log('uuid', uuid);
            this.triggerEvent('uuidready', { uuid });
          },
          fail: (err) => {
            console.log(err);
          }
        }, this);
      });
    },
    getHash(string) {
      return md5.hex(string);
    }
  },

  lifetimes: {
    ready() {
      this.getUUID((uuid) => {
        
      })
    }
  }
})
