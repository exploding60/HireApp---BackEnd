const Pool = require("./../config/db");
const getusers = () => {
    return Pool.query(`SELECT * FROM users`);
  };
const createPerekrut = (data) => {
    const {id, name, pw, email, nohp, auth, otp } = data
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO users(id,name,pw,email,nohp,rolle,auth,otp) VALUES('${id}','${name}','${pw}','${email}',${nohp},'perekrut',0,${otp})`,(err,result)=>{
          if(!err){
            resolve(result)
          } else {
            reject(err)
          }
        }
      );
    })
    
  }
const createPekerja = (data) => {
    const {id, name, pw, email, nohp, auth, otp } = data
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO users(id,name,pw,email,nohp,rolle,auth,otp) VALUES('${id}','${name}','${pw}','${email}',${nohp},'pekerja',0,${otp})`,(err,result)=>{
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
        Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
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
        `UPDATE users SET auth=1 WHERE "email"='${email}'`,
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

module.exports = {createPerekrut, createPekerja, findEmail, verification,getusers};