<template >
<div class="orders-container">
     <keep-alive :include="cachedCompNames">
     <router-view></router-view>
     </keep-alive>
</div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
 name:"Orders",
  computed:{
     ...mapGetters("cachedComponents",["cachedCompNames"]),
 },
}

</script>

<style lang="less" scoped>
 .orders-container{
      width:100%;
     overflow-x: hidden;
 }
  

</style>