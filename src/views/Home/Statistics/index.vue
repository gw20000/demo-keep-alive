<template>
  <div class="index-container">
     <Card />
     <Chart/>
  </div>
</template>

<script>
import Card from "./Card.vue"
import Chart from "./Chart.vue"
export default {
  name:"Index",
  components:{
     Card,
     Chart,
  
  }
}
</script>
<style lang="less" scoped>
.index-container{
  width:100%;
  overflow-x:hidden;
}
</style>