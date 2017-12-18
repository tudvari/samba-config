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
})
