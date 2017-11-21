import React, {
  Component
} from 'react'
import { ButtonToolbar, Modal, Panel } from 'react-bootstrap';
import { Row, Col, Tabs, Button, Tag, Select  } from 'antd';

const TabPane = Tabs.TabPane
const Option = Select.Option;

const children = [];

let seft

class SelectItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stylelish: this.props.stylelish,
      Selectlist: this.props.Selectlist,
    }
    seft = this

    for (let i = 0; i < props.Selectlist.length; i++) {
      children.push(<Option key={i.toString(36) + i}>{ props.Selectlist[i].item }</Option>);
    }

  }

  componentDidMount () {}

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }


  render() {
    return (
      <Select
        mode="tags"
        size="small"
        style={ this.state.stylelish }
        onChange={this.handleChange}
        placeholder="请选择型号"
        tokenSeparators={[',']} >
        {children}
      </Select>
    );
  }
}

export default SelectItem;
