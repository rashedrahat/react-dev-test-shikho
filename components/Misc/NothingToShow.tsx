import styles from "../../styles/List.module.css";
import {Button, Col, Empty} from 'antd';

const NothingToShow = () => {
    return (
        <Col flex="auto" className={styles.container}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>Nothing to show</span>
                }
            >
            </Empty>
        </Col>
    )
}

export default NothingToShow;