import React, {
  Component
} from 'react'
import { Tree } from 'antd';
import { DoPost, HandleCreateform } from '../../server'
const TreeNode = Tree.TreeNode;
let seft
const url = 'http://iec.topstarltd.com/admin/Handler_ProductCategory_V1.ashx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
    seft = this
    let dat = {
      nPageIndex: 0,
      nPageSize: "-1",
      strKeyWord: "",
      uProductCategoryUUID: -1,
      uProductCategoryParentUUID: 0
    }

    DoPost(url, "product_category_list", dat ,function(res){
      var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
      Ui_list.forEach(function(item, index){
        list.push({
          key: item.uProductCategoryUUID,
          title: item.strProductCategoryName_cn,
        })
      })
      seft.setState({
        treeData: [...list],
      });
    }, function(error){

    })
  }

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      let dat = {
        nPageIndex: 0,
        nPageSize: "-1",
        strKeyWord: "",
        uProductCategoryUUID: -1,
        uProductCategoryParentUUID: treeNode.props.eventKey
      }

      DoPost(url, "product_category_list", dat ,function(res){
        var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
        Ui_list.forEach(function(item, index){
          list.push({
            key: item.uProductCategoryUUID,
            title: item.strProductCategoryName_cn,
          })
        })

        treeNode.props.dataRef.children = list

        seft.setState({
          treeData: [...seft.state.treeData],
        })
        resolve()
      }, function(error){
        resolve()
      })
    })
  }

  onSelect = (selectedKeys, selectedNodes, node, event) => {
    console.log('selectedNodes==============', selectedNodes.node.props.title)

    this.props.handleSelect(selectedKeys, selectedNodes.node.props.title)
  }

  //
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />
    })
  }

  render() {
    return (
      <div style={{ paddingRight: '16px', flex: '1' }}>
        <div  className="logo"
              style={{  background: 'rgb(247, 247, 247)',
                        borderRadius: '4px 4px 0 0',
                        padding: '2% 16px 2% 22px',
                        border: 'solid 1px #eee',
                        borderBottom: '0px'}}>设备类型</div>
        <Tree
          loadData={this.onLoadData}
          onSelect={this.onSelect}>
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </div>
    );
  }
}
