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
            dtProductDateTime: item.dtProductDateTime,
            productData: item.strProductDescription_cn,
            reason: item.strProductDescription_cn
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
      title: '状态',
      dataIndex: 'strProductImage',
      type: 'image'
    }, {
      title: '时间起点',
      dataIndex: 'strProductName_cn',
      type: 'string'
    }, {
      title: '报警(次)',
      dataIndex: 'strProductDescription_cn',
      type: 'string'
    }, {
      title: '开模数量',
      dataIndex: 'uProductUUID',
      type: 'string'
    }, {
      title: '生产数据',
      dataIndex: 'productData',
      type: 'string'
    }, {
      title: '停机原因',
      dataIndex: 'reason',
      type: 'string'
    }
  ],
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
