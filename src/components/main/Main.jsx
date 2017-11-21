import React from 'react';
import { Menu, Icon, Breadcrumb } from 'antd';
import { Link } from 'dva/router'

const Main = (props) => {

    let Feature = props.feature;
    console.log('props.params==========', props.params)
    return  <div key={props.featureId} className="mainer">
              <p className="pageTitle">机台监控</p>
              <Feature siderInfo={ props.siderInfo } params={props.params || ''} ptitle={props.ptitle} title={props.title} className="item" />
            </div>
}

export default Main;
