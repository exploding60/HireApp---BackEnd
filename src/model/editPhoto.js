const Pool = require("../config/db");

const updatePhoto = (id, data) => {
  const { photo } = data;
  return Pool.query(`UPDATE users SET image='${photo}' WHERE id='${id}'`);
};
module.exports = {
  updatePhoto,
};
