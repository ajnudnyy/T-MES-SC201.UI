/**
 * @file IEC
 * @author gjeunney@163.com
 *
 * header 管理后台头部配置
 *     title    String  标题
 *     icon     String  标题图标
 *     style    Object  自定义样式
 *     menu     Array   顶部横向菜单列表
 *
 * sider  管理后台侧栏配置
 *     menu     Array   sider列表
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 *
 * main  功能区域配置
 *     components   Object  配置sider对应功能区域组件
 *         Feature1     Object  对应sider menu 中的功能key对 应功能组件
 *     style        Object  配置样式
 *
 * userInfo 登入用户信息
 *     name 登入用户名
 *     aver 登入用户头像
 *     permission 是否权限
 *     loginUrl 无权限时跳转的链接（对于一些通用登入权限系统）
 */

const Config = {
  header: {
    title: 'APP管理后台',
    icon: 'appstore',
    style: {
      backgroundColor: 'rgb(255, 255, 255)',
      color: '#666'
    },
    menu: [
      {
        title: '集合管理',
        key: 'bigset'
      }
    ]
  },
  modelCategory: {
    menu: [
      {
        title: '拓斯达',
        key: 'sub1',
        icon: 'bars',
        items: [
          {
            title: '(1.22)干燥机',
            key: '12',
            items: [
              {
                title: '(1.01.01)横走式单轴伺服机械手',
                key: '19',
              }, {
                title: '(1.01.02)横走式单轴双截伺服机械手',
                key: '20',
              }, {
                title: '(1.01.03)横走式多轴伺服机械手',
                key: '21',
              }, {
                title: '(1.01.04)横走式多轴双截伺服机械手',
                key: '22',
              }
            ]
          }, {
            title: '(1.20)模温机',
            key: '13'
          }, {
            title: '(1.01)机械手',
            key: '14'
          }, {
            title: '(1.23)除湿机',
            key: '15'
          }, {
            title: '(1.24)三机一体',
            key: '16'
          }, {
            title: '(1.25)粉碎机',
            key: '17'
          }, {
            title: '(1.26)输送带',
            key: '18'
          }
        ]
      }
    ],
    title: '设备管理',
    remote: 't_iec_product_category',
    openKeys: ['sub1'],
    selectedKey: 'Feature1-5',
    style: {}
  },
  sider: {
    menu: [
      {
        title: '我的PL工程',
        key: 'sub1',
        icon: 'bars',
        items: [
          {
            title: 'PL工程列表',
            key: 'Feature1-1',
            serve: 'http://dev.top-link.me/dev/Handler_Plproject_V1.ashx'
          }, {
            title: '配置管理',
            key: 'Feature3-3',
            serve: 'http://dev.top-link.me/dev/Handler_Plproject_V1.ashx'
          }
        ]
      },
      {
        title: '我的UI工程',
        key: 'sub2',
        icon: 'bars',
        items: [
          {
            title: 'UI工程列表',
            key: 'Feature2-1',
            serve: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx'
          }, {
            title: '配置列表',
            key: 'Feature2-2',
            serve: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx'
          }
        ]
      },
      {
        title: '我的DT模型',
        key: 'sub3',
        icon: 'bars',
        items: [
          {
            title: 'DT模型列表',
            key: 'Feature3-1'
          }
        ]
      }
    ],
    title: '工程管理',
    openKeys: ['sub1'],
    selectedKey: 'Feature1-1',
    style: {}
  },
  siderinAPP: {
    menu: [
      {
        title: '所有分类',
        key: 'sub1',
        icon: 'bars',
        items: [
          {
            title: '牛头机械手',
            key: 'Feature2-1'
          }, {
            title: '双控模温机',
            key: 'Feature3-3'
          }, {
            title: '横走式单轴伺服机械手',
            key: 'Feature4-1'
          }
        ]
      }, {
        title: '机器人',
        key: 'sub2',
        icon: 'bars',
        items: [
          {
            title: '六自由度机器人',
            key: 'Feature5-2'
          }, {
            title: 'SCARA机器人',
            key: 'Feature5-1'
          }
        ]
      }, {
        title: '辅机',
        key: 'sub3',
        icon: 'bars',
        items: [
          {
            title: '模温机',
            key: 'Feature2-2'
          }, {
            title: '干燥机',
            key: 'Feature1-4'
          }, {
            title: '直接式吸料机',
            key: 'Feature1-9'
          }
        ]
      }
    ],
    title: '我的应用',
    openKeys: ['sub1'],
    selectedKey: 'Feature5-2',
    style: {}
  },
  siderDevice: {
    menu: [
      {
        title: '客户管理',
        key: 'sub1',
        icon: 'bars',
        items: [
          {
            title: '客户列表',
            key: 'Feature3-1',
            serve: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx'
          }, {
            title: '客户分布',
            key: 'Feature3-2',
            serve: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx'
          }
        ]
      }
    ],
    title: '客户管理',
    openKeys: ['sub1'],
    selectedKey: 'Feature1-5',
    style: {}
  },
  main: {
    components: {
      'bigset': {
        title: '耗能监控',
        component: require('./components/feature/Feature1-1')
      },
      'Feature1-1': {
        title: 'PLproject',
        component: require('./components/feature/Feature1-1')
      },
      'Feature1-1-1': {
        title: 'ULproject',
        component: require('./components/feature/Feature1-1-1')
      },
      'Feature1-2': {
        title: 'ULproject',
        component: require('./components/feature/Feature1-2')
      },
      'Feature1-3': {
        title: 'table 耗能监控',
        component: require('./components/feature/Feature1-3')
      },
      'Feature1-4': {
        title: 'table 耗能监控',
        component: require('./components/feature/Feature1-4')
      },
      'Feature1-5': {
        title: '耗能监控',
        component: require('./components/feature/Feature1-5')
      },
      'Feature1-6': {
        title: '耗能监控',
        component: require('./components/feature/Feature1-6')
      },
      'Feature2-1': {
        title: 'ULproject',
        component: require('./components/feature/Feature2-1')
      },
      'Feature2-2': {
        title: '耗能监控',
        component: require('./components/feature/Feature2-2')
      },
      'Feature3-1': {
        title: '耗能监控',
        component: require('./components/feature/Feature3-1')
      },
      'Feature3-2': {
        title: '数据可视化 数据展示',
        component: require('./components/feature/Feature3-2')
      },
      'Feature3-3': {
        title: '机台群览',
        component: require('./components/feature/Feature3-3')
      },
      'Feature4-1': {
        title: '创建订单',
        component: require('./components/feature/Feature4-1')
      },
      'Feature4-2': {
        title: '生产排程',
        component: require('./components/feature/Feature4-2')
      },
      'Feature5-1': {
        title: '机台监控',
        component: require('./components/feature/Feature5-1')
      },
      'Feature5-2': {
        title: '六轴机器人',
        component: require('./components/feature/Feature5-2')
      }
    },
    style: {}
  },
  userInfo: {
    name: BaiduInfo.name || '一般',
    aver: BaiduInfo.aver || 'http://himg.bdimg.com/sys/portrait/item/113e68695f79696e6766656e67525e.jpg',
    permission: BaiduInfo.permission,
    loginUrl: BaiduInfo.loginUrl
  }
}

export default Config;
