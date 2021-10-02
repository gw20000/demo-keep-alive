<template>
  <div id="app">
   

        
      
        <!-- 🔥class  和 style 属性 会注入到 组件LongList 的根元素上  -->
          <VirtualScroller class="longlist"  style="font-size:16px;"  :data="data"  :itemHeight="50" :keyField="'id'" >

          <!-- 🔥插槽内容中的数据 只有子组件中才有， 所以，需要 子组件需要通过绑定插槽数据（绑定一个插槽数据为动态数据），来向父组件传递数据，  即要使用 作用域插槽 ： 子组件通过插槽向父组件传递数据 -->
           <template v-slot:default = "{item}" >
                 <ListItem :itemData = item  class="item"/>
           </template>
                     
          </VirtualScroller>





  
  </div>
</template>

<script>


import { getAll} from "@/api/staffs"

import ListItem from '@/components/ListItem'

import VirtualScroller from './index'


export default {
  name: 'Test',
  components: {

    ListItem,
   
    VirtualScroller

  },
  data() {
      return {
        data:[],
       
      }
  },
   methods:{
      async getAllStudents(){
          this.data = await getAll();
         
       },
       getRandomH(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
       }
   },
 created(){
        
          this.getAllStudents();

      },

}
</script>

<style  lang="less"  scoped>

body{
display:flow-root;//专门用来触发bfc，无副作用
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: space-evenly;
//   width:100vw;
//   height: 100vh;
}

.longlist{
box-sizing: border-box;
  color: red;
  height: 501px;
  width:300px;
   border: 1px solid black;
   margin:  0 auto;
//    height: 100%;
//    width: 100%;
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
  border-bottom:1px solid black;
//    &:last-child{
//        border-bottom: 0px ;
//    }
 } 



</style>
