//index.js
//获取应用实例
const app = getApp()
const TmplId = '模板消息ID'
const db = wx.cloud.database()
Page({
  subMsg(){
    var that = this;
    var da = that.date();
    wx.requestSubscribeMessage({
      tmplIds: [TmplId],
      success(res) { 
        console.log("授权成功",res)
        //授权成功，插入数据库数据
        if(res.模板消息ID === "accept"){
          db.collection("studyAlert").add({
            data:{//thing开头的可以填写string类型，time类型填写string会报错，按照模板进行填写
              subMsg: {
                thing1: {
                  value:"提醒开始开始啦"},
                time5: {
                    value:da},
              },
              done: "0",
              templateId: TmplId
            },
            success(res){
              console.log("存入成功",res);
            },
            fail(res){
              console.log("存入失败",res);
            }
          })
        }
      },
      fail(res){
        console.log("授权失败", res)
      }
    }) 
  },

  
  sendMsg(){
    wx.cloud.callFunction({
      name:"getopenId"
    }).then(res =>{
      let openid = res.result.openid
      console.log("获取openid成功",openid)
      wx.cloud.callFunction({
        name:"sendMsg",
        data:{}
      }).then(res=>{
        console.log("推送成功", res)
        db.collection("studyAlert").where({
          _openid:openid,
        }).update({
          data: {
            done: "1",
          },
          success(res){
            console.log("更新成功",res);
          },
          fail(res){
            console.log("更新失败",res);
          }
        })
      }).catch(res =>{
        console.log("推送失败", res)
      })
    }).catch(res =>{
      console.log("获取openid失败", res)
    })
  },

  date(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate()+1 < 10 ? '0' + date.getDate()+1 : date.getDate()+1; 
    var xuedate = (Y + '-'  + M+ '-' + D ).toString();
    console.log( xuedate); 
    return xuedate
  },

  saveData(){
	  db.collection("studyAlert").add({
      data:{
        name:"sd",
        age:"123"
      },
      success(res){
        console.log("成功",res);
      },
      fail(res){
        console.log("失败",res);
      }
    })
  }
})
