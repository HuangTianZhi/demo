<template>
  <div class="wrap">
    <div class="search-nav">
      <img src="/static/images/当当网.png" />
      <div class="text-box">
        <icon class="icon" type="search" size="22" />
        <input type="text" placeholder="搜索商品/店铺/种类" />
      </div>
      <img src="/static/images/分类.png" />
    </div>
    <swiper :indicator-dots="true" :autoplay="true" :circular="true" class="swiper">
      <block v-for="(item,index) of swiper" :key="index">
        <swiper-item>
          <img :src="item" mode="widthFix" alt />
        </swiper-item>
      </block>
    </swiper>
    <ul class="type-box">
      <li v-for="(item,index) of typeList" :key="index" @click="toType(item.type)">
        <img :src="'http://localhost:3010/'+item.pic" mode="aspectFit" alt />
      </li>
    </ul>
    <img
      mode="widthFix"
      class="banner"
      src="http://img60.ddimg.cn/upload_img/00803/1/1242x332_1111-1573543573.jpg"
      alt
    />
    <ul class="book-box">
      <li v-for="(item,index) of bookList" :key="index" @click="toDetail(item._id)">
        <div class="img-box">
          <img :src="'http://localhost:3010/'+item.pic" mode="widthFix" alt />
        </div>
        <div class="name">{{item.title}}</div>
        <div class="other">
          <div class="self">当当自营</div>
          <div class="one">满减</div>
        </div>
        <div class="price">￥{{item.new_price}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiper: [
        "http://img61.ddimg.cn/upload_img/00628/dangdang/1242-607_01-1573361397.jpg",
        "http://img62.ddimg.cn/upload_img/00803/1/1242x366_1111-1573543573.jpg",
        "http://img57.ddimg.cn/157400068504407_y.jpg",
        "http://img61.ddimg.cn/upload_img/00785/ts1113_1117/1242x366-1573531427.jpg",
        "http://img54.ddimg.cn/79140062210934_y.jpg",
        "http://img51.ddimg.cn/84110052943181_y.jpg",
        "http://img54.ddimg.cn/116550079328594_y.jpg",
        "http://img52.ddimg.cn/206770071858882_y.jpg"
      ],
      typeList: [],
      bookList: []
    };
  },

  methods: {
    toDetail(e) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${e}`,
        success: result => {
          wx.showLoading({
            title: "loading",
            mask: true,
            success: result => {
              wx.hideLoading();
            },
            fail: () => {},
            complete: () => {}
          });
        },
        fail: () => {},
        complete: () => {}
      });
    },
    toType(e){
      wx.reLaunch({
        url: `/pages/type/main?type=${e}`,
        success: result => {
          wx.showLoading({
            title: "loading",
            mask: true,
            success: result => {
              wx.hideLoading();
            },
            fail: () => {},
            complete: () => {}
          });
          
        },
        fail: () => {},
        complete: () => {}
      });
    }
  },
  onLoad() {
    wx.request({
      url: "http://localhost:3010/rank",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: res => {
        console.log(res.data);
        this.typeList = res.data;
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {}
    });
    wx.request({
      url: "http://localhost:3010/list",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: res => {
        console.log(res.data);
        this.bookList = res.data;
      },
      fail: () => {},
      complete: () => {}
    });
  },
};
</script>
<style scoped lang="less">
.search-nav {
  width: 750rpx;
  display: flex;
  justify-content: space-around;
  img {
    width: 73rpx;
    height: 60rpx;
  }
  .text-box {
    width: 540rpx;
    height: 60rpx;
    border-radius: 60rpx;
    background-color: #e8ebf0;
    display: flex;
    .icon {
      line-height: 107rpx;
      margin-left: 30rpx;
      margin-right: 10rpx;
    }
    input {
      height: 60rpx;
    }
  }
}
.swiper {
  margin-top: 15rpx;
  height: 223rpx;
  img {
    width: 750rpx;
  }
}
.type-box {
  width: 750rpx;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 20%;
    text-align: center;
    img {
      width: 160rpx;
      height: 160rpx;
    }
  }
}
.banner {
  width: 750rpx;
  border-top: 10rpx solid #dbdbdd;
  border-bottom: 10rpx solid #dbdbdd;
}
.book-box {
  width: 750rpx;
  background-color: #eef3f9;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 370rpx;
    background-color: #fff;
    padding-bottom: 20rpx;
    margin-bottom: 10rpx;
    .img-box {
      height: 400rpx;
      display: flex;
      justify-content: center;
      img {
        width: 265rpx;
        align-self: center;
      }
    }
    .name {
      margin-left: 0.5em;
      width: 300rpx;
      height: 90rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .other {
      margin-top: 40rpx;
      margin-bottom: 10rpx;
      width: 750rpx;
      display: flex;
      font-size: 12px;
      .self {
        border: 1px solid red;
        padding: 2rpx;
        text-align: center;
        color: red;
        margin-left: 0.5em;
        margin-right: 0.5em;
      }
      .one {
        background-color: red;
        padding: 2rpx;
        text-align: center;
        color: white;
      }
    }
    .price {
      margin-left: 0.5em;
      color: red;
    }
  }
}
</style>