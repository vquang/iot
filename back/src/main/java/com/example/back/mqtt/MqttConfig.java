package com.example.back.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.example.back.common.Constant.*;

@Configuration
public class MqttConfig {
    @Bean
    public IMqttClient mqttClient() throws MqttException {
        String serverURI = "tcp://" + MQTT_BROKER + ":" + MQTT_PORT;
        IMqttClient mqttClient = new MqttClient(serverURI, CLIENT_ID);
        MqttConnectOptions options = new MqttConnectOptions();

        options.setUserName(MQTT_USERNAME);
        options.setPassword(MQTT_PASSWORD.toCharArray());
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);

        mqttClient.connect(options);

        return mqttClient;
    }

}
