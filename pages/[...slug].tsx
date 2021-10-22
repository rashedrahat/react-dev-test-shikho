import styles from "../styles/Slug.module.css";
import {Row, Col} from 'antd';
import List from "../components/Misc/List";
import {GetServerSideProps} from "next";
import {fetchComments, fetchPosts} from "../utils/helpers";
import Form from "../components/Misc/Form";
import {useEffect, useState} from "react";
import NothingToShow from "../components/Misc/NothingToShow";

type Props = {
    listOf: string;
    list: any[];
    error: string;
    slugHasBlank: boolean;
};

const Slug = ({listOf, list, slugHasBlank = false}: Props) => {
    const [selectedOne, setSelectedOne] = useState('')

    useEffect(() => setSelectedOne(''), [listOf])

    return (
        <Row className={styles.container}>
            <List listOf={listOf} data={list} selectedOne={selectedOne} setSelectedOne={setSelectedOne}/>
            {
                slugHasBlank ? (<NothingToShow/>) : (
                    <Form selectedOne={selectedOne} listOf={listOf}/>
                )
            }
        </Row>
    )
}

export default Slug;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {slug} = context.query

    try {
        let res;
        let listOf = '';

        if (slug) {
            if (slug.length === 2) {
                if (slug[0].toLowerCase() === 'posts' && slug[1].toLowerCase() === 'crud') {
                    listOf = 'posts'
                    res = await fetchPosts()
                } else if (slug[0].toLowerCase() === 'comments' && slug[1].toLowerCase() === 'crud') {
                    listOf = 'comments'
                    res = await fetchComments()
                } else if (['posts', 'comments'].includes(slug[0].toLowerCase()) && slug[1].toLowerCase() === 'blank') {
                    return {
                        props: {
                            listOf: '',
                            list: [],
                            slugHasBlank: true
                        },
                    };
                } else {
                    return {
                        redirect: {
                            permanent: false,
                            destination: "/"
                        }
                    }
                }
            } else {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/"
                    }
                }
            }
        }

        return {
            props: {
                listOf,
                list: res[listOf]
            },
        };
    } catch (err) {
        return {
            props: {
                listOf: '',
                list: [],
                error: 'Something went wrong.'
            },
        };
    }
}