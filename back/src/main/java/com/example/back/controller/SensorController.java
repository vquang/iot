package com.example.back.controller;

import com.example.back.common.PageModel;
import com.example.back.common.SensorDataDTO;
import com.example.back.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensor")
public class SensorController {
    @Autowired
    private SensorService sensorService;

    @GetMapping("/data")
    public PageModel<SensorDataDTO> getData(
            PageModel pageModel
    ) {
        return sensorService.getList(pageModel);
    }
}
