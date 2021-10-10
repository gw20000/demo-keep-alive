

import instance from "./request"



export const  login =  async (userInfo)=>{
      return   await  instance.post('/passport/login',userInfo);   
}