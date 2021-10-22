import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css";
import {Spin, Space} from 'antd';
import {useEffect} from "react";

const Home = () => {
    const router = useRouter()

    // @ts-ignore
    useEffect(() => router.push('/posts/crud'), [])

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <p className={styles.description}>
                    Please wait for a moment
                </p>

                <Space size="middle">
                    <Spin size="large"/>
                </Space>
            </main>
        </div>
    )
}

export default Home;
