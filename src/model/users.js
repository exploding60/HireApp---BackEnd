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
const updateUsersPerusahaan = (id, data) => {
  const {
    name,
    email,
    phonenumber,
    company_name,
    bidang,
    domisili,
    deskripsi,
    ig,
    linkedin,
    tempat_kerja,
  } = data;
  return Pool.query(
    `UPDATE users SET name='${name}',email='${email}',phonenumber=${phonenumber},company_name='${company_name}',bidang='${bidang}',domisili='${domisili}', deskripsi='${deskripsi}',ig='${ig}',linkedin='${linkedin}',tempat_kerja='${tempat_kerja}' WHERE id='${id}'`
  );
};
const updateUsersPekerja = (id, data) => {
  const { name, bidang, domisili, deskripsi, tempat_kerja } = data;
  return Pool.query(
    `UPDATE users SET name='${name}',bidang='${bidang}',domisili='${domisili}', deskripsi='${deskripsi}',tempat_kerja='${tempat_kerja}' WHERE id='${id}'`
  );
};
const selectDataPekerja = (id) => {
  return Pool.query(
    `SELECT users.id,users.name,users.email,users.deskripsi,users.domisili,users.tempat_kerja FROM users WHERE users.id='${id}'`
  );
};
const selectDataPerekrut = (id) => {
  return Pool.query(
    `SELECT users.id,users.name,users.email,users.deskripsi,users.domisili,users.bidang,users.linkedin,users.ig FROM users WHERE users.id='${id}'`
  );
};
module.exports = {
  createPerekrut,
  createPekerja,
  findEmail,
  verification,
  getusers,
  updateUsersPerusahaan,
  updateUsersPekerja,
  selectDataPekerja,
  selectDataPerekrut,
};
