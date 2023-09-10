import clsx from "clsx";
import styles from './Switch.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faFan } from "@fortawesome/free-solid-svg-icons";

const Switch = ({DVId = 'DV01', action = 'on', callApi = () => {}}) => {
    
    let icon = ''
    if(DVId == 'DV01') icon = faLightbulb
    else icon = faFan

    const handleOn = () => {
        callApi(DVId, 'on', () => {})
    }
    const handleOff = () => {
        callApi(DVId, 'off', () => {})
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={styles.icon}><FontAwesomeIcon icon={icon} className={clsx(styles.item, styles[DVId], styles[action])} /></div>
            <div className={styles.buttons}>
                <button className={clsx(styles.button, styles.bOn, styles[action])} onClick={handleOn}>ON</button>
                <button className={clsx(styles.button, styles.bOff, styles[action])} onClick={handleOff}>OFF</button>
            </div>
        </div>
    );
}

export default Switch