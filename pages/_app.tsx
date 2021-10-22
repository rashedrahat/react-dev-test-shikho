import '../styles/globals.css'
import 'antd/dist/antd.css'
import type {AppProps} from 'next/app'
import MyLayout from "../components/Layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <MyLayout>
            <Component {...pageProps} />
            <ToastContainer position="bottom-right"/>
        </MyLayout>
    )
}

export default MyApp
