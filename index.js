'use strict'

var fs = require('fs')
var async = require('async')
var ini = require('ini')

var Generator = {
	generateShareConfig: function (shareName, params) {
		return new Promise((resolve, reject) => {
			var generatedConfig = {}
			generatedConfig[shareName] = {}

			for (var key in params) {
				generatedConfig[shareName][key] = params[key]
			}
			resolve(generatedConfig)
		})
	},

	generateSection: function (shareName, fileName, existingConfig) {
		return new Promise((resolve, reject) => {
			if (!shareName) return reject(new Error('shareName can\'t be emptry'))
			existingConfig[shareName] = {}
			existingConfig[shareName]['include'] = fileName

			return resolve(existingConfig)
		})
	},

	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, callback) {
		var self = this
		async.series([
			function (cb) {
				// generate Share Config
				self.generateShareConfig(sectionName, sectionParams, function (err, generatedShareConfig) {
					if (err) cb(err)

					fs.writeFileSync(sectionFileName, ini.stringify(generatedShareConfig, { whitespace: true }))
					cb(null, true)
				})
			},
			function (cb) {
				// Include Share Config
				var config = ini.parse(fs.readFileSync(configPath, 'utf-8'))

				self.generateSection(sectionName, sectionFileName, config, function (err, generatedConfig) {
					if (err) cb(err)

					fs.writeFileSync(configPath, ini.stringify(generatedConfig, { whitespace: true }))
					cb(null, true)
				})
			}], function (err, results) {
			if (err) throw err

			callback(null, true)
		})
	}
}

module.exports = {
	generateShareConfig: async function (shareName, params, callback) {
		return await Generator.generateShareConfig(shareName, params, callback)
	},

	generateSection: function (shareName, fileName, existingConfig, callback) {
		return Generator.generateSection(shareName, fileName, existingConfig, callback)
	},

	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, configReload, callback) {
		return Generator.updateConfig(configPath, sectionFileName, sectionName, sectionParams, configReload, callback)
	}
}
