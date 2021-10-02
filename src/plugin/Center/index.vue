<template>
   <div class="center-container">
       <slot></slot>
   </div>
</template>

<script>
export default {
  name:"Center",
 
}
</script>

<style lang="less" scoped>
.center-container{
     display: flex;
     justify-content: center;
     align-items: center;
}
</style>