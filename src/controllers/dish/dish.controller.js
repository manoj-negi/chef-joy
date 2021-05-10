import dishService from "./dish.service";
import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
import chalk from "chalk";

export default {
  async addDish(req, res) {
    await dishService
      .addDish(req, res)
      .then((resp) => {
        if (resp) {
          return resp;
        }
      })
      .catch((err) => {
        console.log(chalk.red("add Dish--- err- 1"));
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
