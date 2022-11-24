const Pool = require("../config/db");

const create = (data) => {
  const { id, name, password, email, profile } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO pekerja(id,name,password,email,profile) VALUES('${id}','${name}','${password}','${email}','${profile}')`,
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

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM pekerja where email='${email}'`,
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

module.exports = { create, findEmail };
