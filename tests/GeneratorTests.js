'use strict'

'use strict'

var should = require('should')
var Generator = require('../index')


describe('Generator Tests', function () {
	it('ShareConfig should be started with shareName', function (done) {
		Generator.generateShareConfig('testShareName', {}, function (err, result) {
			should.not.exist(err)
			result.should.startWith('[testShareName]')
			done()
		})
	})

	it('Params has 1 item', function (done) {
		Generator.generateShareConfig('testShareName', {'testkey': 'testValue'}, function (err, result) {
			should.not.exist(err)
			result.should.startWith('[testShareName]')
			result.should.endWith('testkey = testValue\n')
			done()
		})
	})

	it('Params has more item', function (done) {
		Generator.generateShareConfig('testShareName', {'testkey1': 'testValue1', 'testkey2': 'testValue2'}, function (err, result) {
			should.not.exist(err)
			result.should.startWith('[testShareName]')
			result.should.endWith('testkey2 = testValue2\n')
			result.should.containEql('testkey1 = testValue1\n')
			done()
		})
	})
})
