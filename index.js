'use strict'

var Generator = {
	generateShareConfig: function (shareName, params, callback) {
		var template = `[${shareName}]`
		return callback(null, template)
	}
}

module.exports = {
	generateShareConfig: function (shareName, params, callback) {
		return Generator.generateShareConfig(shareName, params, callback)
	}
}
