<template> 
  <div class="personal-center-container">
           <keep-alive :include="cachedCompNames">
           <router-view></router-view>
           </keep-alive>
  </div>
 
   
</template>

<script>
import {mapGetters} from "vuex"
export default {
 name:"PersonalCenter",
 computed:{
     ...mapGetters("cachedComponents",["cachedCompNames"]),
 },
// watch:{
//   cachedCompNames(){
//       console.log("0000",this.cachedCompNames);
//   }
// },
 activated(){
  console.log("Personal 显示了");
 },
 deactivated(){
  console.log("Personal 隐藏了");
 }


}
</script>

<style>
.personal-center-container{
   width:100%;
     overflow-x: hidden;
}
</style>