
import { responseCode } from '../config/constant'

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