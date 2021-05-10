import express from 'express'
import cuisineController from './cuisine.controllers'


 export const cuisineRouter = express.Router()

cuisineRouter.get('/get-cuisine', cuisineController.getCuisine)
cuisineRouter.get('/get-chef-cuisine', cuisineController.getChefCuisineNDish)
