'use strict'

'use strict'

var should = require('should')
var ini = require('ini')
var Generator = require('../index')


describe('Generator Tests', function () {
	it('ShareConfig should be started with shareName', function (done) {
		Generator.generateShareConfig('testShareName', {}, function (err, result) {
			should.not.exist(err)
			result.should.startWith('[testShareName]')
			result.should.endWith('[testShareName]\n')
			done()
		})
	})

	it('Params has 1 item', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			result.should.be.eql(generatedIni)
			done()
		})
	})

	it('Params has more item with ini', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			result.should.be.eql(generatedIni)
			done()
		})
	})

})
