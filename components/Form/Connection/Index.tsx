import {useState} from "react";
import SearchBar from "./SearchBar";
import Tags from "./Tags";
import {Col} from "antd";
import styles from "../../../styles/Form.module.css";

type Props = {
    listOf: string;
    list: any[];
    disconnection: any[]
    setFormData: (data: any) => void;
};

const Connection = ({listOf, list, disconnection, setFormData}: Props) => {
    const [searchTags, setSearchTags] = useState<any[]>([])
    const selectOneFromAutoComplete = (id: string) => console.log(id)
    const removeATagFromTags = (id: string) => {
        if(!disconnection.includes(id)) disconnection.push(id)
        const filteredList = list.filter((item) => item.id !== id);
        setFormData({disconnection: disconnection, connection: filteredList})
    }

    return (
        <>
            <Col span="24" className={styles.label}>{listOf === 'posts' ? 'Comments' : 'Posts'}</Col>
            <Col span="24" className={styles.labelNote}>{listOf === 'posts' ? 'SearchBar Comments And Assign it To the Post' : 'SearchBar A Post and Tag this Comment'}</Col>
            <Col span="24"><SearchBar data={searchTags} listOf={listOf} selectOne={selectOneFromAutoComplete}/></Col>
            <Tags listOf={listOf} data={list} removeOne={removeATagFromTags}/>
        </>
    )
}

export default Connection;