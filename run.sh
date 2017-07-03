#!/bin/bash
. /lib/lsb/init-functions
FOREVER="/usr/bin/forever"
log_action_begin_msg "Copying $app files"
cp -rf etc/ /
cp -rf server/ /
log_action_end_msg $?
if [ -f $FOREVER ]
then
	log_action_begin_msg "Forever is installed!"
	log_action_end_msg $?
else
	log_action_begin_msg "Installing forever!"
	npm install forever -g > /dev/null 2>&1
	log_action_end_msg $?
fi
log_action_begin_msg "Update update-rc.d and restart service ow2mqtt"
update-rc.d ow2mqtt remove
update-rc.d ow2mqtt defaults
service ow2mqtt restart
log_action_end_msg $?
log_action_begin_msg "Update update-rc.d and restart service ow2mqtt-web"
update-rc.d ow2mqtt-web remove
update-rc.d ow2mqtt-web defaults
service ow2mqtt-web restart
log_action_end_msg $?
