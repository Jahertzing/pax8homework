import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Edit from './views/Edit.vue';
import ViewCompany from './views/ViewCompany.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit/:companyId',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/company/:companyId',
      name: 'company',
      component: ViewCompany,
    },
  ],
});
