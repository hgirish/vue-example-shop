Vue.component('list-products', {
  template: `
  <div v-if="products">

  <p v-if="pagination.totalPages > 1">
  Page {{currentPage}} out of {{pagination.totalPages}}
  </p>

  <div v-if="pagination.totalProducts > 12">
  Products per page:
  <select v-model="perPage">
  <option>12</option>
  <option>24</option>
  <option v-if="pagination.totalProducts > 24">48</option>
  <option v-if="pagination.totalProducts > 48">60</option>
  </select>
  </div>

  <button @click="toPage(currentPage -1)"
  :disabled="currentPage == 1"
  v-if="pagination.totalPages > 1">Previous Page</button>
  <button  @click="toPage(currentPage +1)"
  :disabled="currentPage == pagination.totalPages"
  v-if="pagination.totalPages > 1">Next Page</button>

  <ol class="row" :start="pagination.range.from + 1">
  <li class="col-md-4" v-for="product in paginate(products)" v-if="product">
  <router-link :to="{name:'Product',params:{slug: product.handle}}">
  <img v-if="product.images[0]" :src="product.images[0].source"
  :alt="product.title" width="120" />
  </router-link>
  <h3>
  <router-link :to="{name:'Product',params:{slug: product.handle}}">
  {{ product.title }}
  </router-link>
  </h3>
  <p>Made by: {{product.vendor.title}}</p>
  <p>Price {{productPrice(product.variationProducts)}}</p>
  </li>
  </ol>


  <nav v-if="pagination.totalPages > pageLinkCount">
  <ol>
  <li v-for="page in pageLinks">
  <button @click="toPage(page)">{{page}}</button>
  </li>
  </ol>
  </nav>

   </div>
  `,
  props: {
    products: Array
  },
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
    },
    productPrice(variations) {
      let prices = [];
      for (let variation of variations) {
        if (!prices.includes(variation.price)) {
          prices.push(variation.price);
        }
      }

      let price = '$' + Math.min(...prices);

      if (prices.length > 1) {
        price = 'From: ' + price;
      }
      return price;
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
});