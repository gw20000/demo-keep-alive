<template>
  <div class="home-container">
    <h1>订单列表</h1>
    <Input placeholder="Search orders..."/>

    <VirtualScroller v-if="false" class="longlist"  style="font-size:16px;"  :data="data"  :itemHeight="50" :keyField="'id'">
             
               <template v-slot:default = "{item}" >
                 <ListItem :itemData = item  class="item"/>
              </template>
          
     </VirtualScroller>


          <!-- 🔥class  和 style 属性 会注入到 组件LongList 的根元素上  -->
          <RecycleScroller v-if="true" class="scroller"  :items="data"  :item-size="50"  :key-field="'id'"
              >

          <!-- 🔥插槽内容中的数据 只有子组件中才有， 所以，需要 子组件需要通过绑定插槽数据（绑定一个插槽数据为动态数据），来向父组件传递数据，  即要使用 作用域插槽 ： 子组件通过插槽向父组件传递数据 -->
           <template v-slot:default = "{item}" >
                 <ListItem :itemData = item  class="item"/>
           </template>
                     
          </RecycleScroller>
      




  </div>
</template>

<script>
import { RecycleScroller } from  'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { getAll} from "@/api/staffs"
import Input from "@/components/Input"
import VirtualScroller from "@/components/VirtualScroller"
import ListItem from "@/components/ListItem"
export default {
  name:"OrderList",
  components:{
      Input,
    VirtualScroller,
    ListItem,
   RecycleScroller,

  },
  data() {
      return {
        data:[],
       
      }
  },
  // computed:{
  //   ...mapState(),
  // },
  methods:{
     
      async getAllStudents(){
          this.data = await getAll();
         
       },
      //  getRandomH(min,max){
      //   return Math.floor(Math.random()*(max-min+1))+min;
      //  }
  },
   created(){
        
          this.getAllStudents();

      },

}
</script>
<style lang="less" scoped>
.home-container{
 width: 100%;
}

h1{
  font-family: 'Times New Roman', Times, serif;
  margin-top: 8px;
  
}


.longlist{
box-sizing: border-box;
  color: red;
  height: 501px;
  // width:300px;
   border: 1px solid black;
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



.scroller{
  font-size: 1rem;
  height: 501px;
//   width:300px;
  width: 100%;
  overflow: auto;
  margin: 0 auto ;
  border-bottom:1px solid black;
 
  
}
</style>