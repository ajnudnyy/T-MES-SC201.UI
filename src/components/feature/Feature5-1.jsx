import React, {
  Component
} from 'react'
import { ButtonToolbar, Modal, Panel } from 'react-bootstrap';
import { Menu, Row, Col, Tabs, Button, Tag, Dropdown, Icon } from 'antd';

const TabPane = Tabs.TabPane
const title = (
  <h3>UI工程</h3>
);

let seft

class Appdetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      abc: 'dfg745g',
      bcd: '4556461',
      cru_model: 'TSR-900机器人',
      AppId: '13464646512',
      Token: '4316581612',
      updatetime: '2016-10-26'
    }
    seft = this
  }

  componentDidMount () {}

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

  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">菜单一</Menu.Item>
        <Menu.Item key="2">菜单二</Menu.Item>
        <Menu.Item key="3">菜单三</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row  gutter={8}
              style={{
                margin: '0 0.2%'
              }}>
          <Col span={6}>
            <ul style={{
              fontWeight: '500',
              padding: '4% 2%'
            }}>
              <li>机台: 80</li>
              <li style={{
                color: '#00a854'
              }}>运行中</li>
            </ul>
          </Col>
          <Col span={6} style={{paddingTop: '10px'}}>
            <ul style={{
              padding: '1% 4%'
            }}>
              <li style={{
                fontWeight: '800'
              }}>{ this.state.cru_model }</li>
              <li style={{
                color: '#108ee9',
                margin: '4% 0px'
              }}>编号：T2201554587
              </li>
              <li style={{
                margin: '4% 0px',
                fontWeight: '900'
              }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
              <li style={{
                margin: '4% 0px'
              }}>
                <Tag color="orange">标签对</Tag>
                <Tag color="orange">标签对</Tag>
              </li>
            </ul>
          </Col>
          <Col span={6} style={{paddingTop: '10px'}}>
            <ul style={{
              fontWeight: '500',
              padding: '4% 2%'
            }}>
              <li>机台: 80</li>
              <li style={{
                color: '#00a854'
              }}>运行中</li>
            </ul>
          </Col>
          <Col span={6} style={{paddingTop: '18px'}}>
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }} size={'large'}>
                发布APP <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="数据模型" key="1">
            <Panel header={title} bsStyle="info">
              <Row  gutter={8}
                    style={{
                      margin: '0 0.2%'
                    }}>
                <Col span={6}>
                  <ul style={{
                    fontSize: 'xx-large',
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      fontSize: 'larger',
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontSize: 'x-large',
                      fontWeight: '800'
                    }}>{ this.state.cru_model }</li>
                    <li style={{
                      color: '#108ee9',
                      fontSize: 'medium',
                      margin: '4% 0px'
                    }}>编号：T2201554587
                    </li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'medium',
                      fontWeight: '900'
                    }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
                    <li style={{
                      margin: '4% 0px'
                    }}>
                      <Tag color="orange">标签对</Tag>
                      <Tag color="orange">标签对</Tag>
                    </li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    fontSize: 'xx-large',
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      fontSize: 'larger',
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '18px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontSize: 'medium',
                      fontWeight: '500'
                    }}>工单：{ seft.state.AppId }</li>
                    <li style={{
                      color: '#108ee9',
                      fontSize: 'medium',
                      fontWeight: '500',
                      margin: '4% 0px'
                    }}>产品：{ seft.state.Token }</li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'medium',
                      fontWeight: '900'
                    }}>
                      产品：{ seft.state.task_name }
                    </li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'large'
                    }}>
                      预计完成时间: { seft.state.updatetime }
                    </li>
                  </ul>
                </Col>
              </Row>
            </Panel>
          </TabPane>
          <TabPane tab="PL工程" key="2">
            <Panel header={title} bsStyle="info">
              <Row  gutter={8}
                    style={{
                      margin: '0 0.2%'
                    }}>
                <Col span={6}>
                  <ul style={{
                    fontSize: 'xx-large',
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      fontSize: 'larger',
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontSize: 'x-large',
                      fontWeight: '800'
                    }}>{ this.state.cru_model }</li>
                    <li style={{
                      color: '#108ee9',
                      fontSize: 'medium',
                      margin: '4% 0px'
                    }}>编号：T2201554587
                    </li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'medium',
                      fontWeight: '900'
                    }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
                    <li style={{
                      margin: '4% 0px'
                    }}>
                      <Tag color="orange">标签对</Tag>
                      <Tag color="orange">标签对</Tag>
                    </li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    fontSize: 'xx-large',
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      fontSize: 'larger',
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '18px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontSize: 'medium',
                      fontWeight: '500'
                    }}>工单：{ seft.state.AppId }</li>
                    <li style={{
                      color: '#108ee9',
                      fontSize: 'medium',
                      fontWeight: '500',
                      margin: '4% 0px'
                    }}>产品：{ seft.state.Token }</li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'medium',
                      fontWeight: '900'
                    }}>
                      产品：{ seft.state.task_name }
                    </li>
                    <li style={{
                      margin: '4% 0px',
                      fontSize: 'large'
                    }}>
                      预计完成时间: { seft.state.updatetime }
                    </li>
                  </ul>
                </Col>
              </Row>
            </Panel>
          </TabPane>
          <TabPane tab="UI工程" key="3">
            <Panel header={title} bsStyle="info">
              <Row  gutter={8}
                    style={{
                      margin: '0 0.2%'
                    }}>
                <Col span={6}>
                  <ul style={{
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontWeight: '800'
                    }}>{ this.state.cru_model }</li>
                    <li style={{
                      color: '#108ee9',
                      margin: '4% 0px'
                    }}>编号：T2201554587
                    </li>
                    <li style={{
                      margin: '4% 0px',
                      fontWeight: '900'
                    }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
                    <li style={{
                      margin: '4% 0px'
                    }}>
                      <Tag color="orange">标签对</Tag>
                      <Tag color="orange">标签对</Tag>
                    </li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '10px'}}>
                  <ul style={{
                    fontWeight: '500',
                    padding: '4% 2%'
                  }}>
                    <li>机台: 80</li>
                    <li style={{
                      color: '#00a854'
                    }}>运行中</li>
                  </ul>
                </Col>
                <Col span={6} style={{paddingTop: '18px'}}>
                  <ul style={{
                    padding: '1% 4%'
                  }}>
                    <li style={{
                      fontWeight: '500'
                    }}>工单：{ seft.state.AppId }</li>
                    <li style={{
                      color: '#108ee9',
                      fontWeight: '500',
                      margin: '4% 0px'
                    }}>产品：{ seft.state.Token }</li>
                    <li style={{
                      margin: '4% 0px',
                      fontWeight: '900'
                    }}>
                      产品：{ seft.state.task_name }
                    </li>
                    <li style={{
                      margin: '4% 0px',
                    }}>
                      预计完成时间: { seft.state.updatetime }
                    </li>
                  </ul>
                </Col>
              </Row>
            </Panel>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Appdetail;
