var prefix = 'https://mrkleo.top/justyou'  //域名前缀

/* 接口地址 */
// 首页（index）
// 首页分类
const indexCategory = prefix + '/taskHall/listClassName';
// 通过分类获取对应的集合
const TaskListByCate = prefix + '/taskHall/TaskByClass';


// 动态（spaceDynamic）
const spaceIndex = prefix + '/gotoHomePage';




function getindexCategory(){
  return indexCategory;
}

function getTaskListByCate(){
  return TaskListByCate;
}

function getspaceIndex(){
  return spaceIndex;
}





module.exports.getindexCategory = getindexCategory;
module.exports.getTaskListByCate = getTaskListByCate;
module.exports.getspaceIndex = getspaceIndex;
