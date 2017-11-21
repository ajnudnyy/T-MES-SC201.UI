
import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';
import { DoPost, HandleCreateform } from '../../server'
import config from '../../config';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft
//dgfdgdfgcvbvcbcv

const conf = {

    type: 'tableList',

    // 初始化页面的数据 回调函数传入 items 列表
    pageData: function(num, callback){

        var dat = {
          nPageSize: 8,
          nPageIndex: num - 1,
          strKeyWord: ''
        }

        console.log('dat.nPageIndex,==============', dat.nPageIndex)
        DoPost('http://localhost:8810/admin/Handler_Customer_V1.ashx', "system_customer_list", dat ,function(res){
            console.log('res===================', res)
            var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
            Ui_list.forEach(function(item, index){
              console.log('index=========', index)
              list.push({
                key: index,
                uCustomerUUID: item.uCustomerUUID,
                strCustomerLogo: item.strCustomerLogo,
                strCustomerMobile: item.strCustomerMobile,
                strCustomerName: item.strCustomerName,
                strCustomerAddress: item.strCustomerAddress,
                strCustomerEmail: item.strCustomerEmail
              })
            })
            console.log('list==========', list)
            const pagination = { ...seft.state.pagination }
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = totalcount;
            callback( list, {
              total: pagination.total,
              nPageSize: 8
            })
        }, function(error){
          message.info(error);
        })
    },

    columns: [
        {
            title: 'strCustomerEmail',
            dataIndex: 'strCustomerEmail',
            type: 'string'
        }, {
            title: 'strCustomerMobile',
            dataIndex: 'strCustomerMobile',
            type: 'string'
        }, {
            title: 'strCustomerName',
            dataIndex: 'strCustomerName',
            type: 'string'
        },{
            title: 'strCustomerAddress',
            dataIndex: 'strCustomerAddress',
            type: 'string'
        },{
            title: '操作',
            dataIndex: 'uCustomerUUID',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
              text: '更新',
              type: 'update'
            },{
              text: '删除',
              type: 'delete'
            }], // 可选
        }
    ],
    // 模拟添加数据的接口 回调
    Create: function(data, callback){
      let dat = {
        key: '1000',
        strCustomerEmail: data.strCustomerEmail,
        strCustomerMobile: data.strCustomerMobile,
        strCustomerName: data.strCustomerName,
        strCustomerAddress: data.strCustomerAddress,
      }

      HandleCreateform('http://localhost:8810/admin/Handler_Customer_V1.ashx', "system_customer_add", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(dat);
      })

    },

    //客户信息修改
    Update:function(data, callback){
      console.log('data============',data);
      let dat = {
        uCustomerUUID: data.uCustomerUUID,
        strCustomerAddress: data.strCustomerAddress,
        strCustomerEmail: data.strCustomerEmail,
        strCustomerLogo: data.strCustomerLogo,
        strCustomerMobile: data.strCustomerMobile,
        strCustomerName: data.strCustomerName
      }

      DoPost('http://localhost:8810/admin/Handler_Customer_V1.ashx', "system_customer_update", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(data);
      })
    },

    // 删除操作
    Delete: function(data, callback){
      var dat = {
        uCustomerUUID: data.uCustomerUUID
      }

      DoPost('http://localhost:8810/admin/Handler_Customer_V1.ashx', "system_customer_del", dat ,function(res){
        //这块请求更新数据 成功回调

        callback(data);
      })
    },
    // 创建项目所需的字段 与 更新项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator
    UType: [
        {
            name: 'strCustomerLogo',
            label: 'logo',
            type: 'string',
            placeholder: '请输入邮箱',
            rules: [{ required: true, min: 5, type: 'email', message: '用户名至少为 5 个字符' }]
        },{
            name: 'strCustomerEmail',
            label: '邮箱',
            type: 'string',
            placeholder: '请输入邮箱',
            rules: [{ required: true, min: 5, type: 'email', message: '用户名至少为 5 个字符' }]
        },{
            name: 'strCustomerMobile',
            label: '手机',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, min: 11, message: '手机号不合法' }]
        },{
            name: 'strCustomerName',
            label: '公司名称',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, message: '请输入正确的名称' }]
        },{
            name: 'strCustomerAddress',
            label: '地址',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, message: '请输入正确的地址' }]
        }
    ],
    // 添加客户名单
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType: [
      {
          name: 'strCustomerEmail',
          label: '邮箱',
          type: 'string',
          placeholder: '请输入邮箱',
          rules: [{ required: true, min: 5, type: 'email', message: '用户名至少为 5 个字符' }]
      },{
          name: 'strCustomerMobile',
          label: '手机',
          type: 'string',
          placeholder: '请输入标示名称',
          rules: [{ required: true, min: 11, message: '手机号不合法' }]
      },{
          name: 'strCustomerName',
          label: '公司名称',
          type: 'string',
          placeholder: '请输入标示名称',
          rules: [{ required: true, message: '请输入正确的名称' }]
      },{
          name: 'strCustomerAddress',
          label: '地址',
          type: 'string',
          placeholder: '请输入标示名称',
          rules: [{ required: true, message: '请输入正确的地址' }]
      }
    ]
};

const Feature = FeatureSetConfig(conf);

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      siderInfo: props.siderInfo,
      data: [{
        key: 0,
        uCustomerUUID: '',
        strCustomerName: '',
        strCustomerAddress: '',
        strCustomerEmail: ''
      }],
      pagination: {
        nPageIndex: '1',
        nPageSize: '8'
      },
      params: {
        nPageIndex: '1',
        nPageSize: '8',
        strKeyWord: ""
      },
      loading: false
    }
    seft = this;
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
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

  HandleViewPl = (uULProjectUUID) => {
    var url = 'http://dev.top-link.me/ul/?id='+ uULProjectUUID;
    var win = window.open(url, '_blank');
    win.focus()
  }

  render() {
    const MeduleInfo = {
      opName: "Ul工程项目添加",
      modleName: "UIproject",
      op: "_Add",
      uDevModelUUID: "0",
      CType: [
        {
          name: 'strUIProjectName',
          label: '工程名',
          type: 'string',
          placeholder: '请输入PL工程名称',
          rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
        }
      ]
    }

    const operations = FormG(MeduleInfo);

    return (
      <div>
        <SubSider {...this.state.siderInfo}/>
        <Tabs defaultActiveKey="1"
              onChange={this.onchangeHandle_callback}
              //tabBarExtraContent={operations}
              style={{ }}>
         <TabPane tab="全部" key="1">
           <Feature />
         </TabPane>
         <TabPane tab="已发布" key="2">
         </TabPane>
         <TabPane tab="发布中" key="3">
         </TabPane>
         <TabPane tab="已停止" key="4">
         </TabPane>
        </Tabs>
      </div>
    )
  }
}
