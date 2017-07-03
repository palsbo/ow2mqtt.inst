process.title = "ow2mqtt";
var fs = require('fs');
var onewireFolder = "/mnt/1wire";
var mqtturl = "mqtt://localhost";
var mqttstatus = false;
var tabstatus = false;
var devdir = "data";
var devfile = devdir + "/devs";

//var devs = [];

table = {
	owdir : "/mnt/1wire",
	data : []
}

dtab = require("./table.js");
dtab.file("data/", "devs.json").load(table);

dtab.watch(function (event, filename) {
    console.log('event is: ' + event + ", filename: " + filename);
	tabstatus = false;
});

mqtt = {
	mqttClient: require("mqtt").connect(mqtturl).on('connect', function () {
		console.log("Connected to MQTT", mqtturl)
		mqttstatus = true;
		mqtt.add()
	}).on('disconnect', function() {
		console.log("Disconnected from MQTT");
		mqttstatus = false;
	}).on('message', function (_topic, _value) {
		var topic = _topic.toString();
		var value = _value.toString();
		for (x in dtab.table.data) {
			if ((dtab.table.data[x].topic + "/cmd") == _topic.toString()) {
				console.log("receive:",dtab.table.data[x].topic + "/cmd", value.toString())
				fs.writeFileSync(onewireFolder+"/"+dtab.table.data[x].id, parseInt(_value));
			}
		}
	}),
	remove: function () {
		mqtt.mqttClient.unsubscribe("owfs1/#")
	},
	add: function () {
		console.log("Subscribe:", "owfs1/#")
		mqtt.mqttClient.subscribe("owfs1/#")
	},
	publish: function(topic, value) {
		console.log("publish:", topic, value);
		this.mqttClient.publish(topic, value.toString());
	}
}

function loop() {
	if (!tabstatus) {
		try {
			dtab.load();
			console.log("Table loaded");
			tabstatus = true;
		} catch(err) { console.log(err);}
	} else if (mqttstatus) for (i in dtab.table.data) {
		try {
		var val = fs.readFileSync(onewireFolder+"/"+dtab.table.data[i].id, 'utf8');
		val = Math.round(parseInt(val*dtab.table.data[i].divisor))/dtab.table.data[i].divisor;
		if (val != dtab.table.data[i].val) {
			dtab.table.data[i].val = val;
			mqtt.publish(dtab.table.data[i].topic+"/state", val);
		}
		} catch(err) { console.log(err) }
	}
	setTimeout(loop, 200);
}

loop();
