import clsx from "clsx";
import styles from './Chart.module.scss'
import { ResponsiveContainer, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Line,Legend } from 'recharts';

const Chart = ({ data }) => {
    console.log(data)
    return (
        <div className={clsx(styles.chart)}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}
                    margin={{ top: 30, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[0, 100]} label={{ value: 'Độ C, %', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" domain={[0, 1000]} label={{ value: 'Lux', angle: 90, position: 'insideRight' }} orientation="right" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={40}/>
                    <Line yAxisId="left" type="monotone" dataKey="temp" stroke="rgb(255, 51, 0)" strokeWidth={3} />
                    <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="rgb(0, 255, 255)" strokeWidth={3} />
                    <Line yAxisId="right" type="monotone" dataKey="light" stroke="rgb(255, 255, 0)" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart