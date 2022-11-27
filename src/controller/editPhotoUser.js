const ModelPhoto = require("../model/editPhoto");
const { response } = require("../middlewares/common");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;
const cloudinary = require("../config/cloudinary");

const photoController = {
  update: async (req, res) => {
    let auth = req.headers.authorization;
    let token = auth.split(" ")[1];
    let decode = jwt.verify(token, key);
    const id_user = decode.id;

    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "toko",
    });
    // getting url for db
    req.body.photo = image.url;
    ModelPhoto.updatePhoto(id_user, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil memasukan data`,
          data: result,
        })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
};

exports.photoController = photoController;
