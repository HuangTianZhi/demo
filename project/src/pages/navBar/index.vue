<template>
    <div class="wrap">
        <ul class="nav">
            <li :class="id==0? 'active':'' " @click="click(0)" >首页</li>
            <li :class="id==1? 'active':'' " @click="click(1)" >广场</li>
            <li :class="id==2? 'active':'' " @click="click(2)" >我的</li>
        </ul>
        <div v-show="id==0">
            我是首页
        </div>
        <div v-show="id==1">
            我是广场页
        </div>
        <div v-show="id==2">
            我是我的页
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:0
        }
    },
     
    methods:{
        click(e){
            console.log(e)
            this.id=e
        }
    },
     
    created(){
     
    }
}
</script>
<style scoped>
.nav{
    width: 750rpx;
    display: flex;
    justify-content: space-around;

}
.nav li{
    line-height: 70rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
}
.active{
    border-bottom: 2px solid red;
}
</style>