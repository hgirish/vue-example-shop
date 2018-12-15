const CategoryPage = {
  name: 'CategoryPage',
  template: `
  <div>
  <div v-if="category">
  <h1>{{category.title}}</h1>
  <list-products :products="products"></list-products>
  </div>
  <page-not-found v-if="categoryNotFound"></page-not-found>
  </div>
  `,
  components: {
    PageNotFound,
  },
  props: {
    slug: String,

  },
  data() {
    return {
      categoryNotFound: false,
      categoryHome: {
        title: 'Welcome to the Shop',
        handle: 'home',
        products: [
          'adjustable-stem',
          'colorful-fixie-lima',
          'fizik-saddle-pak',
          'kenda-tube',
          'oury-grip-set',
          'pure-fix-pedals-with-cages'
        ]
      },
    }
  },
  computed: {
    category() {
      let category;

      if (Object.keys(this.$store.state.categories).length) {
        if (this.slug) {
          category = this.$store.state.categories[this.slug];
        } else {
          category = this.categoryHome;
        }


        if (!category) {
          this.categoryNotFound = true;
        }
      }
      return category;
    },
    products() {
      if (this.category) {
        let products = this.$store.state.products;
        let output = [];

        for (let featured of this.category.products) {
          output.push(products[featured]);
        }

        return output;
      }
    },
  },
};