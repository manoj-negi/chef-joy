import express from 'express'
import chefController from '../controllers/chef/chef.controller'
import homepageController from '../controllers/homepage/homepage.controller'

const pubRoutes = express.Router()

pubRoutes.post('/register', chefController.register )
pubRoutes.post('/login', chefController.login )
pubRoutes.get('/get-homepage-template', homepageController.getHomepageTemplate)






module.exports = pubRoutes