import {Layout, Menu} from 'antd';
import styles from '../../styles/Navbar.module.css';
import {redirectToTargetedURL} from "../../utils/helpers";

const {Header} = Layout;

type Props = {
    selectedNavbarOption: string | undefined;
    selectedSidebarOption: string | undefined;
};

const Navbar = ({selectedNavbarOption, selectedSidebarOption}: Props) => {
    return (
        <Header className={styles.navContainer}>
            <div className={styles.logo}/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedNavbarOption || '']} key={selectedNavbarOption}
                  className={styles.menuContainer}>
                <Menu.Item key="crud" onClick={() => redirectToTargetedURL(`/${selectedSidebarOption}/crud`)}>CRUD</Menu.Item>
                <Menu.Item key="blank" onClick={() => redirectToTargetedURL(`/${selectedSidebarOption}/blank`)}>Blank</Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;