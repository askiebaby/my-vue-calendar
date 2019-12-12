import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  redirect: { name: 'calendar' },
}, {
  path: '/calendar',
  name: 'calendar',
  component: () => import('../views/TheCalendar.vue'),
},
{
  path: '/date-picker',
  name: 'datePicker',
  component: () => import('../views/TheDatePicker.vue'),
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
