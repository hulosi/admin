import Router from 'vue-router';
import Vue from 'vue';
import routers from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
});
router.addRoutes(routers);

export default router;
