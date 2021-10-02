//树的广度搜索

function breadthSearch() {




} 



//🌈树的查找  基于 树的广遍历

const _ageOver30 = [];

function _getOver30(root){
     if(root==null || root.length==0) return ; //树不存在， 肯定找不到。

     let tempLayerNodes = [];
         tempLayerNodes.push(root);
     let tempLayerNodesChilds = [];
    while(true){
        //调试
        //  console.log("layer");
        //  console.log(tempLayerNodes);

         //循环出口
         if( tempLayerNodes.length==0) break;

        //逐层遍历     ( 注意， 每个person集合 代表 一个节点)
        for(const node in tempLayerNodes){
              let set =  tempLayerNodes[node];
              if(set==null || set.length==0) continue;
              
              for(const person in set){
                 

                  if(set[person].age > 30) _ageOver30.push(set[person]);
                  
               //收集 当前层所有节点 的 子节点   
                 if(set[person].children && set[person].children.length > 0 ) tempLayerNodesChilds.push(set[person].children);
              }
             
        }     
            
              tempLayerNodes = tempLayerNodesChilds.concat();   
              tempLayerNodesChilds = [];
        
    }
     
}


// _getOver30(root);

// console.log("result",_ageOver30);//🚩


export default{
    breadthSearch,
}