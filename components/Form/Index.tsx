import styles from "../../styles/Form.module.css";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import Connection from "./Connection/Index";
import React, {useEffect, useState} from "react";
import Editor from '../Form/Editor'
import {updatePost} from "../../utils/helpers";

type Props = {
    contentType: string
    accessMode: string
    data: {
        title?: string
        body: any
        disconnection: any[]
        connection: any[]
    }
    setFormData: (data: any) => void
    proceedFormData: (data: any) => void
};

const Index = ({contentType, accessMode, data, setFormData, proceedFormData}: Props) => {
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
    const [bodyData, setBodyData] = useState<string>("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        if(data?.body) setBodyData(data.body)
    }, [data]);

    const onFinish = (values: any) => {
        proceedFormData(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col flex="auto" className={styles.container}>
            <Form
                name="basic"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                fields={[
                    {
                        name: ["title"],
                        value: data.title,
                    },
                ]}

            >
                <Row className={styles.topWrapper}>
                    <Col flex={4}
                         className={styles.heading}>{accessMode} a {contentType === 'posts' ? 'Post' : 'Comment'}</Col>
                    <Col flex={1} className={styles.btnContainer}>
                        <Button type="primary" icon={<CopyOutlined/>} className={styles.eventBtn} htmlType="submit">
                            {accessMode === 'Edit' ? 'Update' : 'Create'}
                        </Button>
                    </Col>
                </Row>
                {
                    contentType === 'posts' && (
                        <Row>
                            <Col span="24" className={styles.label}>Title</Col>
                            <Col span="24">
                                <Form.Item
                                    name="title"
                                    rules={[{required: true, message: 'Please input your title!'}]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                }
                <Row>
                    <Col span="24" className={styles.label}>Body</Col>
                    <Col span="24">
                        <Form.Item
                            name="body"
                        >
                            <Editor name="body" editorLoaded={editorLoaded} onChange={(data) => setBodyData(data)} value={bodyData} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Connection listOf={contentType} list={data.connection} disconnection={data.disconnection} setFormData={setFormData}/>
                </Row>
            </Form>
        </Col>
    )
}

export default Index;