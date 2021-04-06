import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/users', component: '@/pages/users/home' },
  ],
  // cssLoaderOtions: {
  //   localIdentName: '[local]',
  // },
  fastRefresh: {},
  dva: {},
});
