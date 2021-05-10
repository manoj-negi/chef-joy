import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
var jwt = require("jsonwebtoken");
// import { getAllCuisines } from "../../../../chef_joy_app/component/cuisine/lib/model";
import { cuisine } from "../../../../chef_joy_common/lib/mongo/db";
import { getCuisine } from "../../../../chef_joy_cms/component/cuisine/lib/model";
// import mongoose from 'mongoose'
ObjectId = require("mongodb").ObjectID;

export default {
  async getCuisine(req, res) {
    try {
      const cuisines = await cuisine.aggregate([{ $project: { name: 1 } }]);
      if (cuisines.length > 0) {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.OK,
          false,
          "Cuisines get successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          cuisines,
          responseCode.NOT_FOUND,
          false,
          "Data not found"
        );
      }
    } catch (err) {
      return responseMethod(
        req,
        res,
        user,
        responseCode.INTERNAL_SERVER_ERROR,
        false,
        "something went wrong"
      );
    }
  },

  async getChefCuisineNDish(req, res) {
    try {
      const chef = await users
        .find({ _id: req.user._id })
        .populate({
          path: "dish",
          model: "dish",
        })
        .populate({
          path: "cuisine",
          model: "cuisine",
        });
      if (chef) {
        return responseMethod(
          req,
          res,
          chef,
          responseCode.OK,
          true,
          "get chef cuisine successfully"
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "data not found"
        );
      }
    } catch (err) {
      return responseMethod(
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
