//辅助函数 延迟

function delay(duraing){
    return new Promise(resolve=>{
   
          setTimeout(()=>{
   
             resolve();
   
          },duraing);
   
    });
   }
   
   function Student(id,name) {
       this.id = id;
       this.name = name ;
       this.age = Math.floor(Math.random()*(100-18+1)+18);
        
   }
   

   
   export async function getAll(){
   
       await delay(1000);
       const   data = [];
        for(var i =1; i<=100; i++){
       
           data.push(new Student(i,`name${i}`));
        }
     return data;
   }