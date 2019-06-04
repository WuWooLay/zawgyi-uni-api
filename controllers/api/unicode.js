const { textValidate } = require('../validate/bodyValidation')
const google_myanmar_tools = require('myanmar-tools')
const detector = new google_myanmar_tools.ZawgyiDetector()
const Rabbit = require('rabbit-node')

// This is UniCode INitial Page
const uni = (req, res, next) => {
	// Validating Text Query
	const { error, value } = textValidate(req.query)
	if (error) return res.status(400).json({ error: error.details[0].message })

	return res.json({ unicode: true })
}

// Detect UniCode
const detectUni = (req, res, next) => {
	// Validating Text Query
	const { error, value } = textValidate(req.query)
	if (error) return res.status(400).json({ error: error.details[0].message })

	// Get Zawgyi Probability
	const score = detector.getZawgyiProbability(value.text)

	// Something Wrong Example
	// Client Input 111111 is Number or is ABCDEFG < Not Myanmar >
	if (score === -Infinity) {
		return res.json({
			detect: false,
			isUni: false,
			zawgyiScore: 0,
			description: ' Somthing is Wrong '
		})
	}

	const isZawgyi = score > 0.9 && score < 1.3
	// Or else Everything is Fine
	return res.json({
		detect: true,
		isUni: !isZawgyi,
		zawgyiScore: parseFloat(score.toFixed(5)),
		description: 'Your Result is Out '
	})
}

// What Ever UniCode
const convertUni = (req, res, next) => {
	// Validating Text Query
	const { error, value } = textValidate(req.query)
	if (error) return res.status(400).json({ error: error.details[0].message })

	// Or else Everything is Fine
	return res.json({
		changeText: Rabbit.zg2uni(value.text)
	})
}

// Detect Convert
const detectAndConvert = (req, res, next) => {
	// Validating Text Query
	const { error, value } = textValidate(req.query)
	if (error) return res.status(400).json({ error: error.details[0].message })

	// Get Zawgyi Probability
	const score = detector.getZawgyiProbability(value.text)

	// Something Wrong Example
	// Client Input 111111 is Number or is ABCDEFG < Not Myanmar >
	if (score === -Infinity) {
		return res.json({
			detect: false,
			isUni: false,
			zawgyiScore: 0,
			changeText: value.text,
			description: ' Somthing is Wrong '
		})
	}

	// Is zawgyi Check
	const isZawgyi = score > 0.9 && score < 1.3
	// If isNot Zawgyi , We'll Convert Uni To Zawgyi
	const message = !isZawgyi ? value.text : Rabbit.zg2uni(value.text)

	// Or else Everything is Fine
	return res.json({
		detect: true,
		isUni: !isZawgyi,
		changeText: message,
		zawgyiScore: parseFloat(score.toFixed(5)),
		description: 'Your Result is Out '
	})
}

// Conplex Convert to UniCode [ Zawgyi & UniCode]
const complexConvert = (req, res, next) => {
	// Validating Text Query
	const { error, value } = textValidate(req.query)
	if (error) return res.status(400).json({ error: error.details[0].message })

	//
	const message = value.text
		// At First We Split " " to Array
		.split(' ')
		.map(function(stringMapText) {
			// For Each words We Detect is Zawgyi
			let arrScore = detector.getZawgyiProbability(stringMapText)
			// If Not Zawgyi , We'll Change Uni To Zawgyi
			return arrScore > 0.9 && arrScore < 1.3 ? Rabbit.zg2uni(stringMapText) : stringMapText
		})
		.join(' ')

	//
	return res.json({
		changeText: message
	})
}
module.exports = {
	uni,
	detectUni,
	convertUni,
	detectAndConvert,
	complexConvert
}
