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
      path: '/category/:slug',
      name: 'Category',
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
      path: '/404',
      alias: '*',
      component: PageNotFound
    }
  ]
});
