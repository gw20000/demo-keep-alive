<template>

      <input  v-model="val"  type="search" class="form-control ds-input"  placeholder="Search sth..." spellcheck="false" >

</template>

<script>
export default {
    name:"Input",

    data(){
        return{
            val:"",
        }
    },
    watch:{
        val(){
            this.$emit('input',this.val)
        }
    }
}
</script>

<style lang="less" scoped>

.form-control{
  width:80%;
  display: block;
  margin:20px  auto;
}
</style>