const Joi = require('joi')

const schema = {
	text: Joi.string().required()
}

const textValidate = body => {
	return Joi.validate(body, schema)
}

module.exports = {
	textValidate
}
