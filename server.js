require('@babel/register');
const express = require('express')
const app = express()
require('dotenv').config()
const Validate = require("express-validation");
PORT = process.env.PORT
const chalk = require('chalk')
const bodyParser = require('body-parser');
const CONFIG = require('./src/config/mongodb')
require('../chef_joy_common').setMongoConnection(CONFIG.DBURL);
const  pubRoutes = require('./src/routes/chef.route')
const  apiRoutes = require('./src/routes/apiRoutes')


const  apiAuth  =  require('./src/middleware/apiAuth')


app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use('/pub', pubRoutes)
  app.use('/api', apiAuth ,apiRoutes)


  app.use(function(err, req, res, next) {
    // specific for validation errors
    if (err instanceof Validate.ValidationError)
      return res.status(err.status).json(err);
  
    // other type of errors, it *might* also be a Runtime Error
    return res.status(500).send(err.stack);
  });
app.listen(PORT, function(){
    console.log(`App is Listening at ${chalk.green(PORT)}`)
})


module.exports = app
