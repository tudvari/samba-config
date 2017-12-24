'use strict'

var fs = require('fs')
var should = require('should')
var ini = require('ini')
var Generator = require('../index')
var mockfs = require('mock-fs')


describe('Generator Tests', function () {
	it('generateShareConfig - ShareConfig should be started with shareName', function (done) {
		Generator.generateShareConfig('testShareName', {}, function (err, result) {
			should.not.exist(err)
			result.should.have.property('testShareName')
			done()
		})
	})

	it('generateShareConfig - Params has 1 item', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			ini.encode(result, {whitespace: true}).should.be.eql(generatedIni)
			done()
		})
	})

	it('generateShareConfig - Params has more item with ini', function (done) {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}
		Generator.generateShareConfig('testShareName', testData1, function (err, result) {
			should.not.exist(err)
			var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
			ini.encode(result, {whitespace: true}).should.be.eql(generatedIni)
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
	it('updateConfig - OK', function (done) {
		// mocking config file

		mockfs({
			'/samba.conf': '[global]\n netbios name = SAMBA\n'
		})

		Generator.updateConfig('/samba.conf', 'developer.share.conf', 'developer', {path: '/srv/smb/developer'}, false, function (err, result) {
			should.not.exist(err)
			true.should.be.eql(fs.existsSync('developer.share.conf'))
			mockfs.restore()
			done()
		})
	})
})
