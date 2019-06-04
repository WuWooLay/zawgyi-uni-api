const express = require('express')
const router = express.Router()

// zawGyiController
const {
	zawgyi,
	detectZawgyi,
	convertZawgyi,
	detectAndConvert,
	complexConvert
} = require('../../controllers/api/zawgyi')

// GET /api/zawgyi/
// @param [text] field required
router.get('/', zawgyi)

// GET /api/zawgyi/detect
// @param [text] field required
router.get('/detect', detectZawgyi)

// GET /api/zawgyi/convert
// @param [text] field required
router.get('/convert', convertZawgyi)

// GET /api/zawgyi/detect-converter
// @param [text] field required
router.get('/detect-convert', detectAndConvert)

// GET /api/zawgyi/complex-convert
// @param [text] field required
router.get('/complex-convert', complexConvert)

// Higher Order Component Exports
// app is Getting from App.js => express();
module.exports = app => {
	app.use('/api/zawgyi', router)
}
