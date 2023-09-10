import clsx from "clsx";
import styles from './Layout.module.scss'
import { Link } from "react-router-dom";

const Layout = ({ path = '', children }) => {
    return (
        <div>
            <div className={clsx(styles.sidebar)}>
                <Link to='/' className={clsx(styles.item, { [styles['active']]: path == '/' })}>Dashboard</Link>
                <Link to='/profile' className={clsx(styles.item, { [styles['active']]: path == '/profile' })}>Profile</Link>
                <Link to='/data' className={clsx(styles.item, { [styles['active']]: path == '/data' })}>Sensor Data</Link>
                <Link to='/history' className={clsx(styles.item, { [styles['active']]: path == '/history' })}>Action History</Link>
            </div>
            <div className={clsx(styles.content)}>
                {children}
            </div>
        </div>
    );
}

export default Layout