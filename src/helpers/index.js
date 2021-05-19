import { responseCode } from '../config/constant'
import crypto  from 'crypto'
const multer = require('multer')
// enctype="multipart/form-data"
// var upload = multer({ dest: '../../../public/images' })



export const responseMethod = (
    req,
    res,
    data,
    code = responseCode.OK,
    success = true,
    message = ""
  ) =>
    res.status(code).send({
      code,
      message: message,
      success: success,
      data,
    });

    export const errorResponse = (
      req,
      res,
      errorMessage = "Something went wrong",
      code = responseCode.INTERNAL_SERVER_ERROR,
      error = {}
    ) =>
      res.status(code).json({
        code,
        errorMessage,
        error,
        data: null,
        success: false,
      });

export const hashPassword =  (pass,salt) => {
    let hash = crypto.createHmac('sha512', salt);
        hash.update(pass);
    let password = hash.digest('hex');
    return password ;
}


export const storages = (req, res) => {
  try {
    console.log("===",req)
    var  storage =   multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images')
      },
      filename: function (req, file, cb) {
        console.log("=====her",file)
        cb(null, Date.now()+ '-' +file.originalname  )
      }
    })
    var upload = multer({ storage: storage })
    return upload
  } catch(err) {
    console.log("===here",err)
  }
  
}


export const uploadImage = async (req, res) => {
  try {
      console.log("-----")
      if (req.file) {
          const file = req.file.location
          return responseObject(req, res, { file });
      }else {
          return responseObject(req, res, { req });
      }
  } catch (error) {   
      error.message = "'Only .png, .jpg and .jpeg format allowed!'    "
      return errorResponse(req, res, error.message);
  }
}


