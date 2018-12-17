import CategoryPage from './views/CategoryPage.js';
import ProductPage from './views/ProductPage.js';
import PageNotFound from './views/PageNotFound.js';
import OrderBasket from './views/OrderBasket.js';
import OrderConfirmation from './views/OrderConfirmation.js';
import OrderCheckout from './views/OrderCheckout.js';
import ListCategories from './components/ListCategories.js';
import ProductFiltering from './components/ProductFiltering.js';

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: CategoryPage,
        sidebar: ListCategories
      },
      props: {
        default: true,
        sidebar: true
      }
    },
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/category/:slug',
      name: 'Category',
      components: {
        default: CategoryPage,
        sidebar: ProductFiltering
      },
      props: {
        default: true,
        sidebar: true
      }
    },
    {
      path: '/product',
      redirect: { name: 'Home' }
    },
    {
      path: '/product/:slug',
      name: 'Product',
      components: {
        default: ProductPage,
        sidebar: ListCategories
      },
      props: {
        default: true,
        sidebar: true
      }
    },
    {
      path: '/basket',
      name: 'Basket',
      component: OrderBasket
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: OrderCheckout
    },
    {
      path: '/complete',
      name: 'Confirmation',
      component: OrderConfirmation
    },
    {
      path: '/404',
      alias: '*',
      component: PageNotFound
    }
  ]
});
