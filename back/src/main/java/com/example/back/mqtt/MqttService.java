package com.example.back.mqtt;

import com.example.back.common.DeviceActionDTO;
import com.example.back.common.SensorDataDTO;
import com.example.back.repository.DeviceRepository;
import com.example.back.repository.SensorRepository;
import com.example.mysql.tables.pojos.DeviceAction;
import com.example.mysql.tables.pojos.SensorData;
import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import static com.example.back.common.Constant.*;
import static com.example.back.common.TimeUtil.convertToString;
import static com.example.back.common.TimeUtil.currentTime;

@Service
public class MqttService {
    @Autowired
    private IMqttClient mqttClient;
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public void publish(String topic, String payload)
            throws MqttException {
        MqttMessage mqttMessage = new MqttMessage();
        mqttMessage.setPayload(payload.getBytes());

        mqttClient.publish(topic, mqttMessage);

    }

    @PostConstruct
    public void subscribe() throws MqttException {
        Gson gson = new Gson();
        mqttClient.subscribeWithResponse(TOPIC_SENSOR, (topic, message) -> {
            String data = new String(message.getPayload());
            SensorDataDTO sensorDataDTO = gson.fromJson(data, SensorDataDTO.class);
            SensorData sensorData = new SensorData()
                    .setSsid(sensorDataDTO.getSSId())
                    .setTemp(sensorDataDTO.getTemp())
                    .setHumidity(sensorDataDTO.getHumidity())
                    .setLight(sensorDataDTO.getLight())
                    .setTime(currentTime());
            sensorRepository.save(sensorData);
            sensorDataDTO.setTime(convertToString(sensorData.getTime()));
            data = gson.toJson(sensorDataDTO);
            template.convertAndSend("/" + TOPIC_SENSOR, data);
            System.out.println(data);
        });
        mqttClient.subscribeWithResponse(TOPIC_DEVICE, (topic, message) -> {
            String data = new String(message.getPayload());
            DeviceActionDTO deviceActionDTO = gson.fromJson(data, DeviceActionDTO.class);
            if(!deviceActionDTO.getFrom().equals(CLIENT_ID)) {
                DeviceAction deviceAction = new DeviceAction()
                        .setDvid(deviceActionDTO.getDVId())
                        .setAction(deviceActionDTO.getAction())
                        .setTime(currentTime());
                deviceRepository.save(deviceAction);
                deviceActionDTO.setTime(convertToString(deviceAction.getTime()));
                data = gson.toJson(deviceActionDTO);
                template.convertAndSend("/" + TOPIC_DEVICE, data);
            }
        });
    }
}
