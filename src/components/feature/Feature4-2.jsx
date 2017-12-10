import React, {
    Component
  } from 'react'
  import { browserHistory } from 'react-router'
  import { Link } from 'dva/router';
  import FormG from 'common/FormG';
  import SubSider from 'components/sider/Sider';
  import FeatureSetConfig from 'common/FeatureSetConfig';
  import {DoPost, HandleCreateform} from '../../server';
  import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal, Popconfirm, Badge, Dropdown } from 'antd'
  const { Header, Footer, Sider, Content } = Layout
  const TreeNode = Tree.TreeNode
  const TabPane = Tabs.TabPane
  const SubMenu = Menu.SubMenu
  const MenuItemGroup = Menu.ItemGroup
  const confirm = Modal.confirm
  let seft


  const conf = {
      /**
       * 基础配置参数
       * 1.type:表格类型   
       * 2.isSelection:table是否带勾选
       * **/
      type: 'tableFeature',
      isSelection:true,
      // isSlider:true,
      // isUpdate:true,

      columns: [
        {
          title: '任务编号',
          dataIndex: 'uPLProjectUUID',
          type: 'string'
        }, {
          title: '模具编号',
          dataIndex: 'dtPLProjectUpdateTimeUTC',
          type: 'dtPLProjectUpdateTimeUTC'
        }, {
          title: '用料名称',
          dataIndex: 'strPLProjectName',
          type: 'string'
        },
        {
          title: '机器号',
          dataIndex: 'strPLProjectDescription',
          type: 'string'
        },{
          title: '计划模数',
          dataIndex: 'strPlanNum',
          type: 'string'
        },{
          title: '计划开始',
          dataIndex: 'strPlanStart',
          type: 'string'
        },{
          title: '操作',
          dataIndex: 'uMachineUUID',
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
      // 初始化页面的数据 回调函数传入 items 列表
      pageData: function(num ,callback) {
  
        var dat = {
          nPageSize: 8,
          nPageIndex: num - 1,
          uProductUUID: '101010000',
          uDeviceUUID: 0,
          strKeyWord: ''
        }
  
        DoPost(this.url, "Plproject_List", dat, function(res) {
          var list = [],
            Ui_list = res.obj || [],
            totalcount = res.obj.totalcount
            Ui_list.forEach(function(item, index) {
              list.push({
                key: index,
                uPLProjectUUID: item.uPLProjectUUID,
                dtPLProjectUpdateTimeUTC: item.dtPLProjectUpdateTimeUTC,
                strPLProjectDescription: item.strPLProjectDescription,
                strPLProjectName: item.strPLProjectName,
                strPLProjectNote: item.strPLProjectNote,
                strPlanNum:'280',
                strPlanStart:'2017年12月31'
              })
            })
          const pagination = {
            ...seft.state.pagination
          }
          // Read total count from server;
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

      /* 临时添加测试*/
      uProductUUID: 0,
      url: 'http://dev.top-link.me/dev/Handler_Plproject_V1.ashx',      

      // 模拟添加数据的接口 回调
      Create: function(data, callback) {
        let dat = {
          key: '1000',
          uProductUUID: this.uProductUUID,
          strMachineSN: data.strMachineSN,
          dtMachineBornDatetime: data.dtMachineBornDatetime,
          strMachineNote: data.strMachineNote
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

     /*  
      ***创建项目所需的字段 与 更新项目所需的字段
      ****rules 规范可见 https://github.com/yiminghe/async-validator 
      */
      /* UType: [
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
      ], */
  

      /* 
      **可设置的查询字段 
      */
      /* RType: [
        {
              name: 'id',
              label: '订单号',
              type: 'string',
              placeholder: '请输入单号'
        },
        {
              name: 'date',
              label: '交付时间',
              type: 'date'
        },
        {
          name: 'stype',
          label: '订单状态',
          type: 'select',
          defaultValue: '计划中',
          options: [
            {
              key: 21,
              value: '生产中',
              text: '生产中'
            },
            {
              key: 12,
              value: '已结束',
              text: '已结束'
            }
          ]
        }
      ], */
  

      /**
       * *查询操作回调
       *  */
      Retrieve: function(data, callback) {
        var dat = {
          nPageSize: 8,
          nPageIndex: 0,
          uProductUUID: data.stype,
          strKeyWord: ''
        }
        this.uProductUUID = data.stype
        DoPost(this.url, "machine_list", dat, function(res) {
  
          var list = [],
            Ui_list = res.obj.objectlist || [],
            totalcount = res.obj.totalcount
          let i = 0;
          Ui_list.forEach(function(ele) {
            ele.key = i++;
          });
  
          // 查询成功 传入列表数据
          callback(Ui_list);
  
        }, function(error) {
          message.info(error);
        })
      },

      handleSelect: function (selectedKeys) {
        let dat = {
          nPageIndex: 0,
          nPageSize: -1,
          strKeyWord: "",
          uProductUUID: -1,
          uProductCategoryUUID: selectedKeys[0],
          strProductModel: ""
        }
        DoPost('http://iec.topstarltd.com/admin/Handler_Product_V1.ashx', "product_list", dat, function(res) {
          var Ui_list = res.obj.objectlist || [],
            totalcount = res.obj.totalcount
          Ui_list.forEach(function(item, index) {
            window.productOptions.push({
              key: item.uProductUUID,
              value: item.uProductUUID.toString(),
              text: item.strProductName_cn
            })
          })
          seft.setState({
            isUpdate: !seft.state.isUpdate
          })
        }, function(error) {
          message.info(error);
        })
      },
  };
  
  const Feature = FeatureSetConfig(conf);
  
  export default class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        siderInfo: props.siderInfo,
        data: [{
          key: 0,
          uProductCategoryUUID: '',
          strProductCategoryModel: '',
          strProductCategoryName_cn: '',
          strProductCategoryDescription_cn: '',
          strProductCategoryNote_cn: ''
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
      return (
        <Feature isslider={true} />
      )
    }
  }
  