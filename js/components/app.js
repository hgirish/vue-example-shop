export default {
  name: 'App',
  template: `<div>
  <nav class="navbar navbar-dark  bg-primary flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"
    >Company name</a
  >
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <router-link class="nav-link" :to="{name:'Basket'}"
        ><i class="fas fa-shopping-cart"></i>Cart
        {{ cartQuantity }}</router-link
      >
    </li>
  </ul>
</nav>
<div class="row">
  <nav class="col-md-3 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <aside><router-view name="sidebar"></router-view></aside>
    </div>
  </nav>
  <main role="main" class="col-md-8 ml-sm-auto col-lg-9 px-4">
    <router-view></router-view>
  </main>
</div>
  </div>`,
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
};
