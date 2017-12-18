'use strict'

var Generator = {
	generateShareConfig: function (shareName, params, callback) {
		var template = `[${shareName}]\n`

		for (var key in params) {
			let value = params[key]
			template += `${key} = ${value}\n`
		}

		return callback(null, template)
	}
}

module.exports = {
	generateShareConfig: function (shareName, params, callback) {
		return Generator.generateShareConfig(shareName, params, callback)
	}
}
