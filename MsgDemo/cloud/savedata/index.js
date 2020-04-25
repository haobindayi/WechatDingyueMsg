// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  
  try {
    db.collection('studyAlert').add({
        data:{
          name:"sd",
          age:"234"
        },
      })
      return "chenggong"
    }catch(e){
      console.log(e)
    }
}