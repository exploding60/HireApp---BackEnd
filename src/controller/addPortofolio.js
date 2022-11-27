require("dotenv").config();
const { response } = require("./../middlewares/common");
const jwt = require("jsonwebtoken");
const ModelPortofolio = require("./../model/addPortofolio");
const key = process.env.JWT_KEY;
const cloudinary = require("../config/cloudinary");

const portoController = {
  insert: async (req, res) => {
    try {
      const { name, url, type } = req.body;
      let auth = req.headers.authorization;
      let token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      const id_users = decode.id;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });
      req.body.photo = image.url;
      const photo = image.url;
      const data = {
        name,
        url,
        type,
        id_users,
        photo,
      };

      await ModelPortofolio.insertPorto(data);
      response(res, 200, true, data, "input data sukses");
    } catch (err) {
      return response(res, 404, false, err, "input data fail");
    }
  },
  update: async (req, res) => {
    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "toko",
    });
    // getting url for db
    req.body.photo = image.url;
    ModelPortofolio.updatePorto(req.params.id, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil memasukan data`,
          data: result,
        })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
  getAllPorto: async (req, res, next) => {
    try {
      let auth = req.headers.authorization;
      let token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      const id = decode.id;

      const result = await ModelPortofolio.getAllPorto({ id });
      response(res, 200, true, result, "get data success");
    } catch (err) {
      return response(res, 404, false, err, "get data faill");
    }
  },
  delete: (req, res, next) => {
    ModelPortofolio.deletePorto(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) =>
        response(res, 404, false, err.routine, "delete data fail")
      );
  },
};
exports.portoController = portoController;
