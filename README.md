# OWFS to MQTT gateway
create a table with OWFS items and corresponding MQTT topics.
The gateway will check the topics in the tabel and get the value of the configured OWFS field.
if the value is changed, the topic an value will be published to the MQTT broker.
# Requirements
OWserver and OWFS has to be installed.
Access to a MQTT broker is required (localhost assumed - change if other)
Use web acces to configure table. http://<upir op>:8087
port can be changed if required
