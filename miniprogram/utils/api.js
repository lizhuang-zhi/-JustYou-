var prefix = 'http://localhost:8099'  //域名前缀

/* 接口地址 */
// 甄选好物
const myLikeUrl = prefix + '/weixin/goods/mylike';


function getmyLikeUrl(){
  return myLikeUrl;
}


module.exports.getmyLikeUrl = getmyLikeUrl;

