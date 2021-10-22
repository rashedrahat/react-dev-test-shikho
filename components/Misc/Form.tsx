import styles from "../../styles/Form.module.css";
import Index from "../Form/Index";
import {useEffect, useState} from "react";
import {createPost, fetchAPost, updatePost} from "../../utils/helpers";
import {toast} from 'react-toastify';

type Props = {
    selectedOne: string
    listOf: string;
};

const Form = ({selectedOne, listOf}: Props) => {
    const [formData, setFormData] = useState({
        title: undefined,
        body: undefined,
        disconnection: [],
        connection: []
    })

    useEffect(() => {
        if (selectedOne && listOf === 'posts') {
            fetchAPost(selectedOne).then(res => {
                const {post} = res
                setFormData({
                    ...formData, ...{
                        title: post.data.title,
                        body: post.data.body.html,
                        connection: post.comments
                    }
                })
            }).catch(() => toast.error('Something went wrong!'))
        }
    }, [selectedOne])

    const setDataOfForm = (data: object) => setFormData({...formData, ...data})

    const proceedFormData = (data: { title: string, body: any }) => {
        if (selectedOne && listOf === 'posts') {
            const connectionCommentIds = formData.connection.map((element: any) => element.id)
            updatePost({
                _id: selectedOne,
                payload: {title: data.title, body: data.body},
                disconnect: formData.disconnection,
                connect: connectionCommentIds
            })
                .then(() => toast.success("Successfully updated."))
                .catch(() => toast.error("Something went wrong!"))
        } else if (!selectedOne && listOf === 'posts') {
            const connectionCommentIds = formData.connection.map((element: any) => element.id)
            createPost({
                payload: {title: data.title, body: data.body},
                connect: connectionCommentIds
            })
                .then(() => toast.success("Successfully updated."))
                .catch(() => toast.error("Something went wrong!"))
        } else {
            toast.info('Not available this feature right now.')
        }
    }

    return (
        !selectedOne ? <Index contentType={listOf} accessMode="Create" data={formData} setFormData={setFormData}
                              proceedFormData={proceedFormData}/> :
            <Index contentType={listOf} accessMode="Edit" data={formData} setFormData={setDataOfForm}
                   proceedFormData={proceedFormData}/>
    )
}

export default Form;