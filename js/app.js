Vue.use(ShopifyProducts);
var app = new Vue({
  el: '#app',
  store,
  router,
  created() {
    CSV.fetch({ url: './data/csv-files/bicycles.csv' }).then(data => {
      let products = this.$formatProducts(data);
      this.$store.dispatch('initializeShop', products);
    });
  },
  computed: {
    cartQuantity() {
      const quantity = this.$store.getters.cartQuantity;
      return quantity ? `(${quantity})` : '';
    }
  }
});
