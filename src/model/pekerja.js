const Pool = require("./../config/db");

// const insertData = (data) => {
//     const {id,name,password,email,phonenumber,profile,skill,auth,image,idcompany} = data;
//     return Pool.query(`INSERT INTO pekerja(id,name,password,email,phonenumber,profile,skill,auth,image,idcompany) VALUES(${id},'${name}','${password}','${email}',${phonenumber},${auth})`)
// }

const insertData = (data) => {
  const { name, password, email, phonenumber, auth } = data;
  return Pool.query(
    `INSERT INTO pekerja(name,password,email,phonenumber,auth) VALUES('${name}','${password}','${email}',${phonenumber},${auth})`
  );
};


// const insertData = (data) => {
//     const {id,name,password,email,phonenumber,auth,} = data;
//     return Pool.query(`INSERT INTO pekerja(id,name,password,email,phonenumber,auth) VALUES(${id},'${name}','${password}','${email}',${phonenumber},${auth})`)
// }

const getPekerja = () => {
  return Pool.query(`SELECT * FROM pekerja`);
};

const deleteData = id => {
  return Pool.query(`DELETE FROM pekerja where id='${id}'`);
}

const updateData = (id,data) => {
  const {name,password,email,phonenumber,auth} = data;
  return Pool.query(`UPDATE products SET name='${name}',password='${password}',email='${email}',phonenumber=${phonenumber},auth=${auth} WHERE id='${id}'`);
}

const create = (data) => {
  const {id, name, password, email, phonenumber, auth, otp } = data
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO pekerja(id,name,password,email,phonenumber,auth,otp) VALUES('${id}','${name}','${password}','${email}',${phonenumber},0,${otp})`,(err,result)=>{
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
      Pool.query(`SELECT * FROM pekerja where email='${email}'`,(err,result)=>{
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
      `UPDATE pekerja SET auth=1 WHERE "email"='${email}'`,
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
module.exports = { insertData, getPekerja, deleteData, updateData, create, findEmail, verification};
