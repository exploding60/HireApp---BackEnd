const Pool = require("./../config/db");

const insertWork = ({ skill }) => {
  return Pool.query(
    "INSERT INTO work_experiences(skill_name) VALUES ($1)",
    [skill]
    // `INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('${role}','${company_name}','${description}','${join_date}','${id_pekerja}')`
  );
};
