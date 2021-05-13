import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import mongoose from "mongoose";
var jwt = require("jsonwebtoken");
import { dish, cuisine } from "../../../../chef_joy_common/lib/mongo/db";
export default {
  async addDish(req, res) {
    try {
      const { name, description, image1, cuisine } = req.body;
      req.body.chefId = req.user._id
      var id = req.user._id;
      const findDishName = await dish.findOne({ name: name });
      if (!findDishName) {
        const addDish = await dish.create(req.body);
        return responseMethod(
          req,
          res,
          addDish,
          responseCode.BAD_REQUEST,
          true,
          "add  dish successfully."
        );
      } else {
        const findDish = await dish.findOne({ name: name, chefId: { $eq: req.body.chefId },});
        if (findDish) {
          return responseMethod(
            req,
            res,
            {},
            responseCode.BAD_REQUEST,
            true,
            "chef already add this add."
          );
        }
        var filter = {_id: findDishName._id }
        let doc = await dish.findOneAndUpdate(filter, {$push:{ chefId: req.body.chefId}  }, { new: true });
        if (doc) {
          return responseMethod(
            req,
            res,
            doc,
            responseCode.OK,
            true,
            "add dish successfully"
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

  async getDishByName(req, res) {
    try {
      var name = req.query.name;
      var query;

      if (name) {
        query = { name: { $regex: name + ".*" } };
      } else {
        query = {};
      }
      const findDish = await dish.aggregate([
        { $match: query },
        { $project: { name: 1 } },
      ]);
      if (findDish) {
        return responseMethod(
          req,
          res,
          findDish,
          responseCode.OK,
          true,
          "Get dish successfully."
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
