require("dotenv").config();
const { response } = require("./../middlewares/common");
const jwt = require("jsonwebtoken");

const ModelExperiences = require("./../model/experiences");
const key = process.env.JWT_KEY;
const experiencesControl = {
  insert: async (req, res, next) => {
    try {
      const { role, company_name, description, join_date } = req.body;
      let auth = req.headers.authorization;
      let token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      const id_pekerja = decode.id;

      const data = {
        role,
        company_name,
        description,
        join_date,
        id_pekerja,
      };

      await ModelExperiences.insertWork(data);
      response(res, 200, true, data, "input data sukses");
    } catch (err) {
      return response(res, 404, false, err, "input data fail");
    }
  },
};

exports.experiencesControl = experiencesControl;
