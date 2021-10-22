import styles from "../../styles/List.module.css";
import {Col, Empty} from 'antd';
import {UnorderedListOutlined} from "@ant-design/icons";

type Props = {
    listOf: string;
    data: any[];
    selectedOne: string;
    setSelectedOne: (id: string) => void;
};

const List = ({listOf, data, selectedOne, setSelectedOne}: Props) => {
    return (
        <Col flex="265px" className={styles.container}>
            {
                (data.length === 0)
                    ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    )
                    : (
                        data.map((element: any, i: number) => (
                            <div key={i} className={selectedOne === element.id ? `${styles.element} ${styles.selected}` : styles.element} onClick={() => setSelectedOne(element.id)}>
                                <UnorderedListOutlined/> {listOf === 'posts' ? element.data.title : element.data.body.text}
                            </div>
                        ))
                    )
            }
        </Col>
    )
}

export default List;