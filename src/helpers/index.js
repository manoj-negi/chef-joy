import { responseCode } from '../config/constant'
import crypto  from 'crypto'
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
     