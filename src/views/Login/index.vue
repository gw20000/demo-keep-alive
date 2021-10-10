<template>
  <div class="login-container">
      <div class="title">上海青浦苏宁电器管理系统</div>
      <FormLogin />

  </div>
</template>

<script>
import  FormLogin from "./components/FormLogin"
export default {
 name:"Login",
  components:{
    FormLogin,
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.title{
  font-size: 1.3rem;
  margin-bottom: 10px;
}
.login-container{
       max-width:500px;
         margin:  80px auto 20px;
}
.form-login-container{
    max-width:500px;
      border-radius: 18px;
 
    border:1px solid @lightGray;
    padding: 50px;
}

@media( max-width:650px){
  .form-login-container{

        border:1px solid transparent;
      
  }
 
}
</style>