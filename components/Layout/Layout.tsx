import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {Layout as AntLayout} from 'antd';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const {Content} = AntLayout;

type Props = {
    children: object;
};

const Layout = ({children}: Props) => {
    const router = useRouter()
    const [selectedNavbarOption, setSelectedNavbarOption] = useState<string | undefined>(undefined)
    const [selectedSidebarOption, setSelectedSidebarOption] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(router.query?.slug) {
            setSelectedNavbarOption(router.query.slug[1])
            setSelectedSidebarOption(router.query.slug[0])
        }
    }, [router.query.slug])

    return (
        <>
            <Head>
                <title>React Dev Test Shikho</title>
            </Head>
            <AntLayout style={{ minHeight: '100vh' }}>
                <Navbar selectedNavbarOption={selectedNavbarOption} selectedSidebarOption={selectedSidebarOption}/>
                <AntLayout>
                    <Sidebar selectedSidebarOption={selectedSidebarOption}/>
                    <Content>{children}</Content>
                </AntLayout>
            </AntLayout>
        </>
    );
}

export default Layout;