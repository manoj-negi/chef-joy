import { responseMethod } from "../../helpers/index";
import { responseCode } from "../../config/constant";
ObjectId = require("mongodb").ObjectID;
import { homepage } from "../../../../chef_joy_common/lib/mongo/db";

export default {
  async getHomepageTemplate(req, res) {
    try {
      const homepageTamplate = await homepage.find({ isActive: true });
      if (homepageTamplate.length > 0) {
        return responseMethod(
          req,
          res,
          homepageTamplate,
          responseCode.OK,
          true,
          "Get Homepage tamplate successfully."
        );
      } else {
        return responseMethod(
          req,
          res,
          {},
          responseCode.NOT_FOUND,
          true,
          "Data not found."
        );
      }
    } catch (err) {
      console.log(chalk.red("get homepage--- err- 2"));
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
