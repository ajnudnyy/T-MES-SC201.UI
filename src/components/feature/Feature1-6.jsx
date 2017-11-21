import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {Link} from 'dva/router';
import FormG from '../common/FormG';
import Sefchsider from '../../components/sider/Sefchsider';
import FeatureSetConfig from '../common/FeatureSetConfig';
import SelectItem from '../common/SelectItem';
import {DoPost, HandleCreateform} from '../../server'
import config from '../../config';
import Timeline from '../commonComp/Timeline'
import {
  Layout,
  Tree,
  Table,
  Tabs,
  Button,
  Card,
  Menu,
  Icon,
  Modal,
  Row,
  Col
} from 'antd'
import { ProgressBar } from 'react-bootstrap'
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
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <ProgressBar>
          <ProgressBar striped bsStyle="success" now={35} label={`10%`} key={1} />
          <ProgressBar bsStyle="warning" now={20} label={`10%`} key={2} />
          <ProgressBar active bsStyle="danger" now={10} label={`10%`} key={3} />
        </ProgressBar>
        <Timeline />

        <Feature className="Topflex" isUpdate={ this.state.isUpdate } ptitle={seft.state.ptitle} title={seft.state.title} />
      </div>
    )
  }
}
