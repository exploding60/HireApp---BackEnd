const Pool = require('./../config/db')

const insertData = (data) => {
    const {name,password,email,phonenumber,profile,skill,auth,image,idcompany} = data;
    return Pool.query(`INSERT INTO pekerja(name,password,email,phonenumber,profile,skill,auth,image,idcompany)`)
}

module.exports = {insertData}