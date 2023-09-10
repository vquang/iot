package com.example.back.repository;

import com.example.back.common.PageModel;
import com.example.mysql.tables.pojos.DeviceAction;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.mysql.Tables.DEVICE_ACTION;
import static org.jooq.impl.DSL.count;

@Repository
public class DeviceRepository {
    @Autowired
    private DSLContext dsl;

    public void save(DeviceAction deviceAction) {
        dsl.insertInto(DEVICE_ACTION)
                .set(DEVICE_ACTION.DVID, deviceAction.getDvid())
                .set(DEVICE_ACTION.ACTION, deviceAction.getAction())
                .set(DEVICE_ACTION.TIME, deviceAction.getTime())
                .execute();
    }

    public List<DeviceAction> getList(PageModel pageModel) {
        return dsl
                .select()
                .from(DEVICE_ACTION)
                .orderBy(DEVICE_ACTION.TIME.desc())
                .limit(pageModel.getLimit() + 1)
                .offset(pageModel.getOffset())
                .fetchInto(DeviceAction.class);
    }

    public Long countData() {
        return dsl
                .select(count())
                .from(DEVICE_ACTION)
                .fetchOneInto(Long.class);
    }
}
