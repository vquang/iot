package com.example.back.service;

import com.example.back.common.DeviceActionDTO;
import com.example.back.common.PageModel;
import com.example.back.mqtt.MqttService;
import com.example.back.repository.DeviceRepository;
import com.example.mysql.tables.pojos.DeviceAction;
import com.google.gson.Gson;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.back.common.Constant.CLIENT_ID;
import static com.example.back.common.Constant.TOPIC_DEVICE;
import static com.example.back.common.TimeUtil.convertToString;

@Service
public class DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private MqttService mqttService;

    public String activateDevice(DeviceActionDTO deviceActionDTO) throws MqttException {
        Gson gson = new Gson();
        deviceActionDTO.setFrom(CLIENT_ID);
        String data = gson.toJson(deviceActionDTO);
        mqttService.publish(TOPIC_DEVICE, data);
        return "SUCCESS";
    }

    public PageModel<DeviceActionDTO> getList(PageModel pageModel) {
        pageModel.setOffset(Math.max((pageModel.getPage() - 1) * pageModel.getLimit(), 0));
        long total = deviceRepository.countData();
        List<DeviceAction> deviceActionList = deviceRepository.getList(pageModel);
        List<DeviceActionDTO> deviceActionDTOList = new java.util.ArrayList<>(deviceActionList
                .stream()
                .map(p -> new DeviceActionDTO()
                        .setId(p.getId())
                        .setDVId(p.getDvid())
                        .setAction(p.getAction())
                        .setTime(convertToString(p.getTime())))
                .toList());
        int size = deviceActionDTOList.size();
        if(size > pageModel.getLimit()) {
            deviceActionDTOList.remove(size - 1);
        }
        return new PageModel<DeviceActionDTO>()
                .setTotal(total)
                .setPage(pageModel.getPage())
                .setLimit(pageModel.getLimit())
                .setOffset(pageModel.getOffset())
                .setPreLoadAble(pageModel.getPage() > 1)
                .setLoadMoreAble(size > pageModel.getLimit())
                .setItems(deviceActionDTOList);
    }
}
