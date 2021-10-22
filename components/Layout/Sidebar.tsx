import {Layout, Menu} from 'antd';
import {redirectToTargetedURL} from "../../utils/helpers";

const {Sider} = Layout;

type Props = {
    selectedSidebarOption: string | undefined;
};

const Sidebar = ({selectedSidebarOption}: Props) => {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={[selectedSidebarOption || '']} key={selectedSidebarOption}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="posts" onClick={() => redirectToTargetedURL('/posts/crud')}>Posts</Menu.Item>
                <Menu.Item key="comments" onClick={() => redirectToTargetedURL('/comments/crud')}>Comments</Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;