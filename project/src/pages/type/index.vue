<template>
  <div class="wrap">
    <ul class="nav">
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%" scroll-left="800rpx">
        <li
          v-for="(item,index) of typeList"
          :key="index"
          :class="className==item.type? 'active':'' "
          @click="click(item.type)"
        >{{item.type}}</li>
      </scroll-view>
    </ul>
    <div class="content">
      <div class="box" v-for="(item,index) of showBooks" :key="index">
        <div class="left">
          <img :src="'http://localhost:3010/'+item.pic" mode="widthFix" alt />
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="author">作者：{{item.author}}</div>
          <div class="self">当当自营</div>
          <div class="price">
            <span class="red">￥{{item.new_price}}</span>
            <span class="gra">￥{{item.old_price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookList: [],
      typeList: [],
      showBooks: [],
      className: "畅销榜"
    };
  },

  methods: {
    click(e) {
      this.className = e;
      let showBooks = this.bookList.filter(item => {
        return item.type == e;
      });
      this.showBooks = showBooks;
    },
    scroll(e) {
      console.log(e);
      console.log("111");
    }
  },


  onLoad(option) {
    wx.request({
      url: "http://localhost:3010/rank",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: res => {
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
        this.bookList = res.data;
        let name = option.type;
        if(name==""){
          this.className="畅销榜"
        }else{
          this.className = name;
        }
        let Books = this.bookList.filter(item => {
          return item.type == this.className;
        });
        this.showBooks = Books;
      },
      fail: () => {},
      complete: () => {}
    });

    console.log(this.bookList);
  },

  onTabItemTap() {
    wx.request({
      url: "http://localhost:3010/list",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: res => {
        this.bookList = res.data;
        this.className="畅销榜";
        let Books = this.bookList.filter(item => {
          return item.type == this.className;
        });
        this.showBooks = Books;
      },
      fail: () => {},
      complete: () => {}
    });
  }
};
</script>
<style scoped lang="less">
.nav {
  width: 750rpx;
  white-space: nowrap;
}
.nav li {
  display: inline-block;
  line-height: 70rpx;
  padding-left: 15rpx;
  padding-right: 15rpx;
}
.active {
  border-bottom: 2px solid red;
}
.content {
  margin-top: 30rpx;
  border-top: 1px solid #d0d0d0;
  .box {
    border-bottom: 1px solid #d0d0d0;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    display: flex;
    .left {
      width: 200rpx;
      padding-left: 30rpx;
      padding-right: 30rpx;
      display: flex;
      justify-content: center;
      img {
        align-self: center;
      }
    }
    .right {
      flex: 1;
      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .author {
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        font-size: 14px;
        color: #d0d0d0;
      }
      .self {
        width: 110rpx;
        padding: 8rpx;
        border-radius: 35rpx;
        background-color: red;
        color: white;
        text-align: center;
        font-size: 12px;
      }
      .price {
        color: red;
        margin-top: 40rpx;
        margin-bottom: 25rpx;
        .gra {
          font-size: 12px;
          color: #d0d0d0;
          vertical-align: text-bottom;
          text-decoration: line-through;
          margin-left: 8rpx;
        }
      }
    }
  }
}
</style>