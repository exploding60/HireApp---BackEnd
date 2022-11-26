const Pool = require("./../config/db");
const getusers = () => {
  return Pool.query(`SELECT * FROM users`);
};
const createPerekrut = (data) => {
  const {
    id,
    name,
    password,
    email,
    phonenumber,
    auth,
    otp,
    company_name,
    jabatan,
  } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users(id,name,password,email,phonenumber,role,auth,otp,company_name,jabatan) VALUES('${id}','${name}','${password}','${email}',${phonenumber},'perekrut',0,${otp},'${company_name}','${jabatan}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
const createPekerja = (data) => {
  const { id, name, password, email, phonenumber, auth, otp } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users(id,name,password,email,phonenumber,role,auth,otp) VALUES('${id}','${name}','${password}','${email}',${phonenumber},'pekerja',0,${otp})`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

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
const updateProfile = (id, data) => {
  const { company_name, bidang, domisili, deskripsi, ig, linkedin } = data;
  return Pool.query(
    `UPDATE users SET company_name='${company_name}',bidang='${bidang}',domisili='${domisili}', deskripsi='${deskripsi}',ig='${ig}',linkedin='${linkedin}' WHERE id='${id}'`
  );
};

module.exports = {
  createPerekrut,
  createPekerja,
  findEmail,
  verification,
  getusers,
  updateProfile,
};
