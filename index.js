'use strict'

var fs = require('fs')
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

	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams) {
		var self = this
		var config = ini.parse(fs.readFileSync(configPath, 'utf-8'))
		return new Promise(async (resolve, reject) => {
			// generate Share Config
			try {
				let generatedShareConfig = await self.generateShareConfig(sectionName, sectionParams)
				fs.writeFileSync(sectionFileName, ini.stringify(generatedShareConfig, { whitespace: true }))
			}
			catch (err) {
				reject(err)
			}
			// Include Share Config
			try {
				let generatedConfig = await self.generateSection(sectionName, sectionFileName, config)
				fs.writeFileSync(configPath, ini.stringify(generatedConfig, { whitespace: true }))
			}
			catch (err) {
				reject(err)
			}
			resolve(true)
		})
	}
}

module.exports = {
	generateShareConfig: function (shareName, params) {
		return Generator.generateShareConfig(shareName, params)
	},

	generateSection: function (shareName, fileName, existingConfig) {
		return Generator.generateSection(shareName, fileName, existingConfig)
	},

	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, configReload) {
		return Generator.updateConfig(configPath, sectionFileName, sectionName, sectionParams, configReload)
	}
}
