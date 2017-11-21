import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import config from '../../config';
import { ButtonToolbar, Panel } from 'react-bootstrap';
import { HandleCreate } from '../../server'

import { Layout, Tree, Table, Tabs, Tag, Button, Card, Menu, Icon, Row, Col, Modal, message } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm

let seft

const title = (
  <h3>UI工程</h3>
);

export default class Feature extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      show: false,
      siderInfo: config.sider
    }
    seft = this;
    this.Plproject_List()
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  reRrash = (selectedKeys, info) => {
    this.forceUpdate()
  }

  Plproject_List = (e) => {
      var obj = {
          //uProjectUUID : 0 ,    // ¹¤³ÌUUID
      }

      this.DoPost_Project("Plproject_List",obj,function(res){
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

  HandleViewPl = (uPLProjectUUID) => {
    var url = 'http://dev.top-link.me/pl/?id='+ uPLProjectUUID;
    var win = window.open(url, '_blank');
    win.focus()
  }

  showModal () {
    seft.setState({
      show: true
    });
  }

  hideModal () {
    seft.setState({
      show: false
    });
  }

  HandleDeletePl = (uPLProjectUUID) => {
    const MeduleInfo = {
      modleName: 'Plproject',
      op: "_Del"
    }
    var dat = {
      uPLProjectUUID : uPLProjectUUID || 0,    // 工程UUID
    }

    confirm({
      title: '你确定要删除此条目?',
      content: '删除之后不可恢复',
      onOk() {
        HandleCreate(MeduleInfo, dat, function(json){
            message.success('删除成功');
            window.location.reload()
          },
          function(){
            message.info('删除失败');
          }
        )
      },
      onCancel() {
        message.info('取消删除');
      },
    });
  }

  render() {
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
      render: (text, record) => (
        <span>
          <a onClick={ () => { seft.HandleViewPl( text ) } }>查看</a>
          <span className="ant-divider" />
          <a onClick={ () => { seft.HandleDeletePl( text ) } }>删除</a>
        </span>
      )
    }]

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    const MeduleInfo = {
      opName: "PL工程添加",
      modleName: 'Plproject',
      op: "_Add",
      CType: [
          {
              name: 'strPLProjectName',
              label: '工程名',
              type: 'string',
              placeholder: '请输入PL工程名称',
              rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
          }
      ]
    }

    const operations = FormG(MeduleInfo);

    return (
        <div style={{height: '100%'}}>
          <SubSider {...this.state.siderInfo}/>
          <Tabs defaultActiveKey="1"
                onChange={this.onchangeHandle_callback}
                tabBarExtraContent={operations}
                style={{ }}>
             <TabPane tab="全部" key="1">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
             </TabPane>
             <TabPane tab="已发布" key="2">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
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
