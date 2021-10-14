<template>
  <div class="form-login-container">
  <a-form
    id="login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'email',
             {
               rules: [
               { required: true, message: '请输入邮箱!' },
                 
                {validator: validateEmail},
          
              
               ] ,
                 trigger:'change',
           }
           


        ]"
        placeholder="邮箱"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>


    <a-form-item v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] ,
            trigger:'change',
          },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

 <a-form-item v-bind="tailFormItemLayout" style="position:relative" >
     <a-button :loading="loading" type="primary"  html-type="submit" class="login-form-button">
       登录 
      </a-button>
      
       <a href="">
        注 册
      </a>

</a-form-item>
  </a-form>

  </div>
</template>

<script>
import {user} from "@/api"

export default {
    name:'FormLogin',
    data(){
        return {
 formItemLayout: {
        labelCol: {
          xs: { span:5 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span:25 },
          sm: { span: 25 },
        },
      },
 tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span:  25,
            offset: 0,
          },
        },
      },
      loading:false,
        }
    },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' });
  },
  methods: {
      //🔥表单验证
      validateEmail(rule,value,callback){
           const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        console.log("value",value);
          
          let isValid =   emailReg.test(value)
        //  console.log("value",value,isValid);
           
           if(!isValid) callback(`${ !value ? '' : '邮箱格式不正确!'}`)
            
           else{
                 callback();
           }

            
      
      },
      //🔥表单提交
     handleSubmit(e) {
   
      e.preventDefault();
      this.form.validateFields( async (err, values) => {
          
        if (!err) {
                         this.loading = true;
                    //  console.log("values",values);
        
                      const resp=  await user.login(values);
                        this.loading = false;
                      if(resp){
                         //更新仓库用户信息
                          
                       this.$store.commit("user/setLogin",resp.data);
                         //跳转到主页
                         console.log(this.$route.query.name);
                         console.log( this.$store.state.user.user);
                       
                        if(this.$route.query.name) this.$router.push({name:this.$route.query.name});
                        else this.$router.push({name:'Home'});
                        
                      }

                

                     
                 
             
             


        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
#login .login-form {
  max-width: 500px;
  
}
/* #login .login-form-forgot {
  float: right;
} */
#login .login-form-button {
  width: 100%;
}
.center{
  .self-center-pos();
}
</style>