'use strict'

'use strict'

var should = require('should')
var ini = require('ini')
var Generator = require('../index')


describe('Generator Tests', function () {
	it('generateShareConfig - ShareConfig should be started with shareName', function (done) {
		Generator.generateShareConfig('testShareName', {}, function (err, result) {
			should.not.exist(err)
			result.should.startWith('[testShareName]')
			result.should.endWith('[testShareName]\n')
			done()
		})
	})

	it('generateShareConfig - Params has 1 item', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			result.should.be.eql(generatedIni)
			done()
		})
	})

	it('generateShareConfig - Params has more item with ini', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			result.should.be.eql(generatedIni)
			done()
		})
	})

	it('generateSection - OK', function (done) {
		Generator.generateSection('testShareName', 'testShareName.share.conf', {}, function (err, result) {
			should.not.exist(err)
			'testShareName.share.conf'.should.be.eql(result.testShareName.include)
			done()
		})
	})

	it('generateSection - Error - emptyShareName', function (done) {
		Generator.generateSection(null, 'testShareName.share.conf', {}, function (err, result) {
			should.exist(err)
			done()
		})
	})
})
