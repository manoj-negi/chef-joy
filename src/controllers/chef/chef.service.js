import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
var jwt = require("jsonwebtoken");
// import { getAllCuisines } from "../../../../chef_joy_app/component/cuisine/lib/model";
import {
  users,
  dish,
  chef_schedule,
  cuisine,
} from "../../../../chef_joy_common/lib/mongo/db";
import { getCuisine } from "../../../../chef_joy_cms/component/cuisine/lib/model";
// import mongoose from 'mongoose'
ObjectId = require("mongodb").ObjectID;

export default {
  async register(req, res) {
    try {
      const { mobile, email } = req.body;
      const checkUser = await users.findOne({
        $or: [{ mobile: mobile }, { email: email }],
      });
      if (checkUser) {
        if (checkUser.email == email) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.OK,
            true,
            "This email is already in use"
          );
        }
        if (checkUser.mobile == mobile) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.OK,
            true,
            "This mobile number is already in use"
          );
        }
      }
      await users
        .create(req.body)
        .then((resp) => {
          if (resp) {
            return responseMethod(
              req,
              res,
              resp,
              responseCode.OK,
              true,
              "done"
            );
          }
        })
        .catch((err) => {
          console.log("====err", err);
          return responseMethod(
            req,
            res,
            {},
            responseCode.INTERNAL_SERVER_ERROR,
            false,
            "Something went wrong"
          );
        });
    } catch (error) {
      console.log(error);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "Something went wrong"
      );
    }
  },

  async login(req, res) {
    try {
      const { password, email } = req.body;
      const checkUser = await users.findOne({
        $and: [{ password: password }, { email: email }],
      });
      if (checkUser) {
        if (checkUser.email == email && checkUser.password == password) {
          const token = jwt.sign(
            {
              user: {
                chefId: checkUser._id,
                email: checkUser.email,
              },
            },
            process.env.SECRET,
            {
              expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
            }
          );
          const body = {
            token: token,
          };
          checkUser.token = token;
          const logins = await users.update({ _id: checkUser._id }, body);
          return responseMethod(
            req,
            res,
            { user: checkUser },
            responseCode.OK,
            true,
            "Login success"
          );
        } else {
          return responseMethod(
            req,
            res,
            {},
            responseCode.OK,
            true,
            "email password is wrong"
          );
        }
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          false,
          "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);
      return responseMethod(
        req,
        res,
        {},
        responseCode.OK,
        false,
        "Something went wrong"
      );
    }
  },

  async updateProfile(req, res) {
    try {
      const { first_name } = req.body;
      var filter = { _id: req.user._id };
      let updateProfile = await users.findOneAndUpdate(filter, req.body, {
        new: true,
      });
      if (updateProfile) {
        return responseMethod(
          req,
          res,
          updateProfile,
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Chef profile update successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Profile is not updated."
        );

      }
    } catch (err) {
      console.log("======erorr", err);
      return responseMethod(
        req,
        res,
        {},
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getChefBooking(req, res) {
    try {
      var schedule_date = new Date().toUTCString();
      const chefbooking = await chef_schedule.find({
        chef_id: "5e21d5de9079e87d296f7928",
        schedule_date: { $gt: schedule_date },
      });

      if (chefbooking) {
        return responseMethod(
          req,
          res,
          chefbooking,
          responseCode.OK,
          true,
          "get chef booking successfully"
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "data not found"
        );
      }
    } catch (err) {
      responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },
};
