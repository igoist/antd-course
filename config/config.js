export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      // {
      //   path: '/',
      //   component: 'Helloworld',
      // },
      {
        path: '/helloworld',
        component: './HelloWorld',
        icon: 'code-o'
      },
      {
        path: '/dashboard',
        icon: 'dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis', icon: 'profile' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor', icon: 'heart-o' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' },
        ]
      },
      { path: '/puzzlecards', component: './puzzlecards' },
    ]
  }],
  proxy: {
   '/dev': {
      target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
    }
  },
};
