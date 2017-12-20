'use strict'

var Generator = {
	generateShareConfig: function (shareName, params, callback) {
		var template = `[${shareName}]\n`

		for (var key in params) {
			let value = params[key]
			template += `${key} = ${value}\n`
		}

		return callback(null, template)
	},
	generateSection: function (shareName, fileName, existingConfig, callback) {
		if (!shareName) return callback(new Error('shareName can\'t be emptry'))
		existingConfig[shareName] = {}
		existingConfig[shareName]['include'] = fileName
		return callback(null, existingConfig)
	},

	writeConfig: function (config, sectionFileName, callback) {

	}
}

module.exports = {
	generateShareConfig: function (shareName, params, callback) {
		return Generator.generateShareConfig(shareName, params, callback)
	},

	generateSection: function (shareName, fileName, existingConfig, callback) {
		return Generator.generateSection(shareName, fileName, existingConfig, callback)
	}
}
