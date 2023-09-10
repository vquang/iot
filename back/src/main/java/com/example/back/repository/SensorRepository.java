package com.example.back.repository;

import com.example.back.common.PageModel;
import com.example.mysql.tables.pojos.SensorData;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.mysql.Tables.SENSOR_DATA;
import static org.jooq.impl.DSL.count;

@Repository
public class SensorRepository {
    @Autowired
    private DSLContext dsl;

    public void save(SensorData sensorData) {
        dsl.insertInto(SENSOR_DATA)
                .set(SENSOR_DATA.SSID, sensorData.getSsid())
                .set(SENSOR_DATA.TEMP, sensorData.getTemp())
                .set(SENSOR_DATA.HUMIDITY, sensorData.getHumidity())
                .set(SENSOR_DATA.LIGHT, sensorData.getLight())
                .set(SENSOR_DATA.TIME, sensorData.getTime())
                .execute();
    }

    public List<SensorData> getList(PageModel pageModel) {
        return dsl
                .select()
                .from(SENSOR_DATA)
                .orderBy(SENSOR_DATA.TIME.desc())
                .limit(pageModel.getLimit() + 1)
                .offset(pageModel.getOffset())
                .fetchInto(SensorData.class);
    }

    public Long countData() {
        return dsl
                .select(count())
                .from(SENSOR_DATA)
                .fetchOneInto(Long.class);
    }
}
