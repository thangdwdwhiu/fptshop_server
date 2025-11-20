import * as customerController from '../controllers/customerControllers.js'
import {registerValidator, loginValidator} from '../validator/authValidator.js'
import handleValidator from '../utils/handleValidationErrors.js'
import express from 'express'


const router = express.Router()

// path api

router.post('/register', registerValidator,handleValidator, customerController.handleRegister )
router.post('/login', loginValidator,handleValidator, customerController.handleLogin )


export default router