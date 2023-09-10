package com.example.back.common;

import com.google.gson.annotations.Expose;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class SensorDataDTO {
    private Long id;
    private String SSId;
    private double temp;
    private double humidity;
    private int light;
    private String time;
}
