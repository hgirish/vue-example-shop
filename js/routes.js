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
      component: CategoryPage,
      props: true
    },
    {
      path: '/product/:slug',
      name: 'Product',
      component: ProductPage
    },
    {
      path: '/404',
      alias: '*',
      component: PageNotFound
    }
  ]
});
