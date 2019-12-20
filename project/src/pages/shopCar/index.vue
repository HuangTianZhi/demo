<template>
  <div class="wrap">
    <div class="empty" v-if="empty">
      <div>购物车为空，赶紧去添加吧！o((≧▽≦o)</div>
      <button type="primary" @click="toHome" size="mini">去购物</button>
    </div>
    <div class="shop-box" v-for="(item,index) of shop" :key="index">
      <div class="top">
        <checkbox v-show="show" :checked="item.check" @click="handleClick(index)" />
        <img class="book-img" mode="aspectFit" :src="'http://localhost:3010/'+item.pic" alt />
        <div class="content" v-show="show">
          <div class="name">{{item.title}}</div>
          <div class="price">
            <span class="new-price">￥{{item.new_price}}</span>
            <span class="old-price">￥{{item.old_price}}</span>
          </div>
          <div class="number">×{{item.count}}</div>
        </div>
        <div class="edit" v-show="!show">
          <div class="count-box">
            <div class="left" @click="cut(index)">-</div>
            <div class="count">{{item.count}}</div>
            <div class="right" @click="add(index)">+</div>
          </div>
          <img
            @click="del(index)"
            class="del-icon"
            mode="aspectFit"
            src="/static/images/删 除.png"
            alt
          />
        </div>
        <img
          class="edit-icon"
          v-show="show"
          mode="aspectFit"
          src="/static/images/修改.png"
          alt
          @click="showChange()"
        />
        <button class="finish" v-show="!show" @click="showChange()">完成</button>
      </div>
      <div class="bottom">
        <div class="add">加价购</div>
        <div class="info">购买1件，即可享受折价优惠</div>
      </div>
    </div>
    <div class="accounts">
      <div>
        <checkbox :checked="isCheck" @click="allChoose" />全选
      </div>
      <div class="totle">合计：￥{{totleAdd}}</div>
      <div class="totle-box">结算({{numAdd}})</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      show: true,
      shop: [],
      allCheck: false,
      totle: 0,
      num: 0
    };
  },
  computed: {
    //合计
    totleAdd() {
      //定义中转变量 不用data里的数据直接return 不然会有叠加bug
      this.totle = 0;
      this.shop.forEach(item => {
        if (item.check == true) {
          this.totle += item.new_price * item.count;
        }
      });
      return this.totle;

      //用reduce方法
      // return this.shop.reduce((val, item, index, arr) => {
      //   if (item.check == true) {
      //     return val + item.price * item.count;
      //   } else {
      //     return val;
      //   }
      // }, 0);
    },
    //count合计
    numAdd() {
      //定义中转变量 不用data里的数据直接return 不然会有叠加bug
      this.num = 0;
      this.shop.forEach(item => {
        if (item.check == true) {
          this.num += item.count;
        }
      });
      return this.num;
    },
    //全选 判断只要有一个不选就不选
    isCheck() {
      if (this.shop == "") {
        return this.allCheck=false;
      } else {
        let flag = this.shop.every(item => {
          return item.check == true;
        });
        return (this.allCheck = flag);
      }
    }
  },
  methods: {
    showChange() {
      this.show = !this.show;
    },
    toHome() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    //单选
    handleClick(i) {
      this.shop[i].check = !this.shop[i].check;
      wx.setStorageSync("shopCar", this.shop);
    },
    //全选
    allChoose() {
      this.allCheck = !this.allCheck;
      if (this.allCheck == true) {
        this.shop.forEach(item => {
          return (item.check = true);
        });
      } else {
        this.shop.forEach(item => {
          return (item.check = false);
        });
      }
      wx.setStorageSync("shopCar", this.shop);
    },
    //商品数量减1
    cut(index) {
      if (this.shop[index].count == 1) {
        this.shop[index].count = 1;
        wx.setStorageSync("shopCar", this.shop);
      } else {
        console.log(index);
        this.shop[index].count -= 1;
        wx.setStorageSync("shopCar", this.shop);
      }
    },
    //商品数量加1
    add(index) {
      this.shop[index].count++;
      wx.setStorageSync("shopCar", this.shop);
    },

    //删除
    del(i) {
      wx.showModal({
        title: "提示",
        content: "确定要删除该商品吗？",
        success: res => {
          if (res.confirm) {
            this.shop.splice(i, 1);
            wx.setStorageSync("shopCar", this.shop);
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) {
              return;
            }
            page.onLoad();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  },
  onLoad(option) {
    console.log(this.totle);
    this.shopArr = wx.getStorageSync("shopCar") || [];
    this.shop = this.shopArr;
    if (this.shop == "") {
      this.empty = true;
    } else {
      this.empty = false;
    }
  },
  onTabItemTap() {
    this.shopArr = wx.getStorageSync("shopCar") || [];
    this.shop = this.shopArr;
    this.show=true;
    if (this.shop == "") {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }
};
</script>
<style scoped lang="less">
.wrap {
  background-color: #f3f3f3;
  overflow: hidden;
  .empty {
    font-size: 22px;
    text-align: center;
    color: red;
    background-color: #fff;
    button {
      margin-top: 50rpx;
    }
  }
  .shop-box {
    width: 710rpx;
    height: 330rpx;
    border-radius: 30rpx;
    margin: 20rpx auto;
    background-color: #fff;
    .top {
      width: 100%;
      height: 240rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        margin-left: 20rpx;
      }
      .book-img {
        width: 210rpx;
        height: 210rpx;
        margin-left: 20rpx;
      }
      .content {
        width: 352rpx;
        height: 210rpx;
        .name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          line-height: 128rpx;
          .new-price {
            color: red;
          }
          .old-price {
            color: #b4b4b4;
            text-decoration: line-through;
          }
        }
      }
      .edit-icon {
        width: 30rpx;
        height: 30rpx;
        align-self: flex-end;
        margin-right: 20rpx;
      }
      .edit {
        margin-left: 20rpx;
        .count-box {
          display: flex;
          border: 1px solid #d1d1d1;
          text-align: center;
          line-height: 70rpx;
          .left,
          .right {
            width: 60rpx;
          }
          .left {
            border-right: 1px solid #d1d1d1;
          }
          .right {
            border-left: 1px solid #d1d1d1;
          }
          .count {
            width: 150rpx;
          }
        }
        .del-icon {
          width: 30rpx;
          height: 30rpx;
          float: right;
          margin-top: 20rpx;
          margin-right: 20rpx;
        }
      }
      .finish {
        height: 200rpx;
        padding-left: 5rpx;
        padding-right: 5rpx;
        border-radius: 0;
        line-height: 200rpx;
        margin-right: 0;
        margin-left: 0;
      }
    }
    .bottom {
      display: flex;
      font-size: 12px;
      margin-top: 20rpx;
      .add {
        color: red;
        border: 1px solid red;
        padding: 2rpx;
        border-radius: 2rpx;
        margin-left: 60rpx;
        margin-right: 10rpx;
      }
      .info {
        color: #8e8e8e;
        line-height: 40rpx;
      }
    }
  }
  .accounts {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 750rpx;
    height: 95rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    .totle-box {
      width: 235rpx;
      height: 95rpx;
      border-radius: 95rpx;
      background-color: #ed1c15;
      color: white;
      text-align: center;
      line-height: 95rpx;
    }
  }
}
</style>