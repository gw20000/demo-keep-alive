




//得到当前时间    '2021/9/30 下午8:04:22'
function getCurrent(){

    return new Date().toLocaleString(); //创建一个日期对象，得到当前时间
   
   }
   
   
   // 在一个dom中tick
   function tick(dom){
   
   
   let timer = setInterval(()=>{
   
     dom.innerHTML= getCurrent();
   
   },1000);
   
   }
   
   
   //立马在dom中显示一次tick ，然后tick
   export function showClock(dom){
   
    dom.innerHTML = getCurrent();
   
    dom.clientHeight; //一开始就显示当前时间 ， 强制浏览器渲染一次
   
    tick(dom);
   
   }
   
   
   
   
   
   //延迟函数： 等待一段时间 ，返回的是一个Promise实例 ， 需要与 Promise API 或 async await 配合使用
   export function delay(duration){
       return new Promise(resolve=>{
           setTimeout(()=>{
               resolve();
           },duration);
           
       });
   }
   
   
   
   
   //格式化日期对象
   //封装Date.getFormatText();// 扩展 Date对象
   
   export function getFormatText(timestamp,showTime=false,showDay=false) {
   
       const date = new Date(+timestamp);
       const month = (date.getMonth()+1).toString().padStart(2,'0')
       const day =  date.getDate().toString().padStart(2,'0');
       let str =  `${date.getFullYear()}-${month}-${day}`;
    
       if(showTime){
            const  hour= date.getHours().toString().padStart(2,'0');
            const minute= date.getMinutes().toString().padStart(2,'0');
            const second= date.getSeconds().toString().padStart(2,'0');
    
           str+=` ${hour}:${minute}:${second} `;
       }
       if(showDay){
         const  dayMap={
               "1":'周一',
               "2":'周二',
               "3":'周三',
               "4":'周四',
               "5":'周五',
               "6":'周六',
               "0":'周日'
   
         }
         const day =dayMap[date.getDay().toString()];
     
          str+=` ${day}`;
       }
       return str;
    }
   
   
    // const timestamp =  new Date();
   
   Date.prototype.getFormatText = function (showTime=false,showDay=false) {
   
      // return  getFormatText.call(null,this.getTime(),showTime,showDay);//this指向Date实例
   
      //也可以 Date对象 前面加一个+ ，就变成时间戳了
      return  getFormatText.call(null,+this,showTime,showDay);//this指向Date实例
   
   } 
   
   
   // console.log(timestamp);
   
   // console.log(new Date().getFormatText()); //什么都不带
   
   // console.log(new Date(1633004540514).getFormatText(true)); //带 时分秒
   
   // console.log(new Date().getFormatText(true,true));// 带时分秒  带星期
   
   
   
   
   
   
   
   
   
   
   
   
   
   