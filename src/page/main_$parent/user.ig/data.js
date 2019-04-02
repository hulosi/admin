
import Mock from 'mockjs';

const departments = [{
  id: '1',
  text: '客服部',
}, {
  id: '2',
  text: '配送部',
}, {
  id: '3',
  text: '管理部',
}, {
  id: '4',
  text: '调配部',
}];

const users = ((() => {
  const oldUsers = window.localStorage.getItem('cbmp_users');
  if (oldUsers) {
    return JSON.parse(oldUsers);
  }
  const newUsers = Mock.mock({
    'data|400-1000': [{
      id: '@id',
      userName: '@ctitle(1, 10)',
      name: '@cname',
      'role|1': ['系统管理员', '管理员', '用户', '客服'],
      lastLoginTime: '@date("yyyy-MM-dd hh:mm:ss")',
      avatar: '@image("600x600")',
      'sex|1': ['男', '女'],
      company: '@ctitle(5, 25)公司',
      companyUrl: '@image("600x330")',
      phone: '18274874523',
      email: '@email',
      nationality: '中国',
      nativePlace: '@city(true)',
      'nation|1': ['汉族', '壮族', '满族', '回族', '苗族'],
      address: '@county(true)测试街道测试号',
      'jobId|1-10000': 1,
      'department|1': departments.map(department => department.text),
      duties: '长沙至广州运输线运输',
      'status|1': ['active', 'inactive'],
      workspace: '@county(true)测试街道测试号',
    }],
  }).data;
  window.localStorage.setItem('cbmp_users', JSON.stringify(newUsers));
  return newUsers;
})());

export default {
  getDepartments() {
    return departments;
  },
  getUsers(pageIndex = 1, pageSize = 10, query = {}) {
    const _users = users.filter((user) => {
      let valid = true;
      if (query.department) {
        valid = user.department === query.department;
      }
      if (valid && query.name) {
        valid = user.name.indexOf(query.name) !== -1;
      }
      if (valid && query.userName) {
        valid = user.userName.indexOf(query.userName) !== -1;
      }
      if (valid && query.company) {
        valid = user.company.indexOf(query.company) !== -1;
      }
      return valid;
    });
    const start = (pageIndex - 1) * 10;
    return {
      list: _users.slice(start, start + pageSize),
      total: _users.length,
    };
  },
  getUser(id) {
    if (id === 'current') {
      return users[0];
    }
    return users.find(user => user.id === id);
  },
};
