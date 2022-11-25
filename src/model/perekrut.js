const Pool = require('../config/db')

// const insertData = (data) => {
//     const {name,password,email} = data;
//     return Pool.query(`INSERT INTO perekrut(name,password,email) VALUES('${name}','${password}','${email}')`);
// }

const getPerekrut = () => {
    return Pool.query(`SELECT * FROM perekrut`);
}
const create = (data) => {
    const {id, name, password, email, phonenumber, auth, otp } = data
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO perekrut(id,name,password,email,phonenumber,auth,otp) VALUES('${id}','${name}','${password}','${email}',${phonenumber},0,${otp})`,(err,result)=>{
          if(!err){
            resolve(result)
          } else {
            reject(err)
          }
        }
      );
    })
    
  }
  
  const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM perekrut where email='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
  }
  
  const verification = (email) => {
    return new Promise((resolve, reject) =>
      Pool.query(
        `UPDATE perekrut SET auth=1 WHERE "email"='${email}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  };
module.exports = {getPerekrut,create,findEmail,verification}