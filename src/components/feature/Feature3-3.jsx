import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import Appdetail from '../common/Appdetail';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import config from '../../config';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal, Row, Col, Pagination, Badge, Dropdown } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft

const Menumodel = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">2017-09</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2017-08</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">2017-07</a>
    </Menu.Item>
  </Menu>
);

export default class Feature extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      siderInfo: config.siderinAPP
    }
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  handleClick = (e) => {
    if(e.key == 5){
      browserHistory.push('/Feature1-1')
    } else {
      browserHistory.push('/Feature1-2')
    }
  }

  Plproject_List = (e) => {
    var obj = {
      //uProjectUUID : 0 ,    // ¹¤³ÌUUID
    }
    this.DoPost_Project("Plproject_List",obj,function(res){
      console.log('Plproject_List=====', res)
      var Pl_list = res.obj || []
      var templist = []
      Pl_list.forEach(function(item, index){
        templist.push({
            key: index,
            strPLProjectName: item.strPLProjectName,
            strPLProjectDescription: item.strPLProjectDescription,
            strPLProjectNote: item.strPLProjectNote,
            uPLProjectUUID: item.uPLProjectUUID
          })
      })

      seft.setState({
         data: templist
      })
    });
  }

  DoPost_Project = (func,obj,cb) => {
    var url = "http://dev.top-link.me/dev/Handler_Plproject_V1.ashx";
    return this.DoPost(url,func,obj,cb);
  }

  DoPost = (url,func,obj,cb) => {

        var req = new TRequest();

        console.log(func);
        // exec : function (url, op, obj, cb, err)
        req.exec(url, func, obj,
            // success:
            function (json){

               cb(json);            //cbÊÇÒ»¸öº¯Êý£¬ÕâÀïµ÷ÓÃÁËÕâ¸öº¯Êý£¬È»ºó¸øÁË²ÎÊý¡£

               return ;
            },
            // error:

            function (json) {

            });

        return ;
  }

  showConfirm = () => {
    confirm({
      title: '你确定要删除此条目?',
      content: '删除之后不可恢复',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    console.log('this.state===',this.state)
    const columns = [{
      title: '工程名称',
      dataIndex: 'strPLProjectName',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '描述',
      dataIndex: 'strPLProjectDescription',
    }, {
      title: '更新时间',
      dataIndex: 'strPLProjectNote',
    }, {
      title: '操作',
      dataIndex: 'uPLProjectUUID',
      render: text => <Button type="primary" style={{ height: '18px', padding: '0 9px' }} onClick={this.showConfirm}>查看</Button>,
    }]

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    const MeduleInfo = {
      opName: "新增APP",
      serverType: "Ulproject_Add",
      uDevModelUUID: "0"
    }

    const operations = FormG(MeduleInfo);

    return (
      <div>
        <SubSider {...this.state.siderInfo}/>
        <Tabs defaultActiveKey="1"
              onChange={this.onchangeHandle_callback}
              tabBarExtraContent={operations}
              style={{ height: '100%', marginLeft: '239px' }}>
         <TabPane tab="全部" key="1" style={{height: '87%'}}>
             <Row type="flex" gutter={16} justify="space-around" style={{margin: 0}}>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>
                    <div className="custom-image" style={{ borderBottom: 'solid 1px #e9e9e9'}}>

                    </div>
                    <div className="custom-card" style={{ lineHeight: '39px' }}>
                      <Badge status="processing"/>
                      <span>正常: 2017-10-01</span>
                      <span style={{float: 'right'}}>
                        <Appdetail abc="props.abc" bcd="props.bcd"/>
                        <span className="ant-divider" />

                        </span>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>

                  
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>
                    <div className="custom-image" style={{ borderBottom: 'solid 1px #e9e9e9'}}>

                    </div>
                    <div className="custom-card" style={{ lineHeight: '39px' }}>
                      <Badge status="processing"/>
                      <span>正常: 2017-10-01</span>
                      <span style={{float: 'right'}}>
                        <a href="https://www.baidu.com" target="_blank">等下</a>
                        <span className="ant-divider" />
                          <Dropdown overlay={ Menumodel }>
                            <a className="ant-dropdown-link">
                              更多 <Icon type="down" />
                            </a>
                          </Dropdown>
                        </span>
                    </div>
                  </Card>
                </Col>
             </Row>
             <Row type="flex" gutter={16} justify="space-around" style={{margin: 0}}>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>
                    <div className="custom-image" style={{ borderBottom: 'solid 1px #e9e9e9'}}>

                    </div>
                    <div className="custom-card" style={{ lineHeight: '39px' }}>
                      <Badge status="processing"/>
                      <span>正常: 2017-10-01</span>
                      <span style={{float: 'right'}}>
                        <Appdetail abc="props.abc" bcd="props.bcd"/>
                        <span className="ant-divider" />
                          <Dropdown overlay={ Menumodel }>
                            <a className="ant-dropdown-link">
                              更多 <Icon type="down" />
                            </a>
                          </Dropdown>
                        </span>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>
                    <div className="custom-image" style={{ borderBottom: 'solid 1px #e9e9e9'}}>
                      <ul>
                        <li style={{ lineHeight: '39px' }}><h2>TSR-700机器人</h2></li>
                        <li style={{ lineHeight: '39px', fontSize: 'larger', color: '#666666' }}>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>3C</span>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>昌平设计</span>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>用户体验</span>
                        </li>
                        <li style={{ lineHeight: '26px' }}>AppID: <span style={{float: 'right'}}>2254623513</span></li>
                        <li style={{ lineHeight: '26px' }}>项目简介: <span>不要用色条或者是色块区分, 会导致画面色彩混乱，色点是比较好的方式</span> </li>
                        <li style={{ lineHeight: '26px', marginBottom: '18px' }}>更新时间: <span style={{float: 'right'}}>2017-06-25</span> </li>
                      </ul>
                    </div>
                    <div className="custom-card" style={{ lineHeight: '39px' }}>
                      <Badge status="processing"/>
                      <span>正常: 2017-10-01</span>
                      <span style={{float: 'right'}}>
                        <Appdetail abc="props.abc" bcd="props.bcd"/>
                        <span className="ant-divider" />
                          <Dropdown overlay={ Menumodel }>
                            <a className="ant-dropdown-link">
                              更多 <Icon type="down" />
                            </a>
                          </Dropdown>
                        </span>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ marginBottom: '3%', borderRadius: '3%', border: '1px solid #d9edfc' }} bodyStyle={{ padding: '2px 22px' }}>
                    <div className="custom-image" style={{ borderBottom: 'solid 1px #e9e9e9'}}>
                      <ul>
                        <li style={{ lineHeight: '39px' }}><h2>TSR-700机器人</h2></li>
                        <li style={{ lineHeight: '39px', fontSize: 'larger', color: '#666666' }}>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>3C</span>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>昌平设计</span>
                          <span style={{margin: '0 10px', backgroundColor: 'rgba(233, 233, 233, 0.57)', border: 'solid 1px rgba(233, 233, 233, 0.57)', borderRadius: '5px', padding: '0 1%'}}>用户体验</span>
                        </li>
                        <li style={{ lineHeight: '26px' }}>AppID: <span style={{float: 'right'}}>2254623513</span></li>
                        <li style={{ lineHeight: '26px' }}>项目简介: <span>不要用色条或者是色块区分, 会导致画面色彩混乱，色点是比较好的方式</span> </li>
                        <li style={{ lineHeight: '26px', marginBottom: '18px' }}>更新时间: <span style={{float: 'right'}}>2017-06-25</span> </li>
                      </ul>
                    </div>
                    <div className="custom-card" style={{ lineHeight: '39px' }}>
                      <Badge status="processing"/>
                      <span>正常: 2017-10-01</span>
                      <span style={{float: 'right'}}>
                        <a href="https://www.baidu.com" target="_blank">等下</a>
                        <span className="ant-divider" />
                          <Dropdown overlay={ Menumodel }>
                            <a className="ant-dropdown-link">
                              更多 <Icon type="down" />
                            </a>
                          </Dropdown>
                        </span>
                    </div>
                  </Card>
                </Col>
             </Row>
             <div style={{textAlign: '-webkit-center', position: 'absolute', bottom: '9%', left: '32%'}}>
               <Pagination defaultCurrent={6} total={500} />
             </div>
         </TabPane>
         <TabPane tab="已发布" key="2">
           <Row gutter={16}>
            <Col span={12} />
            <Col span={12} />
           </Row>
         </TabPane>
         <TabPane tab="发布中" key="3">
           <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
         </TabPane>
         <TabPane tab="已停止" key="4">
           <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
         </TabPane>
        </Tabs>
      </div>
    )
  }
}
