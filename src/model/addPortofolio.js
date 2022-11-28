const Pool = require("./../config/db");

const insertPorto = ({ name, url, type, id_users, photo }) => {
  return Pool.query(
    "INSERT INTO portofolio(name, link, type, id_users,image) VALUES ($1,$2,$3,$4,$5)",
    [name, url, type, id_users, photo]
    // `INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('${role}','${company_name}','${description}','${join_date}','${id_pekerja}')`
  );
};
const updatePorto = (id, data) => {
  const { name, type, url, photo } = data;
  return Pool.query(
    `UPDATE portofolio SET name='${name}', type='${type}', link='${url}', image='${photo}' WHERE id='${id}'`
  );
};
const getAllPorto = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT portofolio.id ,portofolio.name, portofolio.type, portofolio.link,portofolio.created_at,portofolio.image from portofolio WHERE id_users = '${id}' AND portofolio.name ILIKE ('%%')`,
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

const deletePorto = (id) => {
  return Pool.query(`DELETE FROM portofolio where id='${id}'`);
};

module.exports = {
  insertPorto,
  updatePorto,
  getAllPorto,
  deletePorto,
};
