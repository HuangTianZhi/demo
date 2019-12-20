<template>
  <div class="wrap">
    <div class="img-box">
      <img :src="'http://localhost:3010/'+detail.pic" mode="widthFix" alt />
    </div>
    <div class="content">
      <div class="title">
        <div class="self">当当自营</div>
        <div class="name">{{detail.title}}</div>
      </div>
      <div class="text">{{detail.dec}}</div>
      <div class="price">
        ￥{{detail.new_price}}
        <span>9.48折</span>
      </div>
      <div class="old-price">
        定价
        <span>￥{{detail.old_price}}</span>
      </div>
    </div>
    <div class="footer">
      <div class="icon-box">
        <img src="/static/images/店铺.png" alt />
        <div>店铺</div>
      </div>
      <div class="icon-box" @click="toShopcar()">
        <img src="/static/images/购物车.png" alt />
        <div>购物车</div>
      </div>
      <div class="btn-box">
        <button>立即购买</button>
        <button @click="addShop(detail._id)">加入购物车</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detail: {}
    };
  },

  methods: {
    toShopcar() {
      wx.switchTab({
        url: "/pages/shopCar/main",
        success(res) {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) {
            return;
          }
          page.onLoad();
        }
      });
    },
    addShop(e) {
      //添加购物车到后台
        wx.request({
        url: "http://localhost:3010/cart",
        data: {
          id:e
        },
        header: { "content-type": "application/json" },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: res => {
          console.log(res.data);
        },
        fail: err => {
          console.log(err);
        },
      });


      let arr = wx.getStorageSync("shopCar") || [];
      let index = arr.findIndex(item => {
        return item._id == e;
      });
      if (index == -1) {
        this.detail.count = 1;
        this.detail.check=true;
        arr.push(this.detail);
        wx.setStorageSync("shopCar", arr);
        wx.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 1000,
          mask: false
        });
      } else {
        arr[index].count++;
        this.detail.check=true;
        wx.setStorageSync("shopCar", arr);
        wx.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 1000,
          mask: false,
          success: result => {
            wx.navigateTo({
              url: "/pages/shopCar/main"
            });
          },
          fail: () => {},
          complete: () => {}
        });
      }
    }
  },
  onLoad(option) {
    console.log(option);
    let id = option.id;
    wx.request({
      url: "http://localhost:3010/list",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: res => {
        console.log(res.data);
        let detail = res.data.find(item => {
          return item._id == id;
        });
        this.detail = detail;
      },
      fail: () => {},
      complete: () => {}
    });
  },
};
</script>
<style scoped lang="less">
.img-box {
  width: 750rpx;
  height: 870rpx;
  border-top: 3px solid #d0d0d0;
  border-bottom: 3px solid #d0d0d0;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  display: flex;
  justify-content: center;
  img {
    align-self: center;
  }
}
.content {
  width: 710rpx;
  margin: 0 auto;
  border-bottom: 12rpx solid #f8f8f8;
  .title {
    padding-top: 30rpx;
    padding-bottom: 22rpx;
    display: flex;
    align-items: center;
    .self {
      padding: 8rpx;
      border-radius: 35rpx;
      background-color: red;
      color: white;
      text-align: center;
      font-size: 12px;
      margin-right: 15rpx;
    }
    .name{
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .text {
    font-size: 14px;
    color: #adaeb0;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .price {
    color: red;
    margin-top: 40rpx;
    margin-bottom: 25rpx;
    span {
      font-size: 12px;
      color: #95969b;
      vertical-align: text-bottom;
    }
  }
  .old-price {
    font-size: 14px;
    color: #95969b;
    span {
      text-decoration: line-through;
    }
  }
}
.footer {
  width: 750rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .icon-box {
    width: 100rpx;
    box-sizing: border-box;
    padding-top: 10rpx;
    text-align: center;
    img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .btn-box {
    display: flex;
    button {
      width: 217rpx;
      line-height: 100rpx;
      text-align: center;
      border: none;
      color: white;
      border-radius: 0;
      font-size: 14px;
    }
    button:nth-child(1) {
      background-color: #ffbe24;
    }
    button:nth-child(2) {
      background-color: #f5544c;
    }
  }
}
</style>