

import {random} from "@/utils"

// console.log("randomName",random.randomName());



//辅助函数： 延迟

function delay(duraing){
    return new Promise(resolve=>{
   
          setTimeout(()=>{
   
             resolve();
   
          },duraing);
   
    });
   }
   //辅助函数： 构造函数 构造员工实例
   function Student(id,name,sex,createTime) {

       this.id = id;
       this.name = name ;
       this.sex = sex;
       this.createTime = createTime;
      //  this.age = Math.floor(Math.random()*(100-18+1)+18);
        
   }
   







   //获取全部员工
   let  data = [];
async function _getAll(){
     
       await delay(1000);
      if(data.length) return data;
      //  const   data = [];
        for(var i =1; i<=5; i++){
       
           data.push(
              new Student(i,random.randomName(),["男","女"][Math.random()>.5 ? 1 : 0],+new Date())
              );
        }
     return data;
   }





   //缓存data
   async function  cacheData(){

        data =  await _getAll();
    }

 

       cacheData();



export async function  getAll(){
      await delay(1000);
      return data;
}



window.getAll = getAll;


   // 分页获取员工列表数据
/**
 * 
 * @param {页码} page 
 * @param {页容量} pageItems 
 * @returns 
 */
  export async function  getStaffListByPage(page,pageItems){
   page = parseInt(page);
  //总数据
   const   data =  await getAll();
   // await delay(1000);

   //总页数
   const     pages = Math.ceil(data.length/pageItems);
   console.log("pages",data.length,pageItems,pages);
   //返回的制定页的数据
   const  pageData = []
   if(page>pages || pages<=0 )  return {pageData,dataAmount:0};

     let j = 0;
    for(var i =page*pageItems-pageItems; i<page*pageItems; i++){
       
       if(!data[i])break;
      //  pageData.push(
      //     new Student(i,`name${i}`,["男","女"][Math.random()>.5 ? 1 : 0],+new Date())
      //     );

      pageData[j]=data[i];
      j++;
    }

   //  console.log(pageData,pages);
 console.log( {pageData,dataAmount:data.length});

  return {pageData,dataAmount:data.length}
   }




   //新增员工
/**
 * 
 * @param {{id:12334343,name:"杨洋",sex:"1"}} options 
 * @returns 
 */
  export async function add(options){
let success = false ;
if(Math.random() - 0 > 0) success = true

if(!success) return {
   success:false,
   data:null,
}

const data = await getAll();
 
 const student  =  new Student(options.id,`${options.name}${options.id}`,["男","女"][options.sex],+new Date()) ;
    
data.unshift(student);

return {
      success:true,
     data:student,
}
 

  }





   
   //删除员工

   export async function del(id) {


      let success = false ;
      if(Math.random() - 0 > 0) success = true
      
      if(!success) 
      return {
         success:false,
         data:null,
      }
      


      let  data = await getAll();
      let delItem = null;
  
    let  delIndex =  data.findIndex((i,index,iniArr)=>{
           if(i.id===id){
              delItem = i;
              iniArr.splice(index,1);
            return true;
           }
       });

     if(delIndex===-1) 
      return {
         success:false,
         data:null,
     } 
    else  return {
      success:true,
      data:data[delIndex],
  } 
   
   // data = data.filter((i)=>{
   //    if(i.id!=+id){

   //      return true;
   //    }else{
   //       delItem = i;
   //        return false;
   //    }
   // });
   // return delItem;

     }