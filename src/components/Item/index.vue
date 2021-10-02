<template>
  <div class="item-container">
     <span>{{content}}</span>
  </div>
</template>

<script>
export default {
  name:"Item",
  props:["content"]
}
</script>

<style lang="less" scoped>
 
.item-container{
    cursor: pointer;
    color:white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: gray;
    box-sizing: border-box;
    border: 1px solid white;
 
    border-radius: 7px;
    height: 40px;
  

}

</style>