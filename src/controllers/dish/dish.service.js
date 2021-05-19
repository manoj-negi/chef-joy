import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import mongoose from "mongoose";
var jwt = require("jsonwebtoken");
import { dish, cuisine } from "../../../../chef_joy_common/lib/mongo/db";
export default {

  async addDish(req, res) {
    try {
      const { name, description, cuisine, cooking_info } = req.body;
      req.body.images = req.body.image
      const findDishName = await dish.findOne({ name: name });
      if (!findDishName) {
        req.body.primaryChefId = req.user._id;
        await dish
          .create(req.body)
          .then((addDish) => {
            if (addDish) {
              return responseMethod(
                req,
                res,
                addDish,
                responseCode.BAD_REQUEST,
                true,
                "add  dish successfully."
              );
            }
          })
          .catch((err) => {
            return responseMethod(
              req,
              res,
              addDish,
              responseCode.BAD_REQUEST,
              true,
              "something went wrong."
            );
          });
      } else {
        const findDish = await dish.findOne({
          name: name,
          $or: [
            { secondaryChefId: { $eq: req.user._id } },
            { primaryChefId: req.user._id },
          ],
        });
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
        var filter = { _id: findDishName._id };
        let doc = await dish.findOneAndUpdate(
          filter,
          { $push: { secondaryChefId: req.user._id } },
          { new: true }
        );
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
      var name = req.query.name.toLowerCase();
      var query;

      if (name) {
        query = { name: { $regex: name } };
      } else {
        query = {};
      }
      const findDish = await dish.aggregate([
        {
          $project: {
            name: { $toLower: "$name" },
          },
        },
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
