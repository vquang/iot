import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { historyApi } from '../api'
import Tippy from '@tippyjs/react/headless';

const History = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [loadMoreAble, setLoadMoreAble] = useState(false)
    const [preLoadAble, setPreLoadAble] = useState(false)
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        historyApi(page, limit, handleApi)
    }, [page])

    useEffect(() => {
        setPage(1)
        historyApi(1, limit, handleApi)
    }, [limit])

    const handleApi = (response) => {
        setData(data => [...response.items])
        setPreLoadAble(response.preLoadAble)
        setLoadMoreAble(response.loadMoreAble)
    }

    const handleClickLimit = (value) => {
        setLimit(value)
        setVisible(false)
    }


    return (
        <div className="container-table">
            <div className="table-frame">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>DVId</th>
                            <th>Hành động</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.dvid}</td>
                                    <td>{item.action}</td>
                                    <td>{item.time}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pageable">
                <div className="page-frame">
                    <div className="page-item" onClick={() => setPage(1)}>{"<<"}</div>
                    {preLoadAble ? <div className="page-item" onClick={() => setPage(page - 1)}>{"<"}</div>
                        : <div className="page-item disable">{"<"}</div>}
                    <div className="page-item">{page}</div>
                    {loadMoreAble ? <div className="page-item" onClick={() => setPage(page + 1)}>{">"}</div>
                        : <div className="page-item disable">{">"}</div>}
                    <Tippy
                        placement="top-end"
                        visible={visible}
                        interactive
                        onClickOutside={() => setVisible(!visible)}
                        render={attrs => (
                            <ul className='limit-frame'>
                                <li className='limit-item' onClick={() => handleClickLimit(10)}>10</li>
                                <li className='limit-item' onClick={() => handleClickLimit(50)}>50</li>
                                <li className='limit-item' onClick={() => handleClickLimit(100)}>100</li>
                            </ul>
                        )}>
                        <div className="page-item limit" onClick={() => setVisible(!visible)}>
                            <span>{limit}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    )
}

export default History