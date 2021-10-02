<template>
<div class="side-aside-container">

<div class="title">
     <span>上海青浦苏宁店</span>
</div>
<!-- <div class="slide-left">
<i class="bi-chevron-bar-left" style="font-size: 2rem; color: white;"></i>
</div> -->

<router-link to="/"  :style="{backgroundColor:`${this.$route.path==='/' ? '#0d6efd' : '' }`}" class="home" ><i class="bi bi-house"></i><span>主页</span></router-link>

<DropDown v-for="(item,i) in menuData"  :key="i"  :dropDownData="item" :style="{transform:`translateY(${-i}px)`}"/>



</div>


</template>

<script>
import DropDown from "@/components/DropDown"
import {mapState} from  "vuex"
export default{
 name:"Layout",
 components:{
    DropDown,
 },
 props:["menuData"],
 data(){
    return{
      
      //  menuData:  [
      //        {
      //     title:"员工管理",
      //     iconClass:"bi-person-circle", //🐸 样式 和 数据 应该分离， 但，这里可以通过把远程数据，再次封装，将样式信息封装进去； html可以随意添加，逻辑附上去就行了，所以，样式 ，结构，逻辑功能，还是分开更好，易读易维护。。
      //     items:[
      //        {item: "员工列表",to:"/stafflist"},
      //          {item: "xxx",to:""},
      //            {item: "xxx",to:""},
            
      //     ]
      //  },
      //  {
      //     title:"订单管理",
      //     iconClass:"bi-card-list",
      //     items:[
      //         {item: "订单列表",to:"/orderlist"},
      //          {item: "xxx",to:""},
      //            {item: "xxx",to:""},
      //     ]
      //  }
        
      
       
      //  ]
   };
 },

 created(){
   //  console.log(this.$store);
  
 },

// mounted(){
//   console.log(this.menuData);
// }
}
</script>


<style lang="less" scoped>

.side-aside-container{
   color:whitesmoke;
    height: 100%;
    width:100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    overflow-y: auto;
}
.title{
   flex-shrink: 0;
   white-space: nowrap;
   font-family: 'Times New Roman', Times, serif;
    font-size: 24px;
     height: 80px;

    
     display: flex;
     justify-content: center;
     align-items: center;
      span{
          background: white;
          color: black;
      }
}
// .slide-left{
//    align-self: flex-start;
//    width:40px;
//    height:44px;
//    margin-bottom: 20px;

// }



.home{
      color: white;
      box-sizing: border-box;
      width: 100%;
       height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      border: 1px solid gray;
      transform: translateY(1px);

      .bi-house{
         margin-left:18px;
         
      }
      span{
            margin-left:20px;
         margin-right:35px;
      }
}
</style>