const ModelPekerja = require("../model/pekerja");
const {response}  = require('..middlewares/common'); 
const PekerjaController = {
    insert: (req,res,next)=>{
                ModelProduct.insertData(req.body)
                .then((result) =>
                response(res, 200, true, result, "input data success"))
                .catch((err) =>response(res, 404, false, err, "input data fail"))
            }
} 

exports.PekerjaController = PekerjaController