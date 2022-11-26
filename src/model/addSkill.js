const Pool = require("./../config/db");

const insertSkill = ({ skill_name, id_users }) => {
  return Pool.query(
    "INSERT INTO skill(skill_name, id_users) VALUES ($1,$2)",
    [skill_name, id_users]
    // `INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('${role}','${company_name}','${description}','${join_date}','${id_pekerja}')`
  );
};
const updateSkill = (id, data) => {
  const { skill_name } = data;
  return Pool.query(
    `UPDATE skill SET skill_name='${skill_name}' WHERE id_users ='${id}'`
  );
};
const getAllSkill = ({ id }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT id_skill,skill_name from skill WHERE id_users = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const deleteSkill = (id) => {
  return Pool.query(`DELETE FROM skill where id_skill='${id}'`);
};

module.exports = {
  insertSkill,
  updateSkill,
  getAllSkill,
  deleteSkill,
};
