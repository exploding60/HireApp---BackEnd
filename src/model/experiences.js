const Pool = require("./../config/db");

const insertWork = ({
  role,
  company_name,
  description,
  join_date,
  id_pekerja,
}) => {
  return Pool.query(
    "INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ($1,$2,$3,$4,$5)",
    [role, company_name, description, join_date, id_pekerja]
    // `INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('${role}','${company_name}','${description}','${join_date}','${id_pekerja}')`
  );
};

module.exports = {
  insertWork,
};
