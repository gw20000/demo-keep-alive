

/**
 * {页面加载时的 进度条效果}   可以配置颜色： this.cofig.color = "..."
 */
export default {
         
         colorMap:{
              blue: 'rgb(87, 87, 219)',
              red:"red",
              orange:"orange",
              green:"green",
               
         },

       
        config:{
            color:"blue"
        },
 
         

          start(){
               if(!this.colorMap[this.config.color]) this.config.color = "blue";

              let loadingBarDom = document.querySelector('#loading-bar');
              if(!loadingBarDom){
                loadingBarDom = document.createElement("div");
                loadingBarDom.id = "loading-bar";
                loadingBarDom.style.background=`linear-gradient(to right,${ this.colorMap[this.config.color]} 50%,white 60%,${this.colorMap[this.config.color]})`;
                document.body.appendChild(loadingBarDom);
              
              }
              loadingBarDom.style.display = "block";

          },
          finish(){
            document.querySelector('#loading-bar').style.display = "none";
          }
          
         
    
}