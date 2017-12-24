# samba-config

Super tiny library for configuring samba shares with Javascript.


## Functionalites

- __generateShareConfig__: Generate configuration for a new samba share.
	```javascript
		 generateShareConfig: function (shareName, params, callback)
	```
### Params
	- shareName: Name of the new share.
	- params: JSON with the settings of the new share. The keys inside this JSON are the standard samba share configuration options.
	- callback: standard Javascript callback function.

- __generateSection__: Generate include line into the samba configuration.
```javascript
	generateSection: function (shareName, fileName, existingConfig, callback)
```
### Params
	- shareName: Name of the new share.
	- fileName: Name of the file, which contains the configuration of the new share.
	- existingConfig: The already existing Samba configuration object.
	- callback: standard Javascript callback function.

- __updateConfig__: Generate share configuration and include configuration for the new share.
```javascript
	updateConfig: function (configPath, sectionFileName, sectionName, sectionParams, callback)
```
### Params
	- configpath: Path of the Samba configuration file.
	- sectionFileName: Filename of the newly generated share.
	- sectionName: Name of the new share.
	- sectionParams: Configuration options for the share.
	- callback: standard Javascript callback function.
