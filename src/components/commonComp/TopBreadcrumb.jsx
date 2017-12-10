import React from 'react';
import { Menu, Icon, Breadcrumb } from 'antd';

const TopBreadcrumb = (props) => {
  return (
    <div style={{padding:20,backgroundColor:'white',fontSize:25}}>
      <Breadcrumb>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item><a href="">机台监控</a></Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default TopBreadcrumb
