#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ArduinoJson.h>

// sensor
#define DHTPIN D2
#define DHTTYPE DHT11
#define Photoresistor A0

// device
#define LED1 D0
#define LED2 D1


// wifi
const char *WIFI_ID = "A0";
const char *WIFI_NETWORK = "vinhquang";

// mqtt
const char *MQTT_BROKER = "192.168.43.144";
const char *MQTT_USERNAME = "vinhquang";
const char *MQTT_PASSWORD = "12345678";
const int MQTT_PORT = 1883;
const char *CLIENT_ID = "ESP8266-CLIENT";
const char *TOPIC_SENSOR = "topic/sensor";
const char *TOPIC_DEVICE = "topic/device";

// other
StaticJsonDocument<200> doc;
const int NONE = -1;

DHT dht(DHTPIN, DHTTYPE);
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void connectWifi() {
  WiFi.begin(WIFI_ID, WIFI_NETWORK);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network!");
}

void connectMQTT() {
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setCallback(callback);
}

void connectSensors() {
  dht.begin();
}

void connectDevices() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
}

void callback(char *topic, byte *payload, unsigned int length) {

  String data = "";
  for (int i = 0; i < length; i++) {
    data += (char)payload[i];
  }
  deserializeJson(doc, data);
  String DVId = doc["DVId"];
  String action = doc["action"];
  String from = doc["from"];
  if (from != CLIENT_ID) {
    String returnData = "";

    if (DVId == "DV01") {
      if (action == "on") {
        digitalWrite(LED1, HIGH);
      } else {
        digitalWrite(LED1, LOW);
      }
    } else {
      if (action == "on") {
        digitalWrite(LED2, HIGH);
      } else {
        digitalWrite(LED2, LOW);
      }
    }

    doc["from"] = CLIENT_ID;
    serializeJson(doc, returnData);
    mqttClient.publish(TOPIC_DEVICE, returnData.c_str());

    Serial.print("Message arrived in topic: ");
    Serial.println(TOPIC_DEVICE);

    Serial.print("DVId: ");
    Serial.println(DVId);
    Serial.print("action: ");
    Serial.println(action);
    Serial.println("-----------------------");
  }
}

void reconnect() {
  while (!mqttClient.connected()) {
    if (mqttClient.connect(CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
      Serial.println("Connected to MQTT broker!");
      mqttClient.subscribe(TOPIC_DEVICE);
    } else {
      Serial.println("Connecting to the MQTT broker ...");
      delay(500);
    }
  }
}

void sendData() {
  // data from dht11
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  doc["SSId"] = "SS01";
  doc["temp"] = temp;
  doc["humidity"] = humidity;
  doc["light"] = NONE;
  String data1 = "";
  serializeJson(doc, data1);

  // data from photoresistor
  int light = analogRead(A0);
  doc["SSId"] = "SS02";
  doc["temp"] = NONE;
  doc["humidity"] = NONE;
  doc["light"] = light;
  String data2 = "";
  serializeJson(doc, data2);

  // publish data to mqtt broker
  Serial.println("Send data to mqtt broker...");
  mqttClient.publish(TOPIC_SENSOR, data1.c_str());
  // delay(1000);
  mqttClient.publish(TOPIC_SENSOR, data2.c_str());
}

void setup() {
  Serial.begin(9600);
  connectWifi();
  connectMQTT();
  connectSensors();
  connectDevices();
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  mqttClient.loop();
  sendData();
  delay(2000);
}
