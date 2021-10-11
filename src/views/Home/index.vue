<template>
  <div class="home-container">
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"Home",

}
</script>
<style lang="less" scoped>
   .home-container{
  
     width:100%;
     overflow-x: hidden;
   }
</style>
