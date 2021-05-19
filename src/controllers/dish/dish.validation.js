const Joi = require('joi');

export const dish = {
    body: Joi.object().keys({
      name: Joi.string().required().error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Name should not be empty!";
                break;
                case "any.required":
                err.message = "Name is required field!";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
        cuisine: Joi.array().required().error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Cuisine should not be empty!";
              break;
              case "any.required":
              err.message = "Cuisine is required field!";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
      description:Joi.string().allow('')
    }).unknown(false).error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "object.allowUnknown":
            err.message = err.path[0] + ` parameter  is not allowed!`;
            break;
          default:
            break
        }
      });
      return errors;
    })
  };