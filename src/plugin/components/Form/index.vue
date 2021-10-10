<template>
  
<div class="form-container" >
  <a-form :form="form" >
    
    <a-form-item   has-feedback v-bind="formItemLayout">
      <span slot="label">
       姓名
       
      </span>
      <a-input
        v-decorator="[
          'realname',
          {
            rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
          },
        ]"
      />
    </a-form-item>
   


    <a-form-item has-feedback v-bind="formItemLayout" label="手机号">
      <a-input
        v-decorator="[
          'tel',
          {
            rules: [{ required: true, message: '请输入你的手机号码!' }],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">
            +86
          </a-select-option>
          <a-select-option value="87">
            +87
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    
   

    <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
      <a-input
        v-decorator="[
          'pwd',
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

    
    <a-form-item v-bind="formItemLayout" label="密码确认" has-feedback>
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


     


 <a-form-item v-bind="formItemLayout" label="类型"  >
      <a-radio-group
   
       v-decorator="[
      'type', 
       {
          //验证必填 就行了。 
            rules: [
              {
                required: true,
                message: '请选择员工类型!',
              },
              
           
            ],
           initialValue:'0'
       },
             ]"

      >
        <a-radio-button value="0">
          普通员工
        </a-radio-button>
        <a-radio-button value="1">
          主管
        </a-radio-button>
    
      </a-radio-group>
    </a-form-item>
   



  </a-form>


</div>
</template>

<script>

import { getAll,getStaffListByPage,add,del} from "@/api/staffs"
import{showMessage}from "@/utils"
export default {
    name:"Form",
    props:{
         doSubmit:{
             type:Boolean,
             default:false,
         }
    },
  data() {
    return {
  
      confirmDirty: false,
      autoCompleteResult: [],
         
      formItemLayout: {
        labelCol: {
          xs: { span: 22 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 20,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 0,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
    console.log("this.form",this.form);
  },


  methods: {

    async handleSubmit() {
   //提交之前， 表单输入验证
 this.form.validateFieldsAndScroll( async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

     let  {success } = await add({
            
             name:values.realname,
             sex: Math.random()-.5>0 ? 0 : 1 ,
             id:Math.floor(Math.random()*1000000),

          });


         console.log("add staff request sent");
       


        if(success) {
            // showMessage({content:"添加成功",type:"success"});
           console.log("添加成功")
           this.$emit('success',true);
           this.form.resetFields();
        }


        else {
        //    showMessage({content:"添加失败",type:"error"});
           console.log("添加失败")
           this.$emit('success',false);

        } 
       
        

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
      if (value && value !== form.getFieldValue('pwd')) {
        callback('2次密码输入不一致!');
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

<style lang="less" scoped>


</style>