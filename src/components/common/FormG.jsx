
import React, {
  Component
} from 'react'
import CForm from './CreateForm';
import Reqwest from 'reqwest';

let seft

const FormG = (Info) => {
    let config = {
        // 创建项目所需的字段 与 更新项目所需的字段
        // rules 规范可见 https://github.com/yiminghe/async-validator

    };
    return  <CForm MeduleInfo={Info} CType={Info.CType}/>

}

export default FormG;
