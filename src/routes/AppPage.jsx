import React, {
  Component
} from 'react'
import ReactDom from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

import { connect } from 'dva';
import { Link } from 'dva/router';

import config from '../config';

import Header from '../components/header/Header';
import SubSider from '../components/sider/Sider';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
import Login from '../components/login/Login';
let seft

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      collapsible: true,
      siderInfo: config.sider
    }
    seft = this;
  }

  onchangeHandle_callback = (key) => {

  }

  onSelect = (selectedKeys, info) => {

  }

  showConfirm = () => {
    confirm({
      title: '你确定要删除此条目?',
      content: '删除之后不可恢复',
      onOk() {

      },
      onCancel() {

      },
    });
  }

  onCollapse  = () => {
    this.setState({
      collapsible: !this.state.collapsible
    });
  }

  handleMenuClick  = (e) => {

    switch(e.key)
    {
    case '1':
      this.setState({
        siderInfo: config.sider
      });
      break;
    case '2':
      this.setState({
        siderInfo: config.siderinAPP
      });
      break;
    default:
      this.setState({
        siderInfo: config.sider
      });
    }
  }

  render() {

    //const components = config.main.components;
    const headerInfo = {
        ...config.header,
        name: config.userInfo.name,
        aver: config.userInfo.aver
    }

    const siderInfo = { ...config.sider };

    const mainInfo = {
        style: config.sider.style
    }

    const IndexInfo = {
        permission: config.userInfo.permission,
        loginUrl: config.userInfo.loginUrl
    }
        let featureId = this.props.params.FeatureId || config.sider.selectedKey;

        let featureInfo = {
            featureId: featureId,
            params: this.props.params.params,
            feature: config.main.components[featureId].component,
            title: config.main.components[featureId].title,
        }

        return  (
                  <Layout style={{ height: '100%' }}>
                    <Sider
                          collapsible
                          collapsed={this.state.collapsible}
                          onCollapse={this.onCollapse}>
                          <div className="logo" style={{height: '32px',background: '#333',borderRadius: '6px',margin: '16px'}}>LOGO</div>
                      <Menu onClick={this.handleMenuClick}
                            theme="dark"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['sub1']}
                            mode="inline">
                        <Menu.Item key="1">
                          <Link to={'/Feature1-1'}>
                           <Icon type="home" className="icons"/>
                           <span>工程管理</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <Link to={'http://localhost:8989/App'}>
                           <Icon type="setting" className="icons"/>
                           <span>APP管理</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                          <Icon type="desktop" />
                        </Menu.Item>
                      </Menu>
                    </Sider>
                    <Layout style={{ backgroundColor: '#ffffff' }}>
                      <Header {...headerInfo}/>
                        <div style={{ margin: '0.4% 0.6%', height: '93.5%'}}>
                          <Main {...mainInfo} {...featureInfo} style={{height: '87%'}}/>
                        </div>
                      <Footer />
                    </Layout>
                  </Layout>
                )
      }
}
