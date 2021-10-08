//随机一个范围中的一个整数

export function getRandom(min,max){
      return Math.floor(Math.random()*(max-min+1)+min)
}



// 辅助函数 :随机生成一个汉字
function getRandomChineseWord () {
    var _rsl = "";
    var _randomUniCode = getRandom(19968,40869).toString(16);
    eval("_rsl=" + '"\\u' + _randomUniCode + '"');
    return _rsl;
}


//随机生成一个名字
const lastNames=["张","李","王","杨","陆","上官","郭","生","慕容","洪","代","马","麻","白","方","查","苏","勾","吴","夫"]

export  function randomName(){
      return  `${lastNames[getRandom(0,lastNames.length-1)]}${getRandomChineseWord()}${ Math.random()>.5 ? getRandomChineseWord():'' }`
}