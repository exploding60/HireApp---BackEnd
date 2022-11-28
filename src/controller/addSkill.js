require("dotenv").config();
const { response } = require("./../middlewares/common");
const jwt = require("jsonwebtoken");
const ModelSkill = require("./../model/addSkill");
const key = process.env.JWT_KEY;

const skillController = {
  insert: async (req, res) => {
    const id_users = req.params.id;
    try {
      const data = {
        skill_name,
        id_users,
      };

      await ModelSkill.insertSkill(data);
      response(res, 200, true, data, "input data sukses");
    } catch (err) {
      return response(res, 404, false, err, "input data fail");
    }
  },
  update: async (req, res, next) => {
    ModelSkill.updateSkill(req.params.id, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil memasukan data`,
          data: result,
        })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
  getAllSkill: async (req, res, next) => {
    try {
      // let auth = req.headers.authorization;
      // let token = auth.split(" ")[1];
      // let decode = jwt.verify(token, key);
      // const id = decode.id;

      const result = await ModelSkill.getAllSkill(req.params.id);
      response(res, 200, true, result, "get data success");
    } catch (err) {
      return response(res, 404, false, err, "get data faill");
    }
  },
  delete: (req, res, next) => {
    ModelSkill.deleteSkill(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) =>
        response(res, 404, false, err.routine, "delete data fail")
      );
  },
};
exports.skillController = skillController;
