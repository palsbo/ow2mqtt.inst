var burnerStatus = "owfs1/burner";
var pumpStatus = "owfs1/pump";
var tempLow = "owfs1/tempLow";
var tempHigh = "owfs1/High";
var tempRoom = "owfs1/stuen";

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
