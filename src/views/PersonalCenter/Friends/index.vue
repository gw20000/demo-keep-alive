<template>
  <div class="about-container" >
    <h1>好友</h1>
     <Input placeholder="Search staffs..." @input="val=$event"/>
     <!-- <keep-alive :include="['VirtualScroller']" > -->
     <VirtualScroller  class="longlist"  style="font-size:16px;"  :data="data"  :itemHeight="50" :keyField="'id'">

               <template v-slot:default = "{item}" >
                 <!-- <keep-alive  :include="['ListItem']" :max="100"> -->
                 <ListItem :itemData = item  class="item"/>
                  <!-- </keep-alive> -->
              </template>

     </VirtualScroller>
       <!-- </keep-alive> -->
  </div>
</template>

<script>
import { getAll} from "@/api/staffs"
import Input from "@/components/Input"
import VirtualScroller from "@/components/VirtualScroller"
import ListItem from "@/components/ListItem"
import {tree} from "@/utils"
// import {mapState} from "vuex"
export default {
  name:"Friends",
  components:{
    Input,
    VirtualScroller,
    ListItem,

  },
  data() {
      return {
        data:[],
        // n:0,
        val:"",
       
      }
  },
  // computed:{
  //   ...mapState(),
  // },
  methods:{
     
      async getAllStudents(){
        // console.log("1111");
          this.data = await getAll();
            //  console.log("2222");
       },
      //  getRandomH(min,max){
      //   return Math.floor(Math.random()*(max-min+1))+min;
      //  }
  },
  watch:{

      val(){
          // 树的深度/广度搜索   （ 树的广度遍历 + 模糊查找（通过名字或id工号，两种模式），正则匹配，贪婪匹配）
          //搜索之前，可以先对搜索函数 做 防抖处理。  你触发的很频繁，但，我处理的不那么频繁。以节省效率，况且，异步操作，一定要等一会才能做完。
          //防抖不防抖，可以直接封装到 tree.js模块里面， 调用的时候通过函数参数来控制，或者，选择导入防抖 或 不防抖的方法。
          console.log("树的深搜/广搜:"+this.val);
         
          tree.breadthSearch();
          //搜索的时候，动态显示一个下拉框， 点击下拉框中的一个item，会弹出一个模态框 显示item的具体信息。

      }
  },
   created(){
        
          this.getAllStudents();
     
      },

      // activated(){
      //   console.log("StaffList 显示了");

    
      
      // },
      // deactivated(){
      //   console.log("StaffList 隐藏了");
      //   this.getAllStudents();
      // },

      



}
</script>


<style lang="less" scoped>
.about-container{
   width:100%;
 
}
h1{
  font-family: 'Times New Roman', Times, serif;
  margin-top: 8px;
  
}


.longlist{
box-sizing: border-box;
  color: red;
  height: 500px;
  // width:300px;
   border-bottom: 1px solid black;

 
   margin:  0 auto;
  //  height: 100%;
   width: 100%;
//    height: 100vh;
//    width: 100vw;
   overflow: auto;

}

.item{ 
  box-sizing: border-box;
  // margin: 10px 0px;
  // padding: 10px;
//    color:red;
   color:black;
//    background: aqua;
   background:transparent;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // height: 100%;
   height: 50px;  
 
//  border-top:1px solid black;
  border-bottom:1px solid gray;
//    &:last-child{
//        border-bottom: 0px ;
//    }
 } 

</style>