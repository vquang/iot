
import Info from "../components/Info/Info"
import Chart from "../components/Chart/Chart"
import Switch from "../components/Switch/Switch"
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useState, useEffect, useRef } from "react";
import {actionApi} from '../api'

const Dashboard = () => {
    const [onBulb, setOnBulb] = useState('off')
    const [onFan, setOnFan] = useState('off')
    const [temp, setTemp] = useState()
    const [humidity, setHumidity] = useState()
    const [light, setLight] = useState()
    const [data, setData] = useState([])
    let stompClient = useRef()

    useEffect(() => {
        let Sock = new SockJS('http://localhost:8082/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, (e) => console.log(e));

        // return () => {
        //   stompClient.disconnect();
        // };
    }, []);
    const onConnected = () => {
        stompClient.subscribe('/topic/sensor', onMessageSensor);
        stompClient.subscribe('/topic/device', onMessageDevice);
    }

    const onMessageSensor = (payload) => {
        let dataSensor = JSON.parse(payload.body);
        let tempData = dataSensor['temp']
        let humidityData = dataSensor['humidity']
        let lightData = dataSensor['light']
        let SSId = dataSensor['SSId']

        if(SSId == 'SS01') {
            setTemp(pre => tempData)
            setHumidity(pre => humidityData)
            setLight(pre => {
                dataSensor['light'] = pre
                return pre
            })
        } else {
            setTemp(pre => {
                dataSensor['temp'] = pre
                return pre
            })
            setHumidity(pre => {
                dataSensor['humidity'] = pre
                return pre
            })
            setLight(pre => lightData)
        }
        
        setData((pre) => {
            const newData = [...pre, dataSensor]
            if(newData.length >= 6) newData.shift()
            return newData
        })
    }

    const onMessageDevice = (payload) => {
        let dataDevice = JSON.parse(payload.body);
        let id = dataDevice['DVId']
        let action = dataDevice['action']
        if(id == 'DV01') setOnBulb(action)
        else setOnFan(action)
    }

    return (
        <div className="container">
            <div className="header">
                <Info type='temp' value={temp} />
                <Info type='humidity' value={humidity} />
                <Info type='light' value={light} />
            </div>
            <div className="content">
                <div className="chart">
                    <Chart data={data} />
                </div>
                <div className="actions">
                    <Switch DVId="DV01" action={onBulb} callApi={actionApi} />
                    <Switch DVId="DV02" action={onFan} callApi={actionApi} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard