// 纯数据展现情况列表
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Table, Form, Select, Input, Row, Col,
    Button, Icon, DatePicker, TimePicker, Radio,
    Switch,Upload, Modal, message, Spin, Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import Immutable from 'immutable';

import Sefchsider from 'components/sider/Sefchsider'
import CFormItem from './CreateFormItem';
import CTextItem from './CreateTextItem';
import Expand from './Expandtable';
// 搜索查询栏form 创建新item-form 更新form
import UForm from './UpdateForm';
import CForm from './CreateForm';
import RForm from './RetrieveForm';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 依赖 config 主题生成react 组件函数
const FeatureSet = (config) => {

    let ExpandFeature = (props) => {
      return (
        <Expand config={config} isSlider={false} isUpdate={false} />
      )
    }

    console.log('看看传什么config过来了',config);
    let tableFeature = React.createClass({

        getInitialState: function(){
            return {
              columns: [],
              resultList: [],
              loading: false,
              updateFromShow: false,
              updateFromItem: {},
              total: 0,
              pageSize: 10,
              isSlider: config.isSlider,
              isUpdate: config.isUpdate,
              isSelection:config.isSelection
            }
        },

        componentWillMount: function() {
            this.setState({
                loading: true,
                columns: this.dealConfigColumns(config.columns)
            });
        },

        componentDidMount: function(){
            const self = this;

            // 处理接口分页的逻辑
            if(config.pageData){
                self.getpageData(1);
            }else{ // 处理 前端分页的逻辑
                config.initData(function(list){
                    self.setState({
                        loading: false,
                        resultList: list
                    });
                });
            }
        },

        shouldComponentUpdate: function (nextProps, nextState){
          const self = this

          return true
        },

        componentWillUpdate() {
          const self = this
          // 处理接口分页的逻辑
          // {if(config.pageData){
          //     self.getpageData(1);
          // }else{ // 处理 前端分页的逻辑
          //     config.initData(function(list){
          //         self.setState({
          //             loading: false,
          //             resultList: list
          //         });
          //     });
          // }}
        },

         //获取数据
         getpageData: function(num){
            const self = this
            self.setState({
              loading: true
            })

            config.pageData(num,function(list, info){
                self.setState({
                    loading: false,
                    resultList: list,
                    total: info.total,
                    pageSize: info.nPageSize || 10,
                })
            })
        },

        // 预处理配置显示中的 colums 数据 用于anted的table配置
        dealConfigColumns: function(lists){
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
                                                    <a href="javascript:void 0;" onClick={self.operateCallbacks.bind(self, record, btn)}>{btn.text}</a>
                                                    {i!==btns.length-1?<span className="ant-divider"></span>:''}
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
        },

        // columns 类型对应的通用痛render
        renderFunc: {
            link: (text) => (
                    <span>
                        <a href={text}>{text}</a>
                    </span>),

            image: (url) => (
                    <span>
                        <img src={url} />
                    </span>)
        },

        handleSelect: function(selectedKeys, subtitle) {
          const self = this
          config.uProductCategoryUUID = selectedKeys[0]
          global.slidertitle = subtitle
          self.getpageData(1)
        },

        handleCreate: function(info){
            const self = this;
            config.Create(info, function(item){
              // 初级接口的坑
              if(!item){
                config.initData(function(list){
                  self.setState({
                      loading: false,
                      resultList: list
                  })
                })
                return
              }

              let lists = self.state.resultList;

              self.state.resultList.unshift(item);

              let result = Immutable.fromJS(self.state.resultList)

              let resultList = result.map( function(v, i) {
                if (v.get('key') == item.key) {
                  return Immutable.fromJS(item)
                } else {
                  return v
                }
              })
              self.setState({
                loading: false,
                resultList: resultList.toJS()
              })
            })
        },

        handleUpdate: function(info){
          const self = this;
          let result = Immutable.fromJS(self.state.resultList);

          let infoN = Immutable.fromJS(self.state.updateFromItem).merge(info).toJS();
          config.Update(infoN, function (item) {
            let resultList = result.map( function(v, i) {
              if(v.get('key') == item.key){
                return Immutable.fromJS(item)
              }else{
                return v
              }
            })

            message.success('更新成功')

            self.setState({
              loading: false,
              updateFromShow: false,
              resultList: resultList.toJS()
            });
          });
        },
        //切换弹框显示
        hideUpdateForm: function(){
          this.setState({
            updateFromShow: false,
            updateFromItem: {}
          })
        },

        // 搜索更新处理
        handleRetrieve: function(info){
          const self = this;
          self.setState({
            loading: true
          })

          config.Retrieve(info, function(list){
            self.setState({
              loading: false,
              resultList: list
            })
          })
        },

        // table 操作列回调处理
        operateCallbacks: function(item, btn){
            const self = this;

            if(btn.type){

                let resultList;
                let type = btn.type;
                let itemI = Immutable.fromJS(item);
                let result = Immutable.fromJS(self.state.resultList);

                // table 操作栏目通用设定为 更新与删除 两项
                if(type === 'update'){
                  this.setState({
                      updateFromShow: true,
                      updateFromItem: itemI.toJS()
                  });
                }else if(type === 'delete'){
                    this.setState({
                      loading: true
                    })

                    config.Delete(itemI.toJS(), function(){
                      resultList = result.filter(function(v, i){
                          if(v.get('key') !== itemI.get('key')){
                              return true;
                          }
                      })
                      message.success('删除成功');

                      self.setState({
                          loading: false,
                          resultList: resultList.toJS()
                      })
                    })
                }

            }else if(btn.callback){
                btn.callback(item);
            }
        },

        render: function() {
            /* table勾选处理函数 */
            const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                },
                getCheckboxProps: record => ({
                  disabled: record.name === 'Disabled User',    // Column configuration not to be checked
                }),
              };

            const self = this

            let table
            let Slider
              console.log('有没有选择呀',this.state.isSelection)
            Slider = self.state.isSlider ? <Sefchsider handleSelect={ this.props.isFetchmach ? config.handleSelect : self.handleSelect } /> : <span></span>;

            if (config.pageData) {
                const pagination = {
                    total: this.state.total,
                    pageSize: this.state.pageSize,
                    onChange: function(num){
                        self.setState({
                            loading: true
                        })
                        self.getpageData(num)
                    }
                }
                table = <Table rowSelection={this.state.isSelection?rowSelection:null} dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} pagination={pagination} />;
            } else {
                table = <Table rowSelection={this.state.isSelection?rowSelection:null} dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} />;
            }

            return  <div className={this.props.className} >
                      {Slider}
                      <div style={{ flex: 7 }}>
                        <Breadcrumb className="title">
                          <Breadcrumb.Item>{this.props.ptitle}</Breadcrumb.Item>
                          <Breadcrumb.Item>{ self.state.isSlider ? global.slidertitle : this.props.title }</Breadcrumb.Item>
                        </Breadcrumb>
                          <RForm RType={config.RType} submit={self.handleRetrieve} />
                          <CForm CType={config.CType} submit={self.handleCreate} />
                          <UForm UType={config.UType} submit={self.handleUpdate} isShow={this.state.updateFromShow} updateItem={this.state.updateFromItem} hideForm={this.hideUpdateForm}/>
                        {table}
                      </div>
                    </div>
        },
    });

    let graphFeature = React.createClass({
        getInitialState: function(){
            return {
                option: false
            }
        },

        componentWillMount: function(){
        },

        render: function() {
            const self = this;
            const itemInfo = this.state.item;

            const operate = config.operate || [];

            return  <div className={this.props.className}>
                        {this.state.option?
                        <ReactEcharts
                            option={this.state.option}
                            style={config.EchartStyle}
                            className='react_for_echarts' />:
                        ''}
                    </div>
        },

        componentDidMount: function(){
            const self = this;

            config.initData(function(option){
                self.setState({
                    option: option
                });
            });
        }
    });

    switch (config.type){
        case 'tableList':
            return tableFeature;
            break;

        case 'graphList':
            return graphFeature;
            break;
        case 'complexObject':
            return complexFeature;
            break;
        case 'Expandtable':
            return ExpandFeature;
            break;
        default:
            return tableFeature;
            break;
    }
}

export default FeatureSet;
