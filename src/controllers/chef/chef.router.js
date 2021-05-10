import express from 'express'
import chefController from './chef.controller'


 export const chefRouter = express.Router()

 chefRouter.put('/update-profile', chefController.updateProfile)
 chefRouter.get('/get-chef-booking', chefController.getChefBooking)


