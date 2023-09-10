package com.example.back.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeUtil {
    private static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static LocalDateTime currentTime() {
        return LocalDateTime.now();
    }
    public static String convertToString(LocalDateTime localDateTime) {
        return DateTimeFormatter.ofPattern(DATE_TIME_PATTERN).format(localDateTime);
    }
}
