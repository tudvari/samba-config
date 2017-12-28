'use strict'

var fs = require('fs')
var should = require('should')
var ini = require('ini')
var Generator = require('../index')
var mockfs = require('mock-fs')


describe('Generator Tests', function () {
	it('generateShareConfig - ShareConfig should be started with shareName', async function () {

		let result = await Generator.generateShareConfig('testShareName', {})
		result.should.have.property('testShareName')

	})

	it('generateShareConfig - Params has 1 item', async function () {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}

		let result = await Generator.generateShareConfig('testShareName', testData1)

		var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
		ini.encode(result, {whitespace: true}).should.be.eql(generatedIni)
	})

	it('generateShareConfig - Params has more item with ini', async function () {
		var testData1 = {'testkey1': 'testValue1', 'testkey2': 'testValue2'}

		let result = await Generator.generateShareConfig('testShareName', testData1)

		var generatedIni = ini.encode(testData1, {section: 'testShareName', whitespace: true})
		ini.encode(result, {whitespace: true}).should.be.eql(generatedIni)
	})

	it('generateSection - OK', async function () {
		let result = await Generator.generateSection('testShareName', 'testShareName.share.conf', {})
		'testShareName.share.conf'.should.be.eql(result.testShareName.include)
	})

	it('generateSection - Error - emptyShareName', async function () {
		try {
			await Generator.generateSection(null, 'testShareName.share.conf', {})
		}
		catch (e) {
			should.exist(e)
		}
	})


	it('updateConfig - OK', async function () {
		// mocking config file

		mockfs({
			'/samba.conf': mockfs.file({content: '[global]\n netbios name = SAMBA\n',
				ctime: new Date(0),
				mtime: new Date(0)
			})
		})
		var beforeConfStats = fs.statSync('/samba.conf')

		await Generator.updateConfig('/samba.conf', 'developer.share.conf', 'developer', {path: '/srv/smb/developer'})
		true.should.be.eql(fs.existsSync('developer.share.conf'))
		var confStats = fs.statSync('/samba.conf')
		confStats.ctime.should.not.eql(beforeConfStats.ctime)
		confStats.mtime.should.not.eql(beforeConfStats.mtime)
		mockfs.restore()
	})
})
