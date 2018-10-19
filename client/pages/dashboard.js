import React from 'react';
import {connect} from "react-redux";
import { Layout, Menu, Icon,Breadcrumb ,Button,Alert} from 'antd';
import styles from "./index.less";
import classNames from "classnames";
import {Link} from "react-router-dom";
const { Header, Sider, Content } = Layout;
import "animate.css";
const {SubMenu}=Menu;
@connect(({global})=>({global}))
export  default  class APP extends React.Component {

    constructor(props){
        super(props);
        console.log(props);

    }
    state = {
        collapsed: false,
        isShake:false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const  {isShake}=this.state;
        return (
            <Layout style={{height:"100vh"}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className={styles.logo}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Breadcrumb style={{ margin: '16px 0',marginLeft:"16px" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div className={classNames({ animated: true },{ shake: isShake })} onAnimationEnd={()=>{
                            this.setState({
                                isShake:!isShake
                            });
                        }}>
                            <Alert message="错误提示" type="error" showIcon />
                        </div>
                        <p></p>
                        <Button onClick={()=>{
                            this.setState({
                                isShake:!isShake
                            });
                        }}>shake it</Button>
                        <Link to={"/"}>首页</Link>
                    </Content>


                </Layout>
            </Layout>
        );
    }
}





