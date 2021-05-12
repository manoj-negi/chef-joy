import chefService from "./chef.service";
import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import chalk from "chalk";

export default {
  async register(req, res) {
    await chefService
      .register(req, res)
      .then((chef) => {
        return chef;
      })
      .catch((err) => {
        console.log("ee4", err);
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async login(req, res) {
    await chefService
      .login(req, res)
      .then((chef) => {
        return chef;
      })
      .catch((err) => {
        console.log("=====errr",err)
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async updateProfile(req, res) {
    await chefService
      .updateProfile(req, res)
      .then((chef) => {
        return chef;
      })
      .catch((err) => {
        return responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },

  async getChefBooking(req, res) {
    await chefService
      .getChefBooking(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("get Cuisine --- err- 1"));
        responseMethod(
          req,
          res,
          {},
          responseCode.INTERNAL_SERVER_ERROR,
          false,
          "Something went wrong"
        );
      });
  },
};
