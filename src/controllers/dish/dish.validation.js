const Joi = require('joi');
{ name, description, image1, cuisine } 

export const login = {
    body: Joi.object().keys({
      name: Joi.string().required().error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case "any.empty":
                err.message = "Email should not be empty!";
                break;
                case "any.required":
                err.message = "Email is required field!";
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
              err.message = "password should not be empty!";
              break;
              case "any.required":
              err.message = "password is required field!";
              break;
            default:
              break;
          }
        });
        return errors;
      })
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