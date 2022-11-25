const ModelPerekrut = require("../model/perekrut");
const {create,findEmail,verification} = require("../model/perekrut")
const { response } = require("../middlewares/common")
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcryptjs');
const email = require("../middlewares/email");
const Host = process.env.HOST
const Port = process.env.PORT
const PerekrutController = {
    create: async (req,res,next) => {
        let {rows:[perekrut]} = await findEmail(req.body.email)
        if(perekrut){
            return response(res, 404, false,"email already use","register fail")
        }

        let digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            name : req.body.name,
            phonenumber : req.body.phonenumber,
            auth : req.body.auth,
            otp
        }
        try{
            const result = await create (data)
            if (result){
                console.log(result)
                let sendEmail = await email(
                    data.email,
                    otp,
                    `https://${Host}:${Port}/${email}/${otp}`,
                    data.fullname
                    );
                    if (sendEmail == "email not sent!") {
                        return response(res, 404, false, null, "register fail");
                    }
                response(res, 200, true, {email: data.email}, "register success please check your email")
            }
        }catch(err){
            console.log(err)
            response(res, 404, false, err, "register fail")
        }
    },
    email: async (req, res, next) => {
        let sendEmail = await email(
          req.params.email,
          "Kode OTP Food",
          "https://localhost:3002/perekrut"
        );
        if (sendEmail) {
          response(res, 200, true, null, "send email success");
        }
      },
      otp: async (req, res, next) => {
        console.log("email", req.body.email);
        console.log("password", req.body.otp);
        let {
        rows: [perekrut],
        } = await findEmail(req.body.email);
        if (!perekrut) {
        return response(res, 404, false, null, " email not found");
        }
        if (perekrut.otp == req.body.otp) {
        const result = await verification(req.body.email);
        return response(res, 200, true, result.command, " verification email success");
        }
        return response(
        res,
        404,
        false,
        null,
        " wrong otp please check your email"
        );
    },
    // insert: (req,res,next)=>{
    //             ModelPerekrut.insertData(req.body)
    //             .then((result) =>
    //             response(res, 200, true, result.command, "input data success"))
    //             .catch((err) =>response(res, 404, false, err, "input data fail"))
    //         },
    getPerekrut: (req,res,next)=>{
                ModelPerekrut.getPerekrut()
                .then((result) =>
                response(res, 200, true, result.rows, "get data success"))
                .catch((err) =>response(res, 404, false, err, "get data fail"))
    }
} 

exports.PerekrutController = PerekrutController