const ModelPerekrut = require("../model/perekrut");
const { response } = require("../middlewares/common")
const PerekrutController = {
    insert: (req,res,next)=>{
                ModelPerekrut.insertData(req.body)
                .then((result) =>
                response(res, 200, true, result.command, "input data success"))
                .catch((err) =>response(res, 404, false, err, "input data fail"))
            },
    getPerekrut: (req,res,next)=>{
                ModelPerekrut.getPerekrut()
                .then((result) =>
                response(res, 200, true, result.rows, "get data success"))
                .catch((err) =>response(res, 404, false, err, "get data fail"))
    }
} 

exports.PerekrutController = PerekrutController