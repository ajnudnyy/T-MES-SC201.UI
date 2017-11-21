import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const MenuItemCreat  = (items) => {
  console.log('items==============', items)
        return items.map(function(item){
            if(item.items){
                let title = <span>{item.icon ? (<Icon type={item.icon} />): ''}<span>{item.title}</span></span>;

                return  <Menu.SubMenu key={item.key} title={title}>
                            {
                                MenuItemCreat(item.items)
                            }
                        </Menu.SubMenu>
            }else{
                return  <Menu.Item key={item.key}>
                            <Link to={'/'+item.key}>{item.title}</Link>
                        </Menu.Item>
            }
        });
};

function Sider(props){
    return  <div className="sider" style={props.style}>
               <div className="logo" style={{height: '32px', textAlign: 'center', background: '#eeeee',borderRadius: '6px',margin: '0.5px'}}>菜单</div>
               <Menu  defaultOpenKeys={props.openKeys}
                      mode="inline">
                    {
                        MenuItemCreat(props.menu)
                    }
              </Menu>
            </div>
}

export default Sider
