Vue.use(ShopifyProducts);
new Vue({
  el: '#app',
  store,
  router,
  created() {
    CSV.fetch({ url: './data/csv-files/bicycles.csv' }).then(data => {
      let products = this.$formatProducts(data);
      console.log(products);
    })
  }
})