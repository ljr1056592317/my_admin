import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';

const routes: IConfigFromPlugins['routes'] = [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/admin/business',
    name: '业务场景',
    routes: [
      {
        path: 'g6',
        name: 'g6的基本使用',
        routes: [
          { path: 'timeline', component: './business/g6/timeline', name: '时间轴' },
          // { path: 'mindLayoutgraph', component: './business/g6/mindLayoutGraph', name: '脑图布局图谱' },
        ],
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

export default routes;
