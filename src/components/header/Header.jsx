import React from 'react'
import { Affix, Menu, Icon, Input, Row, Col, Dropdown, Button, Avatar, Modal } from 'antd'
import { Link } from 'dva/router'
import LOGO from './assets/TOP-STAR-LOGO.png'
import SearchInput from '../common/SearchInput';

const confirm = Modal.confirm
const Search = Input.Search
const SubMenu = Menu.SubMenu
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>
let seft

const menu = (
  <Menu className="nav-dropmenu" style={{width: '270px'}}>
    <Menu.Item key="0">
      <span className="label" style={{color: '#969696'}}>所属单位</span><span>df</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <span className="label" style={{color: '#969696'}}>用户姓名</span><span>df</span>
    </Menu.Item>
    <Menu.Item key="5">
      <Button type="primary" size="small" onClick={() => { handleLogout() }}>退出登录</Button>
    </Menu.Item>
  </Menu>
)

const handleLogout = (e) => {
  if(e.key == 'userinfo') return
  confirm({
    title: '提示',
    content: '确认退出登录吗？',
    onOk() {
      window.location.href = 'http://user.topstarltd.com/login/login.html?redirect=http://localhost:8989/#/'+ seft.featureId +'?_k=phiy14'
    }
  })
}

const HeadMenuItemCreat  = (items) => {
  return items.map(function(item){
      return  <Link key={item.key} to={'/'+item.key}>{item.title}</Link>
  })
}

function Header(props){
    seft = props
    console.log('props.title======', props.title)
    return  <div style={props.style} className="header">
              <Row style={{display: 'flex', alignItems: 'center'}}>
                <Col span={2} offset={1}><img src={LOGO} style={{ width: '105%', height: '47px' }}/></Col>
                <Col span={7} offset={9}>
                  <SearchInput />
                </Col>
                <Col span={2} offset={1}  style={{textAlign: 'right' }}>
                  <Icon type="question-circle-o" style={{fontSize: '15px', verticalAlign: 'text-bottom'}}/>
                  <span>&nbsp;帮助</span>
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                  {/* {<ul className="nav navbar-top-links" style={{margin: '0 8%'}}>
                    <li className="login-info">
                      <Dropdown overlay={menu} trigger={['hover']}>
                        <a  className="ant-dropdown-link"
                            style={{padding: '0',
                                    height: '44px',
                                    lineHeight: '48px'}}>
                          {
                            props.aver == 'default' ? <Icon type="user" style={{ fontSize: '27px' }}/> :
                            <Avatar shape="square" icon="user" size="small" style={{ verticalAlign: 'baseline' }} src={ props.aver } />
                          }
                          <span style={{ verticalAlign: 'super' }}>{ props.name }</span>
                        </a>
                      </Dropdown>
                    </li>
                  </ul>} */}
                  <Menu mode="horizontal" onClick={ (e) => { handleLogout(e) }} className="layout-header-menu" style={{margin: '0px 8%', padding: '0'}}>
        		        <SubMenu title={<span><Icon type="user" />设置</span>} >
                      <Menu.Item key="userinfo">部门: <span>研发</span></Menu.Item>
        		        	<Menu.Item key="logout">退出</Menu.Item>
        		        </SubMenu>
        			    </Menu>
                </Col>
              </Row>
            </div>
}

export default Header
