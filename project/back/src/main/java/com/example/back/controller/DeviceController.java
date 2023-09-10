package com.example.back.controller;

import com.example.back.common.DeviceActionDTO;
import com.example.back.common.PageModel;
import com.example.back.service.DeviceService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/device")
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    @GetMapping("/history")
    public PageModel<DeviceActionDTO> getList(
            PageModel pageModel
    ) {
        return deviceService.getList(pageModel);
    }

    @PostMapping("/{DVId}")
    public String activateDevice(
            @PathVariable("DVId") String DVId,
            @RequestParam String action
    ) throws MqttException {
        return deviceService.activateDevice(new DeviceActionDTO()
                .setDVId(DVId)
                .setAction(action));
    }
}
