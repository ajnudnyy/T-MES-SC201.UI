import React from 'react';
import { Affix, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'dva/router';



function Footer(props){
    return  <div className="footer">
              <Row>
                <Col xs={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 1 }} style={{fontWeight: '700'}}></Col>
                <Col xs={{ span: 11, offset: 2 }} lg={{ span: 6, offset: 3 }} style={{color: '#108ee9', fontSize: 'small', fontWeight: '100'}}>CopyRight (C) 拓斯达科技</Col>
                <Col xs={{ span: 3, offset: 3 }} lg={{ span: 3, offset: 4 }} style={{fontSize: '14px'}}>
                </Col>
              </Row>
            </div>
};
export default Footer;
