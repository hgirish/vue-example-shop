const router = new VueRouter({
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
