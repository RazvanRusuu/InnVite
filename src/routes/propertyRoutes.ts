import express from 'express'

import { getProperties } from '../controllers/propertiesController'

const router = express.Router()

router.get('/', getProperties)

export default router
