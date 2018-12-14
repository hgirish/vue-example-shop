const HomePage = {
  name: 'HomePage',
  template: `
  <div v-if="products">
  <p>
  Page {{currentPage}} out of {{pagination.totalPages}}</p>
  <button @click="toPage(currentPage -1)" :disabled="currentPage == 1">Previous Page</button>
  <button  @click="toPage(currentPage +1)" :disabled="currentPage == pagination.totalPages">Next Page</button>

  <ol :start="pagination.range.from + 1">
  <li v-for="product in paginate(products)" v-if="product">
  <h3>{{ product.title }}</h3>
  </li>
  </ol>
   </div>
  `,
  data() {
    return {
      perPage: 12,
      currentPage: 1
    };
  },
  created() {
    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page);
    }
  },
  computed: {
    products() {
      let products = this.$store.state.products;
      return Object.keys(products).map(key => products[key]);
    },
    pagination() {
      if (this.products) {
        let totalProducts = this.products.length;
        let pageFrom = this.currentPage * this.perPage - this.perPage;

        return {
          totalProducts: totalProducts,
          totalPages: Math.ceil(totalProducts / this.perPage),
          range: {
            from: pageFrom,
            to: pageFrom + this.perPage
          }
        };
      }
    }
  },
  methods: {
    toPage(page) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, { page })
      });
      this.currentPage = page;
    },
    paginate(list) {
      return list.slice(this.pagination.range.from, this.pagination.range.to);
    }
  }
};
