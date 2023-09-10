package com.example.back.service;

import com.example.back.common.PageModel;
import com.example.back.common.SensorDataDTO;
import com.example.back.repository.SensorRepository;
import com.example.mysql.tables.pojos.SensorData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.example.back.common.TimeUtil.convertToString;

@Service
public class SensorService {
    @Autowired
    private SensorRepository sensorRepository;
    public PageModel<SensorDataDTO> getList(PageModel pageModel) {
        pageModel.setOffset(Math.max((pageModel.getPage() - 1) * pageModel.getLimit(), 0));
        long total = sensorRepository.countData();
        List<SensorData> sensorDataList = sensorRepository.getList(pageModel);
        List<SensorDataDTO> sensorDataDTOList = new ArrayList<>(sensorDataList
                .stream()
                .map(p -> new SensorDataDTO()
                        .setId(p.getId())
                        .setSSId(p.getSsid())
                        .setTemp(p.getTemp())
                        .setHumidity(p.getHumidity())
                        .setLight(p.getLight())
                        .setTime(convertToString(p.getTime())))
                .toList());
        int size = sensorDataDTOList.size();
        if(size > pageModel.getLimit()) {
            sensorDataDTOList.remove(size - 1);
        }
        return new PageModel<SensorDataDTO>()
                .setTotal(total)
                .setPage(pageModel.getPage())
                .setLimit(pageModel.getLimit())
                .setOffset(pageModel.getOffset())
                .setPreLoadAble(pageModel.getPage() > 1)
                .setLoadMoreAble(size > pageModel.getLimit())
                .setItems(sensorDataDTOList);
    }
}
