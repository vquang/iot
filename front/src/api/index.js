const dataApi = (page, limit, handle = () => { }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    fetch(`http://localhost:8082/sensor/data?page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(result => handle(result))
}

const historyApi = (page, limit, handle = () => { }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    fetch(`http://localhost:8082/device/history?page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(result => handle(result))
}

const actionApi = (id, action, handle = () => {}) => {

    var requestOptions = {
        method: 'POST'
    };

    fetch(`http://localhost:8082/device/${id}?action=${action}`, requestOptions)
        .then(response => response.json())
        .then(result => handle(result))
}

export {dataApi, historyApi, actionApi}