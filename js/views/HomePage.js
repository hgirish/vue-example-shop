const HomePage = {
  name: 'HomePage',
  template: `
  <div v-if="products">

  <p>
  Page {{currentPage}} out of {{pagination.totalPages}}
  </p>
  Products per page:
  <select v-model="perPage">
  <option>12</option>
  <option>24</option>
  <option>48</option>
  <option>60</option>
  </select>

  <button @click="toPage(currentPage -1)" :disabled="currentPage == 1">Previous Page</button>
  <button  @click="toPage(currentPage +1)" :disabled="currentPage == pagination.totalPages">Next Page</button>

  <ol :start="pagination.range.from + 1">
  <li v-for="product in paginate(products)" v-if="product">
  <h3>{{ product.title }}</h3>
  </li>
  </ol>

  <nav>
  <ol>
  <li v-for="page in pageLinks">
  <button @click="toPage(page)">{{page}}</button>
  </li>
  </ol>
  </nav>

   </div>
  `,
  data() {
    return {
      perPage: 12,
      currentPage: 1,
      pageLinkCount: 3,
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
    },
    pageLinks() {
      if (this.products.length) {
        let negativePoint = parseInt(this.currentPage) - this.pageLinkCount;
        let positivePoint = parseInt(this.currentPage) + this.pageLinkCount;
        let pages = [];
        if (negativePoint < 1) {
          negativePoint = 1;
        }
        if (positivePoint > this.pagination.totalPages) {
          positivePoint = this.pagination.totalPages;
        }
        for (var i = negativePoint; i <= positivePoint; i++) {
          pages.push(i);
        }
        return pages;
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
  },
  watch: {
    '$route'(to) {
      this.currentPage = parseInt(to.query.page) || 1;
    },
    perPage() {
      if (this.currentPage > this.pagination.totalPages) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            page: this.pagination.totalPages
          })
        })
      }
    }
  }
};
