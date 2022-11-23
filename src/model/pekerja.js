const Pool = require('./../config/db')

// const insertData = (data) => {
//     const {id,name,password,email,phonenumber,profile,skill,auth,image,idcompany} = data;
//     return Pool.query(`INSERT INTO pekerja(id,name,password,email,phonenumber,profile,skill,auth,image,idcompany) VALUES(${id},'${name}','${password}','${email}',${phonenumber},${auth})`)
// }

const insertData = (data) => {
    const {id,name,password,email,phonenumber,auth,} = data;
    return Pool.query(`INSERT INTO pekerja(id,name,password,email,phonenumber,auth) VALUES(${id},'${name}','${password}','${email}',${phonenumber},${auth})`)
}

const getPekerja = () => {
    return Pool.query(`SELECT * FROM pekerja`)
}
module.exports = {insertData,getPekerja}