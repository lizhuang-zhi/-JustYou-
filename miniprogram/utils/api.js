var prefix = 'https://mrkleo.top/justyou'  //域名前缀

/* 接口地址 */
// 首页（index）
// 首页分类
const indexCategory = prefix + '/taskHall/listClassName';
// 通过分类获取对应的集合
const TaskListByCate = prefix + '/taskHall/TaskByClass';
// 获取任务大厅数据
const AllTask = prefix + '/taskHall/TaskList'



// 动态页面
// 动态（spaceDynamic）
const spaceIndex = prefix + '/dynamic/gotoHomePage';
// 动态详情页（maincardmore）
const detailDynamic = prefix + '/dynamic/gotoDynamicDetails'
// 动态点赞
const giveALike = prefix + '/dynamic/giveALike'
// 动态
const CancelGiveLike = prefix + '/dynamic/cancelGiveALike'
// 评论
const comm = prefix + '/dynamic/comm'
// 关注用户
const followPerson = prefix + '/user/attentionUser'
// 取消关注
const cancelfolPer = prefix + '/user/cancelttentionUser'
// 用户评论
const comment = prefix + '/dynamic/comments'



// 任务搜索页面
// 历史搜索
const recentSearch = prefix + '/taskSearch/recentlySearch';
// 热门标签
const hotTag = prefix + '/taskSearch/hotTag';
// 点击热门标签
const LinkTaskByTagId = prefix + '/taskSearch/getLinkTaskByTagId';



// 任务大厅
const AllTaskClassifi = prefix + '/taskRelease/getTaskClassificationAll';
const AllTaskCommon = prefix + '/taskHall/comm';

// 保存发布信息
const TaskToProserve = prefix + '/publish/saveInfo';
// 获取所有的标签
const AllTag = prefix + '/publish/getTag';



// 用户空间
// 获取粉丝数与关注数
const UserAttionCount = prefix + '/user/attentionCount';
// 获取我的动态集合
const UserDynamicList = prefix + '/user/getMyDynamicAll';
// 获取关注用户的列表
const AttentionUser = prefix + '/user/selectAttentionUser';
// 获取粉丝列表
const FansList = prefix + '/user/selectFansUser';
// 获取我发布的任务
const TaskOfMe = prefix + '/user/getMyTaskAll';
// 关注用户
const AttentionPer = prefix + '/user/attentionUser';
// 取消关注
const CancelAttentionPer = prefix + '/user/cancelttentionUser';


// 性格测试分析
const analyzeText = prefix + '/user/analyzeText'
const analyzePic = prefix + '/user/analyzePicture'


function getindexCategory(){
  return indexCategory;
}

function getTaskListByCate(){
  return TaskListByCate;
}

function getspaceIndex(){
  return spaceIndex;
}

function getdetailDynamic(){
  return detailDynamic;
}

function getgiveALike(){
  return giveALike;
}

function getrecentSearch(){
  return recentSearch;
}

function gethotTag(){
  return hotTag;
}

function getcomm(){
  return comm;
}

function getLinkTaskByTagId(){
  return LinkTaskByTagId;
}

function getAllTaskClassifi(){
  return AllTaskClassifi;
}

function getTaskToProserve(){
  return TaskToProserve;
}

function getAllTask(){
  return AllTask;
}

function getAllTag(){
  return AllTag;
}

function getfollowPerson(){
  return followPerson;
}

function getcancelfolPer(){
  return cancelfolPer;
}

function getUserAttionCount(){
  return UserAttionCount;
}

function getUserDynamicList(){
  return UserDynamicList;
}

function getAttentionUser(){
  return AttentionUser;
}

function getFansList(){
  return FansList;
}

function getTaskOfMe(){
  return TaskOfMe;
}

function getAttentionPer(){
  return AttentionPer;
}

function getCancelAttentionPer(){
  return CancelAttentionPer;
}

function getCancelGiveLike(){
  return CancelGiveLike;
}

function getcomment(){
  return comment;
}

function getanalyzeText(){
  return analyzeText;
}

function getanalyzePic(){
  return analyzePic;
}

function getAllTaskCommon(){
  return AllTaskCommon;
}

module.exports.getindexCategory = getindexCategory;
module.exports.getTaskListByCate = getTaskListByCate;
module.exports.getspaceIndex = getspaceIndex;
module.exports.getdetailDynamic = getdetailDynamic;
module.exports.getgiveALike = getgiveALike;
module.exports.getrecentSearch = getrecentSearch;
module.exports.gethotTag = gethotTag;
module.exports.getcomm = getcomm;
module.exports.getLinkTaskByTagId = getLinkTaskByTagId;
module.exports.getAllTaskClassifi = getAllTaskClassifi;
module.exports.getTaskToProserve = getTaskToProserve;
module.exports.getAllTask = getAllTask;
module.exports.getAllTag = getAllTag;
module.exports.getfollowPerson = getfollowPerson;
module.exports.getcancelfolPer = getcancelfolPer;
module.exports.getUserAttionCount = getUserAttionCount;
module.exports.getUserDynamicList = getUserDynamicList;
module.exports.getAttentionUser = getAttentionUser;
module.exports.getFansList = getFansList;
module.exports.getTaskOfMe = getTaskOfMe;
module.exports.getAttentionPer = getAttentionPer;
module.exports.getCancelAttentionPer = getCancelAttentionPer;
module.exports.getCancelGiveLike = getCancelGiveLike;
module.exports.getcomment = getcomment;
module.exports.getanalyzeText = getanalyzeText;
module.exports.getanalyzePic = getanalyzePic;
module.exports.getAllTaskCommon = getAllTaskCommon;
