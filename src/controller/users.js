const Modelusers = require("../model/users");
const {createPekerja,createPerekrut,findEmail,verification} = require("../model/users")
const { response } = require("../middlewares/common")
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcryptjs');
const email = require("../middlewares/email");
const Host = process.env.HOST
const Port = process.env.PORT
const usersController = {
    createPekerja: async (req,res,next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        if(users){
            return response(res, 404, false,"email already use","register fail")
        }


        let digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
        }
        
        let salt = bcrypt.genSaltSync(10);
        let pw = bcrypt.hashSync(req.body.pw);
        // let password1 = req.body.password;
        // let confirm = req.body.confirm;

        let data = {
            id : uuidv4(),
            email : req.body.email,
            pw,
            name : req.body.name,
            nohp : req.body.nohp,
            // confirm ,
            auth : req.body.auth,
            otp
        }
        // if (password1 !== confirm) return response (res, 404, false, null, "password tidak sesuai")
        try{
            const result = await createPekerja (data)
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
    createPerekrut: async (req,res,next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        if(users){
            return response(res, 404, false,"email already use","register fail")
        }


        let digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
        }
        
        let salt = bcrypt.genSaltSync(10);
        let pw = bcrypt.hashSync(req.body.pw);
        // let password1 = req.body.pw;
        // let confirm = req.body.confirm;

        let data = {
            id : uuidv4(),
            email : req.body.email,
            pw,
            name : req.body.name,
            nohp : req.body.nohp,
            // confirm ,
            auth : req.body.auth,
            otp
        }
        // if (password1 !== confirm) return response (res, 404, false, null, "password tidak sesuai")
        try{
            const result = await createPerekrut (data)
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
          "https://localhost:3002/users"
        );
        if (sendEmail) {
          response(res, 200, true, null, "send email success");
        }
      },
      otp: async (req, res, next) => {
        console.log("email", req.body.email);
        console.log("password", req.body.otp);
        let {
        rows: [users],
        } = await findEmail(req.body.email);
        if (!users) {
        return response(res, 404, false, null, " email not found");
        }
        if (users.otp == req.body.otp) {
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
    getusers: (req,res,next)=>{
        Modelusers.getusers()
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

exports.usersController = usersController