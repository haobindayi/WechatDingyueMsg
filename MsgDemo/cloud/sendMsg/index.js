// 云函数入口文件sendMsg
const cloud = require('wx-server-sdk')

cloud.init()
const DB = cloud.database({
  env: 'envid',
});
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //查数据库内容
  try{
    const msg = await DB.collection("studyAlert").where({
      done:"0"
    }).get();
    //动态取值
    const sendMsg = msg.data.map(async tuiMsg =>{
      try {
        await cloud.openapi.subscribeMessage.send({
          touser: tuiMsg._openid, //要推送给那个用户
          page: 'pages/home/home', //要跳转到那个小程序页面
          data: tuiMsg.subMsg,
          templateId: tuiMsg.templateId //模板id
        });
         const upd = DB.collection('studyAlert').where({
           _openid:tuiMsg._openid
         })
        .update({
          data: {
            done: "1",
          },
        });
        return upd;
      } catch (err) {
        console.log(err)
        return err
      }
    });
    return Promise.all(sendMsg);
  }
  catch(err){
    console.log(err);
    return err;
  }
}