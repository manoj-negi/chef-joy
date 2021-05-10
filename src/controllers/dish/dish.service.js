import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
var jwt = require("jsonwebtoken");
ObjectId = require("mongodb").ObjectID;
import { dish, cuisine } from "../../../../chef_joy_common/lib/mongo/db";

export default {
  async addDish(req, res) {
    try {
      const { name, description, image1, cuisine } = req.body;
      const findDish = await dish.findOne({ name: name });
      if (findDish) {
        return responseMethod(
          req,
          res,
          {},
          responseCode.OK,
          true,
          "Dish name should be unique."
        );
      }
      const addDish = await dish.create(req.body);
      if (addDish) {
        return responseMethod(
          req,
          res,
          addDish,
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
      console.log("=====", err);
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
};
