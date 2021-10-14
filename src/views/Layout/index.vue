<template>
  <div class="layout-container">

    <!-- 如果不是移动端 -->
    <Layout1  v-if="!isMobile"   :leftWidth="isCollpase ? 0 : 200"   >
          <template #left>

           <SideAside :menuData="menuData"/>
 
          </template >
           <template #default>
            
              <Header class="header"   :headerData="cachedComponents" :sideAsideWidth="isCollpase ? 0 : 200" />
               <div class="route-pointer">
             {{`上海青浦苏宁电器管理系统 ${$route.meta.module ? "/ "+$route.meta.module : ''} / ${$route.meta.title}`}}
              </div>
        
              
         <!-- :include="cachedCompNames"  :max="3" -->
              <keep-alive :include="cachedCompNames2" >
              <RouterView/>
              </keep-alive>

          </template >
           <template #right>
         
            
          </template>
      </Layout1>





<!-- 如果是移动端 -->
    <Layout1   v-if="isMobile"  :leftHeight="isCollpase ? 0 : 500">
          <template #left>

           <SideAside :menuData="menuData"/>
 
          </template >
           <template #default>
            
              <Header class="header"   :headerData="cachedComponents" :sideAsideWidth="isCollpase ? 0 : 200" />
               <div class="route-pointer">
             {{`上海青浦苏宁电器管理系统 ${$route.meta.module ? "/ "+$route.meta.module : ''} / ${$route.meta.title}`}}
              </div>
        
              
         <!-- :include="cachedCompNames"  :max="3" -->
              <keep-alive :include="cachedCompNames2" >
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
    ...mapState('setting',["menuData","isCollpase","isMobile"]),

    ...mapState('cachedComponents',["cachedComponents"]),
    ...mapGetters('cachedComponents',["cachedCompNames","cachedCompNames2"]),//等同于下面这个计算属性的写法：//仓库的计算属性类似组件的计算属性，也是有缓存的
    
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
  
    .full-pos-father(fixed);
}


.route-pointer{

  margin-top:50px;
  text-align: left;
}
.header{
  position: fixed;
 
  opacity: .9;
}
</style>