<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">
      Open Modal with customized footer
    </a-button> -->
    <a-modal

     v-model="_visible" title="新增员工" on-ok="handleOk">

      <template slot="footer">
        <a-button key="back" @click="handleCancel">
         取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk"  >
          提交
        </a-button>
      </template>
      

        <Form :doSubmit="doSubmit"
         @submited="doSubmit=$event"
          @changeV="$emit('changeV',$event)"
          @success="$emit('success',$event)"
          />
      

    </a-modal>
  </div>
</template>
<script>
export default {
  name:"Modal",
  model:{
    prop: "visible",
    event: "changeV"
  },
  props:{
       visible:{
         type:Boolean,
         default:false,
       }
  },
  data() {
    return {
      loading: false,
      doSubmit:false,
   
    };
  },
  computed:{
       _visible:{
             get(){
                 return this.visible;
             },
             set(val){
              
                 this.$emit("changeV",val);

             }
       }
  },
  methods: {
    showModal() {
      // this.visible = true;
      this.$emit("changeV",true);
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {

        this.doSubmit = true;
        console.log("doSubmit",this.doSubmit);



            // this.visible = false;
            // this.$emit("changeV",false);
        this.loading = false;
      }, 1000);


    },
    handleCancel(e) {
      // this.visible = false;
          this.$emit("changeV",false);
    },
  },
};
</script>


<style lang="less" scoped>

</style>