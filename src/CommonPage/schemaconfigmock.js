/*
 * @Author: jiankang.zhang
 * @fileoverview: 模拟一部请求schema接口，其中有一些页面可能使我们后台无法配置的，那么我们就直接渲染对于的模块
 */
import CustomerList from 'Page/customer/CustomerList';

const PageSchemaMap = {
  'customer/list': {
    //pageUI: CustomerList,
    components: [
      {
        component_type: 'ItemTitle',
        ui: {
          title: '客户列表',
          leftbtnlink: '/customer/create',
          leftbtnlabel: '新建客户'
        }
      },
      {
        component_type: 'QuertTable',
        queryType: 'coreUserCustomer',
        action_opt: {
          title: '操作',
          fixed: 'right',
          width: '80',
          key: 'action',
          renderitems: [
            {
              type: 'Tooltip',
              title: '查看',
              icon: 'eye-o',
              action: {
                type: 'link',
                path: '/customer/info/',
                params: ['id']
              }
            },
            {
              type: 'Tooltip',
              title: '编辑',
              icon: 'edit',
              action: {
                type: 'link',
                path: '/customer/update/',
                params: ['id']
              }
            }
          ]
        },
      }
    ]
  },
  'customer/update': {
    components: [
      {
        component_type: 'UpdateComponent',
        uiSchemeSource: {
          method: 'get',
          url: '/core-user/v1/customer/update',
          fetchParams: 'id'
        },
        dataSource: {
          pushSource: {
            method: 'post',
            url: '/core-user/v1/customer/updatePost'
          },
          callbackSource: {
            url: '/customer/list'
          }
        }
      }
    ]
  },
  'customer/create': {
    components: [
      {
        component_type: 'CreateComponent',
        uiSchemeSource: {
          method: 'get',
          url: '/core-user/v1/customer/create'
        },
        dataSource: {
          pushSource: {
            method: 'post',
            url: '/core-user/v1/customer/createPost'
          },
          callbackSource: {
            url: '/customer/list'
          }
        }
      }
    ]
  },
  'fund/create': {
    components: [
      {
        component_type: 'CreateComponent',
        uiSchemeSource: {
          method: 'get',
          url: '/core-user/v1/fund/create'
        },
        dataSource: {
          pushSource: {
            method: 'post',
            url: '/core-user/v1/fund/createPost'
          },
          callbackSource: {
            url: '/fund/list'
          }
        }
      }
    ]
  }
};

function timeout(ms = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export const getSchemaByPath = (path) => {
  let pageConfigKey = path.replace(/^[\/]*/, '').replace(/[\/]*$/, '');
  return timeout(Math.random() * 1000)
    .then(value => {
      return PageSchemaMap[pageConfigKey];
    })
    .catch(err => {
      return null;
    });
};