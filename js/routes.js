const router = new VueRouter({
  routes: [
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