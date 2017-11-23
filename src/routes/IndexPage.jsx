import React, {
  Component
} from 'react'
import ReactDom from 'react-dom';
import { Layout, Menu, Icon,Breadcrumb } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

import { connect } from 'dva';
import { Link } from 'dva/router';
let seft
import config from '../config';
import Header from 'components/header/Header';
import SubSider from 'components/sider/Sider';
import Main from 'components/main/Main';
import Footer from 'components/footer/Footer';
import TopBreadcrumb from 'components/commonComp/TopBreadcrumb';
import Login from 'components/login/Login';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      collapsible: false,
      siderInfo: config.modelCategory
    }
    seft = this;
  }

  GetQueryString = (name) => {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
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
    case '6':
      this.setState({
        siderInfo: config.modelCategory
      });
      break;
    case '7':
      this.setState({
        siderInfo: config.modelCategory
      });
      break;
    case '2':
      this.setState({
        siderInfo: config.sider
      });
      break;
    case '3':
      this.setState({
        siderInfo: config.siderinAPP
      });
      break;
    case '4':
      this.setState({
        siderInfo: config.siderDevice
      });
      break;
    default:
      this.setState({
        siderInfo: config.sider
      });
    }
  }

  render() {
    console.log("我看看参数",this.props)
    let featureId = this.props.params.FeatureId || config.modelCategory.selectedKey;
    //const components = config.main.components;
    const headerInfo = {
        ...config.header,
        name: config.userInfo.name,
        aver: config.userInfo.aver,
        title: config.main.components[featureId].title
    }

    const mainInfo = {
        style: config.sider.style
    }

    const IndexInfo = {
        permission: config.userInfo.permission,
        loginUrl: config.userInfo.loginUrl
    }
    let featureInfo = {
        featureId: featureId,
        params: this.props.params.params,
        siderInfo: this.state.siderInfo,
        feature: config.main.components[featureId].component,
        ptitle: this.state.siderInfo.title,
        title: config.main.components[featureId].title,
    }
    return  (
              <Layout style={{ height: '100%' }}>
                <Sider collapsible
                       collapsed={this.state.collapsible}
                       onCollapse={this.onCollapse}>
                  <div className="logo" style={{height: '32px',background: '#333',borderRadius: '6px',margin: '16px'}}>LOGO</div>
                  <Menu theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        onSelect={this.handleMenuClick}
                        mode="inline">
                    <SubMenu
                      key="1"
                      title={
                        <span>
                          <Icon type="user" />
                          <span>设备管理</span>
                        </span>}>
                      <Menu.Item key="6">
                        <Link to={'/Feature1-5'}>
                         <Icon type="menu-fold" className="icons"/>
                         <span>自动机车间机台概览</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="7">
                        <Link to={'/Feature1-6'}>
                          <Icon type="search" className="icons"/>
                          <span>机台详情</span>
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="2">
                      <Link to={'/Feature1-1'}>
                       <Icon type="home" className="icons"/>
                       <span>工程管理</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={'/Feature5-2'}>
                       <Icon type="appstore-o" className="icons"/>
                       <span>我的应用</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to={'/Feature3-1'}>
                       <Icon type="user" />
                       <span>客户管理</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to={'/Feature4-1'}>
                       <Icon type="setting" className="icons"/>
                       <span>订单管理</span>
                      </Link>
                    </Menu.Item> */}
                    <SubMenu
                      key="2"
                      title={
                        <span>
                          <Icon type="idcard" />
                          <span>生产管理</span>
                        </span>}>
                        <Menu.Item key="2-1">
                          <Link to={'/Feature4-1'}>
                          <Icon type="file-text" className="icons"/>
                          <span>订单管理</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="2-2">
                          <Link to={'/Feature4-2'}>
                          <Icon type="file-excel" className="icons"/>
                          <span>生产排程</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="2-3">
                          <Link to={'/Feature4-1'}>
                          <Icon type="file-text" className="icons"/>
                          <span>生产任务</span>
                          </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="3"
                      title={
                        <span>
                          <Icon type="bar-chart" />
                          <span>基础数据</span>
                        </span>}>
                      <Menu.Item key="3-1">
                        <Link to={'/Feature1-5'}>
                         <Icon type="menu-fold" className="icons"/>
                         <span>机台群览</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="3-2">
                        <Link to={'/Feature1-6'}>
                          <Icon type="search" className="icons"/>
                          <span>机台详情</span>
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="4"
                      title={
                        <span>
                          <Icon type="pie-chart" />
                          <span>报表中心</span>
                        </span>}>
                        <Menu.Item key="4-1">
                          <Link to={'/Feature1-1'}>
                          <Icon type="home" className="icons"/>
                          <span>工程管理</span>
                          </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="5"
                      title={
                        <span>
                          <Icon type="tablet" />
                          <span>看板中心</span>
                        </span>}>
                        <Menu.Item key="5-1">
                          <Link to={'/Feature5-2'}>
                          <Icon type="appstore-o" className="icons"/>
                          <span>我的应用</span>
                          </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="6"
                      title={
                        <span>
                          <Icon type="setting" />
                          <span>系统设置</span>
                        </span>}>
                        <Menu.Item key="6-1">
                          <Link to={'/Feature5-2'}>
                          <Icon type="appstore-o" className="icons"/>
                          <span>我的应用</span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="6-2">
                          <Link to={'/Feature3-1'}>
                          <Icon type="user" />
                          <span>客户管理</span>
                          </Link>
                        </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Layout style={{ backgroundColor: '#f0f2f5' }}>
                  <Header {...headerInfo} {...featureInfo}/>
                  <TopBreadcrumb />
                  <Main {...mainInfo} {...featureInfo} style={{height: '87%'}}/>
                  <Footer />
                </Layout>
              </Layout>
            )
      }
}
