const ModelPekerja = require("../model/pekerja");
const {create,findEmail,verification} = require("../model/pekerja")
const { response } = require("../middlewares/common")
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcryptjs');
const email = require("../middlewares/email");
const Host = process.env.HOST
const Port = process.env.PORT
const PekerjaController = {
    create: async (req,res,next) => {
        let {rows:[pekerja]} = await findEmail(req.body.email)
        if(pekerja){
            return response(res, 404, false,"email already use","register fail")
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
            id : uuidv4(),
            email : req.body.email,
            password,
            name : req.body.name,
            phonenumber : req.body.phonenumber,
            confirm ,
            auth : req.body.auth,
            otp
        }
        if (password1 !== confirm) return response (res, 404, false, null, "password tidak sesuai")
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
    // login: async (req, res, next) => {
    //     console.log("email", req.body.email);
    //     console.log("password", req.body.password);
    //     let {
    //     rows: [pekerja],
    //     } = await findEmail(req.body.email);
    //     if (!pekerja) {
    //     return response(res, 404, false, null, " email not found");
    //     }
    //     if (pekerja.verif == 0) {
    //     return response(res, 402, false, null, " otp belum berhasil");
    //     }
    //     const password = req.body.password;
    //     const validation = bcrypt.compareSync(password, pekerja.password);
    //     if (!validation) {
    //     return response(res, 404, false, null, "wrong password");
    //     }
    //     delete pekerja.password;
    //     delete pekerja.otp;
    //     delete pekerja.verif;
    //     let payload = {
    //     email: pekerja.email
    //     };
    //     users.token = generateToken(payload);
    //     response(res, 200, false, users, "login success");
    //   },
      email: async (req, res, next) => {
        let sendEmail = await email(
          req.params.email,
          "Kode OTP Food",
          "https://localhost:3002/pekerja"
        );
        if (sendEmail) {
          response(res, 200, true, null, "send email success");
        }
      },
      otp: async (req, res, next) => {
        console.log("email", req.body.email);
        console.log("password", req.body.otp);
        let {
        rows: [pekerja],
        } = await findEmail(req.body.email);
        if (!pekerja) {
        return response(res, 404, false, null, " email not found");
        }
        if (pekerja.otp == req.body.otp) {
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
    //             ModelPekerja.insertData(req.body)
    //             .then((result) =>
    //             response(res, 200, true, result.command, "input data success"))
    //             .catch((err) =>response(res, 404, false, err, "input data fail"))
    //         },
    getPekerja: (req,res,next)=>{
                ModelPekerja.getPekerja()
                .then((result) =>
                response(res, 200, true, result.rows, "get data success"))
                .catch((err) =>response(res, 404, false, err, "get data fail"))
    },update: (req,res,next)=>{
        ModelProduct.updateData(req.params.id,req.body)
        .then(result=> res.send({status:200,message: `berhasil mengubah data`}))
        .catch(err=> res.send({message:'error',err}))
    },
    delete: (req,res,next)=>{
        ModelProduct.deleteData(req.params.id)
        .then((result) => response(res, 200, true, result.rows,"delete data success"))
        .catch((err) => response(res, 404, false, err.routine,"delete data fail"));
    },
} 

exports.PekerjaController = PekerjaController