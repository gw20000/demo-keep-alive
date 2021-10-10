<template>
  <a-form :form="form" @submit="handleSubmit">
    
    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入确认密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    
  </a-form>
</template>

<script>

export default {
  name:'FormModifyPwd',
  props:{
          doSubmit:{
            type:Boolean,
            default:false,
          }
  },
  data() {
    return {
      confirmDirty: false,
    
      // autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 3 ,
              //  offset: 300,
          },
          sm: { span: 5 ,
          //  offset: 300,
          },
        },
        wrapperCol: {
          xs: { span: 24,
           offset: 300,
           },
          sm: { span: 16,
           offset: 300, },
        },
      },

      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 30,
            offset: 300,
          },
          sm: {
            span: 16,
            offset: 308,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'modifyPwd' });
  },
  methods: {
    async handleSubmit(e) {
      // e.preventDefault();
      console.log("submit0000");
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          
          console.log('Received values of form: ', values);

         //请求/调用 后端 修改密码的接口          

          this.$emit('changeV',false);




        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  
  },
  watch:{
    doSubmit:{

     async handler(){

         
         if (this.doSubmit==true ) {

        console.log(" trigger doSubmit",this.doSubmit);
          await  this.handleSubmit();  

       
        this.$emit("submited",false);

        // console.log(this.form.getFieldsValue());
      

         } 

      }
     
         
    }
}
};
</script>