'use strict'

var fs = require('fs')
var async = require('async')
var ini = require('ini')

var Generator = {
	generateShareConfig: function (shareName, params, callback) {
		var generatedConfig = {}
		generatedConfig[shareName] = {}

		for (var key in params) {
			generatedConfig[shareName][key] = params[key]
		}

		return callback(null, generatedConfig)
	},

	generateSection: function (shareName, fileName, existingConfig, callback) {
		if (!shareName) return callback(new Error('shareName can\'t be emptry'))

		existingConfig[shareName] = {}
		existingConfig[shareName]['include'] = fileName

		return callback(null, existingConfig)
	},

	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, configReload, callback) {
		var self = this
		async.series([
			function (cb) {
				// generate Share Config
				self.generateShareConfig(sectionName, sectionParams, function (err, generatedShareConfig) {
					if (err) cb(err)

					fs.writeFileSync(sectionFileName, ini.stringify(generatedShareConfig))
					cb(null, true)
				})
			},
			function (cb) {
				// Include Share Config
				var config = ini.parse(fs.readFileSync(configPath, 'utf-8'))

				self.generateSection(sectionName, sectionFileName, config, function (err, generatedConfig) {
					if (err) cb(err)

					fs.writeFileSync(sectionFileName, ini.stringify( generatedConfig))
					cb(null, true)
				})
			},
			function (cb) {
				// Validate Config
				cb(null, true)
			}], function (err, results) {
			if (err) throw err
			if (configReload) {
				// Reload Config
			}
			callback(null, true)
		})
	}
}

module.exports = {
	generateShareConfig: function (shareName, params, callback) {
		return Generator.generateShareConfig(shareName, params, callback)
	},

	generateSection: function (shareName, fileName, existingConfig, callback) {
		return Generator.generateSection(shareName, fileName, existingConfig, callback)
	},
	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, configReload, callback) {
		return Generator.updateConfig(configPath, sectionFileName, sectionName, sectionParams, configReload, callback)
	}
}
