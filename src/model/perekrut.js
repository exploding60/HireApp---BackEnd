const Pool = require('../config/db')

const insertData = (data) => {
    const {name,password,email} = data;
    return Pool.query(`INSERT INTO perekrut(name,password,email) VALUES('${name}','${password}','${email}')`);
}

const getPerekrut = () => {
    return Pool.query(`SELECT * FROM perekrut`);
}
module.exports = {insertData,getPerekrut}