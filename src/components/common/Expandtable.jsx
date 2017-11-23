
import React, {Component} from 'react'
import connect from 'mqtt';
import {
  Grid,
  Clearfix,
  ProgressBar,
  Popover,
  OverlayTrigger,
  popoverBottom,
  Label
} from 'react-bootstrap'
import {
  Button,
  Tabs,
  Icon,
  Row,
  Menu,
  Breadcrumb,
  Badge,
  Dropdown,
  Col,
  Tag,
  Progress,
  Table,
  Layout,
  Card,
  Spin,
  notification,
  Alert
} from 'antd'
import {Link} from 'dva/router'
import Immutable from 'immutable';
import CFormItem from './CreateFormItem';
import CTextItem from './CreateTextItem';
// 搜索查询栏form 创建新item-form 更新form
import UForm from './UpdateForm';
import CForm from './CreateForm';
import RForm from './RetrieveForm';
import Sefchsider from '../../components/sider/Sefchsider'
import ReactSVG from 'react-svg'
let self
const client = connect('mqtt://iec.topstarltd.com:9011')
// const client = connect('mqtt://ice.top-link.me:9011')

const {Sider} = Layout



const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>
            <Dropdown overlay={menu}>
              <a href="#">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}/>
    );
  };

export default class APP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      resultList: [],
      loading: false,
      updateFromShow: false,
      updateFromItem: {},
      total: 0,
      pageSize: 30,
      isSlider: this.props.isSlider,
      isUpdate: this.props.isUpdate,
      config: this.props.config
    }
    self = this;
  }

  componentWillMount() {
    this.setState({
        loading: true,
        columns: this.dealConfigColumns(this.props.config.columns)
    })
  }

  componentDidMount() {
    const self = this;

    // 处理接口分页的逻辑
    if(self.state.config.pageData){
        self.getpageData(1);
    }else{ // 处理 前端分页的逻辑
        self.state.config.initData(function(list){
            self.setState({
                loading: false,
                resultList: list
            });
        });
    }
  }

  componentWillUnmount() {
    client.end() //关闭mqtt连接, 释放服务器资源
  }


  renderFunc = {
    link: (text) => (
            <span>
                <a href={text}>{text}</a>
            </span>),
    image: (url) => (
            <span>
                <img src={url} />
            </span>)
  }

  // 预处理配置显示中的 colums 数据 用于anted的table配置
  dealConfigColumns = (lists) => {

      const self = this;

      let columns = [];
      lists.forEach((item) => {
          let column = {
              title: item.title,
              dataIndex: item.dataIndex,
              key: item.dataIndex,
              width: item.width
          }

          if( item.type === 'operate' ){
              // 兼容单一形式与数组形式
              let btns = Array.isArray(item.btns)?item.btns:[item.btns];

              // 处理表单 操作 栏目以及回调函数
              column.render = item.render || function(txt, record){
                  return <span>
                          {
                              btns.map(function(btn,i) {
                                  if( btn.text ){
                                      return  (
                                          <span key={i}>
                                              <a href="javascript:void 0;" >{btn.text}</a>
                                              { i!==btns.length-1?<span className="ant-divider"></span> : '' }
                                          </span>
                                      );
                                  }else if( btn.render ){
                                      return (
                                          <span key={i}>
                                              {btn.render(txt, record)}
                                              {i!==btns.length-1?<span className="ant-divider"></span>:''}
                                          </span>
                                      );
                                  }
                              })
                          }
                          </span>
              };
          }else if( !item.dataIndex ){
              item.dataIndex = 'NORMAL_INDEX';
              column.render = item.render || self.renderFunc[item.type];
          } else{
              column.render = item.render || self.renderFunc[item.type] || ((text) => (<span>{text}</span>));
          }

          if(item.sort){
              column.sorter = item.sorter || ((a, b) => a[item.dataIndex] - b[item.dataIndex]);
          }
          columns.push(column);

      });

      return columns;

  }
  //查询回调
  handleRetrieve= (info)=>{
    const self = this;
    self.setState({
      loading: true
    })

    self.state.config.Retrieve(info, function(list){
      self.setState({
        loading: false,
        resultList: list
      })
    })
  }

  getpageData = (num) => {
    const self = this
    self.setState({
      loading: true
    })

    self.state.config.pageData(num, function(list, info){
        self.setState({
            loading: false,
            resultList: list,
            total: info.total,
            pageSize: info.nPageSize || 10,
        })
    })
  }

  render() {

    let table
    let Slider
    Slider = self.state.isSlider ? <Sefchsider handleSelect={ this.props.isFetchmach ? self.state.config.handleSelect : self.state.handleSelect } /> : <span></span>;
    if (self.state.config.pageData) {
        const pagination = {
            total: this.state.total,
            pageSize: this.state.pageSize,
            onChange: function(num) {
                self.setState({
                    loading: true
                })
                self.getpageData(num)
            }
        }
        table = <Table className="components-table-demo-nested"
                        expandedRowRender={self.state.config.expandedRowRender}
                        dataSource={this.state.resultList}
                        columns={this.state.columns}
                        loading={this.state.loading}
                        pagination={pagination} />;

    } else {
        table = <Table dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} />;
    }

    return  <div className={this.props.className} >
              { Slider }
              <div style={{ flex: 7 }}>
                <Breadcrumb className="title">
                  <Breadcrumb.Item>{ this.props.ptitle }</Breadcrumb.Item>
                  <Breadcrumb.Item>{ self.state.isSlider ? global.slidertitle : this.props.title }</Breadcrumb.Item>
                </Breadcrumb>
                  <RForm RType={self.state.config.RType} submit={self.handleRetrieve} />
                  <CForm CType={self.state.config.CType} submit={self.handleCreate} />
                  <UForm UType={self.state.config.UType} submit={self.handleUpdate} isShow={this.state.updateFromShow} updateItem={this.state.updateFromItem} hideForm={this.hideUpdateForm}/>
                {table}
              </div>
            </div>
  }
}
