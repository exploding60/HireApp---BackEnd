const Modelusers = require("../model/users");
const {
  createPekerja,
  createPerekrut,
  findEmail,
  verification,
  updateUsersPerusahaan,
  updateUsersPekerja,
} = require("../model/users");
const { response } = require("../middlewares/common");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const email = require("../middlewares/email");
const Host = process.env.HOST;
const Port = process.env.PORT;
const usersController = {
  createPekerja: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (users) {
      return response(res, 404, false, "email already use", "register fail");
    }

    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password);
    let password1 = req.body.password;
    let confirm = req.body.confirm;

    let data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      confirm,
      auth: req.body.auth,
      otp,
    };
    if (password1 !== confirm)
      return response(res, 417, false, null, "password tidak sesuai");
    try {
      const result = await createPekerja(data);
      if (result) {
        console.log(result);
        let sendEmail = await email(
          data.email,
          otp,
          `https://${Host}:${Port}/${email}/${otp}`,
          data.fullname
        );
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "register fail");
    }
  },
  createPerekrut: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (users) {
      return response(res, 404, false, "email already use", "register fail");
    }

    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password);
    let password1 = req.body.password;
    let confirm = req.body.confirm;

    let data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      jabatan: req.body.jabatan,
      company_name: req.body.company_name,
      confirm,
      auth: req.body.auth,
      otp,
    };
    if (password1 !== confirm)
      return response(res, 417, false, null, "password tidak sesuai");
    try {
      const result = await createPerekrut(data);
      if (result) {
        console.log(result);
        let sendEmail = await email(
          data.email,
          otp,
          `https://${Host}:3002/${email}/${otp}`,
          data.fullname
        );
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "register fail");
    }
  },
  email: async (req, res, next) => {
    let sendEmail = await email(
      req.params.email,
      "Kode OTP Food",
      "https://localhost:3002/users"
    );
    if (sendEmail) {
      response(res, 200, true, null, "send email success");
    }
  },
  otp: async (req, res, next) => {
    console.log("email", req.params.email);
    console.log("password", req.body.otp);
    let {
      rows: [users],
    } = await findEmail(req.params.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    if (users.otp == req.params.otp) {
      const result = await verification(req.params.email);
      return response(
        res,
        200,
        true,
        result.command,
        " verification email success"
      );
    }
    return response(
      res,
      404,
      false,
      null,
      " wrong otp please check your email"
    );
  },
  getusers: (req, res, next) => {
    Modelusers.getusers()
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  getHomePekerja: (req, res, next) => {
    Modelusers.getHomePekerja()
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  getSortPekerja: (req, res, next) => {
    const sort = req.query.sort || "asc";
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const search = req.query.search || "";
    Modelusers.getSortPekerja(sort, page, limit, search)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  updateUsersPekerja: (req, res, next) => {
    Modelusers.updateUsersPekerja(req.params.id, req.body)
      .then((result) =>
        res.send({ status: 200, message: `berhasil mengubah data` })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
  updateUsersPerusahaan: (req, res, next) => {
    Modelusers.updateUsersPerusahaan(req.params.id, req.body)
      .then((result) =>
        res.send({ status: 200, message: `berhasil mengubah data` })
      )
      .catch((err) => res.send({ message: "error", err }));
  },
  delete: (req, res, next) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) =>
        response(res, 404, false, err.routine, "delete data fail")
      );
  },
  selectDataPekerja: (req, res, next) => {
    Modelusers.selectDataPekerja(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  selectDataPerekrut: (req, res, next) => {
    Modelusers.selectDataPerekrut(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
};

exports.usersController = usersController;
