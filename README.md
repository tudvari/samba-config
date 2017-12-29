# samba-config

Super tiny library for configuring samba shares with Javascript.


## Functionalites

- __generateShareConfig__: Generate configuration for a new samba share.
	```javascript
		 generateShareConfig: function (shareName, params)
	```
### Params
	- shareName: Name of the new share.
	- params: JSON with the settings of the new share. The keys inside this JSON are the standard samba share configuration options.

- __generateSection__: Generate include line into the samba configuration.
```javascript
	generateSection: function (shareName, fileName, existingConfig)
```
### Params
	- shareName: Name of the new share.
	- fileName: Name of the file, which contains the configuration of the new share.
	- existingConfig: The already existing Samba configuration object.

- __updateConfig__: Generate share configuration and include configuration for the new share.
```javascript
	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams)
```
### Params
	- configpath: Path of the Samba configuration file.
	- sectionFileName: Filename of the newly generated share.
	- sectionName: Name of the new share.
	- sectionParams: Configuration options for the share.

## Usage Examples

### Generate one share configuration and include them into the samba configuration

```javascript
await Generator.updateConfig('/etc/samba/smb.conf', 'developer.share.conf', 'developer', {path: '/srv/smb/developer'})
```
The main Samba configuration file is in the /etc/samba directory. The name of the new share is __develper__, the properties for this share is JSON Object: __{path: '/srv/smb/developer'}__ and the name of the share configuration file is __developer.share.conf__

## Change Log

Change log is available: [here](CHANGES.md)
