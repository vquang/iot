import clsx from "clsx";
import styles from './Info.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faDroplet, faSun } from "@fortawesome/free-solid-svg-icons";

const Info = ({ type = 'temp', value = '69' }) => {
    let unit = ''
    let icon = ''
    let label = ''
    let background = ''

    switch (type) {
        case 'temp':
            unit = 'Độ C'
            icon = faTemperatureThreeQuarters
            label = 'Nhiệt độ:'
            if (value <= 20) {
                background = 'low'
            } else if (value <= 70) {
                background = 'mid'
            } else {
                background = 'high'
            }
            break;
        case 'humidity':
            unit = '%'
            icon = faDroplet
            label = 'Độ ẩm:'
            if (value <= 40) {
                background = 'low'
            } else if (value <= 70) {
                background = 'mid'
            } else {
                background = 'high'
            }
            break;
        default:
            unit = 'Lux'
            icon = faSun
            label = 'Ánh sáng:'
            if (value <= 400) {
                background = 'low'
            } else if (value <= 700) {
                background = 'mid'
            } else {
                background = 'high'
            }
            break
    }

    return (
        <div className={clsx(styles.info, styles[type], styles[background])}>
            <div className={clsx(styles.icon)}><FontAwesomeIcon icon={icon} className={clsx(styles.item, styles[type])} /></div>
            <div className={clsx(styles.label)}>{label}</div>
            <div className={clsx(styles.content)}>{value + ' ' + unit}</div>
        </div>
    );
}

export default Info