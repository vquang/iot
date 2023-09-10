package com.example.back.common;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class PageModel<T> {
    private long total;
    private int page;
    private int limit;
    private int offset;
    private boolean preLoadAble;
    private boolean loadMoreAble;
    private List<T> items;

}
