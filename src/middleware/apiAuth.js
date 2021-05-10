import { errorResponse } from '../helpers';
import { users } from '../../../chef_joy_common/lib/mongo/db';
const jwt = require('jsonwebtoken');


const apiAuth = async (req, res, next) => {

  const token = req.headers['x-token'];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const user = await users.findOne({
        email: req.user.email 
    });
    if (user) {
        if (user.token != token) {
        return errorResponse(req, res, 'Your token is expired or invalid.', 401);
      }
      req.user = user;
      return next();
    } else {
      return errorResponse(req, res, 'You are not authorize to access this resource.', 401);
    }

  } catch (error) {
    console.log('==========errores', error)
    return errorResponse(
      req,
      res,
      'Incorrect token is provided, try re-login',
      401,
    );
  }
};

// export default apiAuth;
module.exports = apiAuth
