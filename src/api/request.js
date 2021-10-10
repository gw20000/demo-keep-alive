import axios from "axios"
import { message} from "ant-design-vue"

const instance = axios.create({
    baseURL:"https://mallapi.duyiedu.com/",
    // baseURL:"/",


});

//请求拦截器（发送请求之前，先经过我）
instance.interceptors.request.use(config=>{
    //请求没问题 做什么
    console.log(config)
    return config;
 
},err=>{
    //请求有问题 做什么
    console.log("请求有问题");
     throw new Error(err)
});


//响应拦截器（响应到达时，先经过我）
instance.interceptors.response.use(resp=>{
    //响应没问题 做什么

    console.log(resp.data);
  

    if( resp.data.status!="success")  {
        message.error(resp.data.msg);
        return null;
}
     return resp.data;
   
},err=>{
      //响应有问题 做什么
     console.log("响应有问题");
     throw new Error(err)
    
});



export default instance