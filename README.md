# OWFS to MQTT gateway
Create a table with OWFS items and corresponding MQTT topics.

The gateway will check the topics in the tabel and get the value of the configured OWFS field.

if the value is changed, the topic an value will be published to the MQTT broker.

# installation
Run the bash file run.sh. This will do the following:

- copy the source files to /server/ow2mqtt
- copy the autostart file to /etc/init.d
- register the autostart file
- start ow2mqtt and ow2mqtt-web as services

# Requirements
OWserver and OWFS has to be installed.

node.js needs to be installed.

forever needs to be installed as global (npm install -g forever)

Access to a MQTT broker is required (localhost assumed - change if other)

Use web acces to configure table.
- browse to http://[your ip]:8087

port can be changed if required (default is 8087);
