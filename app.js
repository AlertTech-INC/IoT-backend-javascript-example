// ****************************************************************************
// Example JS app to communicate with the AlertTech Datapack backend.
// ****************************************************************************
// Author:
// Ricky Phillip Vaughn 2
// 04DEC2016-1838
// ****************************************************************************
// Release Notes:
// 4DEC2016-1847
// version 1
// Inital release of demo code.
// ****************************************************************************
// Using:
// Paho Javascript Client -websockets- (https://eclipse.org/paho/clients/js/)
// ****************************************************************************

//Using the Datapack public Broker, with a random client Id
var client = new Messaging.Client("54.153.90.159", 9000, "myclientid_" + parseInt(Math.random() * 100, 10));

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
    //Depending on your scenario you could implement a reconnect logic here
    alert("connection lost: " + responseObject.errorMessage);
};

//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
    //Do something with the push message you received
    $('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
};

//Connect Options
var options = {
    timeout: 3,
    //Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        alert("Connected");
    },
    //Gets Called if the connection could not be established
    onFailure: function (message) {
        alert("Connection failed: " + message.errorMessage);
    }
};

//Creates a new Messaging.Message Object and sends it to the Datapack MQTT Broker
var publish = function (payload, topic, qos) {
    //Send your message (please see the command list)
    var message = new Messaging.Message(payload);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
}
