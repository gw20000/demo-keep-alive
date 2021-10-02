<template>
  <div class="layout-container">



    <Layout1 :leftWidth="isCollpase ? 0 : 200">
          <template #left>

           <SideAside :menuData="menuData"/>
 
          </template >
           <template #default>
            
              <Header :headerData="cachedComponents" :sideAsideWidth="isCollpase ? 0 : 200" />
              <keep-alive :include="cachedCompNames" :max="10">
              <RouterView/>
              </keep-alive>
          </template >
           <template #right>
         
            
          </template>
      </Layout1>
  </div>
</template>

<script>
// @ is an alias to /src
import SideAside from '@/components/SideAside'
import Layout1 from '@/components/Layout1'
import Header from "@/components/Header"
import {mapState,mapGetters} from "vuex"
export default {
  name: 'Layout',
  components: {
  SideAside,
  Layout1,
  Header
  },
  //模拟menuData数据
  data(){
    return{
        // menuData:{},
    }
  },

   computed:{
   //  newMenuData(){
   //     return this.menuData;
   //  },
    ...mapState('setting',["menuData","isCollpase"]),

    ...mapState('cachedComponents',["cachedComponents"]),
    ...mapGetters('cachedComponents',["cachedCompNames"]),//等同于下面这个计算属性的写法：//仓库的计算属性类似组件的计算属性，也是有缓存的
    
      //  cachedCompNames(){
      //   return  this.$store.getters["cachedComponents/cachedCompNames"];
      //   }
 },
mounted(){
  //  console.log(this.menuData);
  //  console.log(this.cachedComponents);
}
  
}
</script>

<style scoped lang="less">
 @import "~@/styles/mixin.less";

.layout-container{
  
    .full-relative-father(fixed);
}


</style>