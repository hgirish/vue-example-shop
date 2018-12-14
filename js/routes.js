const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/product/:slug',
      component: ProductPage
    },
    {
      path: '/404',
      alias: '*',
      component: PageNotFound
    }
  ]
});
