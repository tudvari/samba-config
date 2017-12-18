# samba-config

Super tiny library for configuring samba shares with Javascript.


## Functionalites

- __generateShareConfig__: Generate configuration for a new samba share.
	```javascript
		 generateShareConfig: function (shareName, params, callback)
	```
	- shareName: Name of the new share.
	- params: JSON with the settings of the new share. The keys inside this JSON are the standard samba share configuration options.
	- callback: standard Javascript callback function.
