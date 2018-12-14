Vue.use(ShopifyProducts);
var app = new Vue({
  el: '#app',
  store,
  router,
  created() {
    CSV.fetch({ url: './data/csv-files/bicycles.csv' }).then(data => {
      let products = this.$formatProducts(data);
      this.$store.commit('products', products);
    });
  }
});
