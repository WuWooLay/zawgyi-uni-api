const express = require('express')
const router = express.Router()

// zawGyiController
const { uni, detectUni, convertUni, detectAndConvert, complexConvert } = require('../../controllers/api/unicode')

// GET /api/zawgyi/
// @param [text] field required
router.get('/', uni)

// GET /api/zawgyi/detect
// @param [text] field required
router.get('/detect', detectUni)

// GET /api/zawgyi/convert
// @param [text] field required
router.get('/convert', convertUni)

// GET /api/zawgyi/detect-converter
// @param [text] field required
router.get('/detect-convert', detectAndConvert)

// GET /api/zawgyi/complex-convert
// @param [text] field required
router.get('/complex-convert', complexConvert)

// Higher Order Component Exports
// app is Getting from App.js => express();
module.exports = app => {
	app.use('/api/uni', router)
}
