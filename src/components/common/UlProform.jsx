import React, {
  Component
} from 'react'
import CForm from './CreateForm';
import Reqwest from 'reqwest';

let seft

const UlProform = (props) => {
    let config = {
        // 创建项目所需的字段 与 更新项目所需的字段
        // rules 规范可见 https://github.com/yiminghe/async-validator
        CType: [
            {
                name: 'name',
                label: '工程名',
                type: 'string',
                placeholder: '请输入PL工程名称',
                rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
            }
        ]
    };

    return  <CForm MeduleInfo={this.props.MeduleInfo} CType={config.CType}/>

}

export default UlProform;
