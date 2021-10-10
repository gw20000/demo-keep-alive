<template>
    <div class="input-container">
             <input  class="input-search" @focus="setColor"  @blur="resetColor" v-model="val"  type="search"  placeholder="Search sth..." spellcheck="false" >
             <a-icon  :style="{color:isFocus ? '#1890ff': 'rgb(44,62,82)'}" class="search-btn" type="search" />
    </div>
    
</template>

<script>
export default {
    name:"Input",

    data(){
        return{
            val:"",
            isFocus:false,
        }
    },
    methods:{
      setColor(){
          this.isFocus = true;
      },
      resetColor(){
           this.isFocus = false;
      }
    },
    watch:{
        val(){
            // console.log(this.val);
            this.$emit('input',this.val)
        }
    },
   
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.input-container{
   position: relative;
  margin: 10px auto;
   max-width: 500px;  
}
.search-btn{
position: absolute;
 font-size: 30px;
 right: 10px;
 top:50%;
 transform: translateY(-50%);
 
}
.input-search{
    font-size:1rem;
    border-radius: 18px;
    box-sizing: border-box;
 display: inline-block;

height: 40px;
border:1px solid @whiteGray;

padding-right: 40px ;
padding-left:20px;

  width:100%;

 background-color: #fff;


 &:focus{
     border: 1px solid gray;
 }


}
@media(max-width:650px){
    .input-container{
        max-width: 300px;
    }
}

</style>