import styles from "../../../styles/Tags.module.css";
import {Col, Empty} from 'antd';
import {CloseCircleOutlined} from "@ant-design/icons";

type Props = {
    listOf: string;
    data: any[];
    removeOne: (id: string) => void;
};

const Tags = ({listOf, data, removeOne}: Props) => {
    return (
        <>
            {
                (data.length === 0)
                    ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                    )
                    : (
                        data.map((element: any, i: number) => (
                            <div key={i} className={styles.element} onClick={() => removeOne(element.id)}>
                                <span>{element.data.body.text}</span> <CloseCircleOutlined className={styles.removeIcon}/>
                            </div>
                        ))
                    )
            }
        </>
    )
}

export default Tags;