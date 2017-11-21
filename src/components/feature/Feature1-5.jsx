import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {Link} from 'dva/router';
import FormG from '../common/FormG';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal, Row, Col, Pagination, Badge, Dropdown } from 'antd';
import Sefchsider from '../../components/sider/Sefchsider';
import FeatureSetConfig from '../common/FeatureSetConfig';
import SelectItem from '../common/SelectItem';
import {DoPost, HandleCreateform} from '../../server';
import Appdetail from '../common/Appdetail';
import config from '../../config';
import Timeline from '../commonComp/Timeline';
import { ProgressBar } from 'react-bootstrap';
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft


window.uProductCategoryUUID = 15101

const conf = {

  type: 'tableList',
  uProductCategoryUUID: 15101,
  url: 'http://iec.topstarltd.com/admin/Handler_Product_V1.ashx',

  // 初始化页面的数据 回调函数传入 items 列表
  pageData: function(num, callback) {

    var dat = {
      nPageIndex: num - 1,
      nPageSize: 10,
      strKeyWord: "",
      uProductUUID: -1,
      uProductCategoryUUID: this.uProductCategoryUUID,
      strProductModel: ""
    }

    DoPost(this.url, "product_list", dat, function(res) {
      var list = [],
        Ui_list = res.obj.objectlist || [],
        totalcount = res.obj.totalcount
        console.log('res====================', res);
        Ui_list.forEach(function (item, index) {
          list.push ({
            key: index,
            uProductUUID: item.uProductUUID,
            strProductName_cn: item.strProductName_cn,
            strProductDescription_cn: item.strProductDescription_cn,
            strProductImage: 'http://www.topstarltd.com/Public/Uploads/Kindeditor/image/20161005/20161005101347_66599.jpg',
            dtProductDateTime: item.dtProductDateTime
          })
        })
        const pagination = {
          ...seft.state.pagination
        }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = totalcount;
        callback(list, {
          total: pagination.total,
          nPageSize: 8
        })
      }, function(error) {
        message.info(error);
      })
  },

  columns: [
    {
      title: '机器外形',
      dataIndex: 'strProductImage',
      type: 'image'
    }, {
      title: '名称',
      dataIndex: 'strProductName_cn',
      type: 'string'
    }, {
      title: '描述',
      dataIndex: 'strProductDescription_cn',
      type: 'string'
    }, {
      title: '操作',
      dataIndex: 'uProductUUID',
      type: 'operate', // 操作的类型必须为 operate
      btns: [
        {
          text: '更新',
          type: 'update'
        }, {
          text: '删除',
          type: 'delete'
        }
      ], // 可选
    }
  ],
  // 模拟添加数据的接口 回调
  Create: function(data, callback) {
    console.log('this.uProductUUID====被选中的产品型号是=========', this.uProductUUID)
    let dat = {
      key: '1000',
      strProductName_cn: this.strProductName_cn,
      strProductDescription_cn: data.strProductDescription_cn,
      strProductImage: data.strProductImage,
      dtProductDateTime: data.dtProductDateTime
    }

    HandleCreateform(this.url, "system_customer_add", dat, function(res) {
      //这块请求更新数据 成功回调
      callback(dat);
    })
  },

  //客户信息修改
  Update: function(data, callback) {
    let dat = {
      uMachineUUID: data.uMachineUUID,
      strMachineSN: data.strMachineSN,
      dtMachineBornDatetime: data.dtMachineBornDatetime,
      strMachineNote: data.strMachineNote
    }

    DoPost(this.url, "system_customer_update", dat, function(res) {
      //这块请求更新数据 成功回调
      callback(data)
    })
  },

  // 删除操作
  Delete: function(data, callback) {
    var dat = {
      uMachineUUID: data.uMachineUUID

    }

    DoPost(this.url, "system_customer_del", dat, function(res) {
      //这块请求更新数据 成功回调

      callback(data)
    })
  },

  // 创建项目所需的字段 与 更新项目所需的字段
  // rules 规范可见 https://github.com/yiminghe/async-validator
  UType: [
    {
      name: 'strMachineSN',
      label: '机器型号',
      type: 'string',
      placeholder: '请输入型号',
      rules: [
        {
          required: true,
          min: 5,
          message: '型号至少为 5 个字符'
        }
      ]
    }, {
      name: 'dtMachineBornDatetime',
      label: '出厂日期',
      type: 'date',
      placeholder: '请输入名称',
      rules: [
        {
          required: true,
          min: 5,
          message: '描述至少为 5 个字符'
        }
      ]
    }, {
      name: 'strMachineNote',
      label: '备注',
      type: 'string',
      placeholder: '请输入描述',
      rules: [
        {
          required: true,
          min: 5,
          message: '描述至少为 5 个字符'
        }
      ]
    }
  ],

  // 添加客户名单
  // rules 规范可见 https://github.com/yiminghe/async-validator
  CType: [
    {
      name: 'strMachineSN',
      label: '机器型号',
      type: 'string',
      placeholder: '请输入型号',
      rules: [
        {
          required: true,
          min: 5,
          message: '型号至少为 5 个字符'
        }
      ]
    }, {
      name: 'dtMachineBornDatetime',
      label: '出厂日期',
      type: 'date',
      placeholder: '请输入名称',
      rules: [
        {
          required: true,
          min: 5,
          message: '描述至少为 5 个字符'
        }
      ]
    }, {
      name: 'strMachineNote',
      label: '备注',
      type: 'string',
      placeholder: '请输入描述',
      rules: [
        {
          required: true,
          min: 5,
          message: '描述至少为 5 个字符'
        }
      ]
    }
  ]
};

const Feature = FeatureSetConfig(conf);

let selectoption = {
  stylelish: {
    width: '60%',
    position: 'absolute',
    top: '15%'
  },
  Selectlist: [
    {
      item: '101010000'
    }, {
      item: '101010001'
    }, {
      item: '101010002'
    }
  ]
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      siderInfo: props.siderInfo,
      ptitle:  props.ptitle,
      title: props.title,
      data: [
        {
          key: 0,
          uProductCategoryUUID: '',
          strProductCategoryModel: '',
          strProductCategoryName_cn: '',
          strProductCategoryDescription_cn: '',
          strProductCategoryNote_cn: ''
        }
      ],
      pagination: {
        nPageIndex: '1',
        nPageSize: '8'
      },
      params: {
        nPageIndex: '1',
        nPageSize: '8',
        strKeyWord: ""
      },
      loading: false,
      isUpdate: true
    }
    seft = this;
  }

  onchangeHandle_callback = (key) => {}

  render() {

    const operations = <Button>添加机台</Button> ;

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


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      })
    };

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

    return (
      <div style={{height: '100%'}}>
        <Tabs defaultActiveKey="1"
              onChange={this.onchangeHandle_callback}
              tabBarExtraContent={operations}
              style={{ height: '100%' }}>
         <TabPane tab="全部" key="1" style={{height: '87%'}}>
           <Row type="flex" gutter={16} justify="space-around" style={{margin: 0}}>
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
                      <Link to={'/Feature5-1'}>编辑</Link>
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
                      <a href="https://www.baidu.com" target="_blank">编辑</a>
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
           <div style={{textAlign: '-webkit-center', position: 'absolute', bottom: '7%', left: '32%'}}>
             <Pagination onChange={this.onShowSizeChange} defaultCurrent={6} total={500} />
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
