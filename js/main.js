import router from './routes.js';
import App from './components/app.js';
Vue.use(ShopifyProducts);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
