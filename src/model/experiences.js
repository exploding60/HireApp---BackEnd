const Pool = require("./../config/db");

const insertWork = ({
  role,
  company_name,
  description,
  join_date,
  id_pekerja,
}) => {
  return Pool.query(
    "INSERT INTO work_experiences(role,company_name,description,join_date,id_users) VALUES ($1,$2,$3,$4,$5)",
    [role, company_name, description, join_date, id_pekerja]
    // `INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('${role}','${company_name}','${description}','${join_date}','${id_pekerja}')`
  );
};

const updateWork = (id, data) => {
  const { role, company_name, description, join_date } = data;
  return Pool.query(
    `UPDATE work_experiences SET role='${role}',company_name='${company_name}',description='${description}',join_date='${join_date}' WHERE id_work ='${id}'`
  );
};

const detailWork = (id) => {
  return Pool.query(
    `SELECT role,company_name,description,join_date FROM work_experiences WHERE id_work = '${id}'`
  );
};

const getAllWork = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT id,role,company_name,description,join_date FROM work_experiences WHERE id_users = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });

  // return new Promise((resolve, reject) => {
  //   Pool.query(
  //     `SELECT id_work,role,company_name,description,join_date FROM work_experiences WHERE id_pekerja = '${id}
  //     }'`
  //   );
  // });
};
module.exports = {
  insertWork,
  updateWork,
  detailWork,
  getAllWork,
};
