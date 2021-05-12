import express from 'express'
import chefController from '../controllers/chef/chef.controller'
import homepageController from '../controllers/homepage/homepage.controller'
import * as chefValidation from '../controllers/chef/chef.validation'
import validate from 'express-validation';


const pubRoutes = express.Router()

pubRoutes.post('/register', chefController.register )
pubRoutes.post('/login', validate(chefValidation.login),chefController.login )
pubRoutes.get('/get-homepage-template', homepageController.getHomepageTemplate)






module.exports = pubRoutes