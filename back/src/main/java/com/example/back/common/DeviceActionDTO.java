package com.example.back.common;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class DeviceActionDTO {
    private Long id;
    private String DVId;
    private String action;
    private String time;
    private String from;
}
