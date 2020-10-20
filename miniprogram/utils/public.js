var common = {
  // 长度显示
  getStrLen:function(str,len,biglen){
    if(str.length>biglen){
      return str.substr(0,len)+"..."
    }else{
      return str
    }
  },

 //  js时间戳转为时间
  getMyData:function (timestamp, formats) {
   // formats格式包括
   // 1. Y-m-d
   // 2. Y-m-d H:i:s
   // 3. Y年m月d日
   // 4. Y年m月d日 H时i分
   formats = formats || 'Y-m-d';

   var zero = function (value) {
       if (value < 10) {
           return '0' + value;
       }
       return value;
   };

   var timestamp = timestamp*1000;

   var myDate = timestamp? new Date(timestamp): new Date();

   var year = myDate.getFullYear();
   var month = zero(myDate.getMonth() + 1);
   var day = zero(myDate.getDate());

   var hour = zero(myDate.getHours());
   var minite = zero(myDate.getMinutes());
   var second = zero(myDate.getSeconds());

   return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
       return ({
           Y: year,
           m: month,
           d: day,
           H: hour,
           i: minite,
           s: second
       })[matches];
   });
 },


  // 更改日期格式
  changeTimeFormat(time){
    return this.format(time,'yyyy-MM-dd');     
  },

  //封装时间格式
  format(time, format) {
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  },

  // 更改对象的'键名'
  renameKey(obj, old_key, new_key) {
    // 检查如果 old key = new key   
    if(old_key !== new_key) {
      //修改对象的旧键提取描述
      Object.defineProperty(obj, new_key, 
         Object.getOwnPropertyDescriptor(obj, old_key));
      delete obj[old_key]; // 删除旧键
    }
  },
  
}

module.exports = common