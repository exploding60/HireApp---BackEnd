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
  update: async (req, res, next) => {
    ModelExperiences.updateWork(req.params.id, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil memasukan data`,
          data: result,
        })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
  detailWork: async (req, res, next) => {
    ModelExperiences.detailWork(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, "get data faill"));
  },
  getAllWork: async (req, res, next) => {
    try {
      let auth = req.headers.authorization;
      let token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      const id = decode.id;

      const result = await ModelExperiences.getAllWork(req.params.id);
      response(res, 200, true, result, "get data success");
    } catch (err) {
      return response(res, 404, false, err, "get data faill");
    }
  },
};

exports.experiencesControl = experiencesControl;
