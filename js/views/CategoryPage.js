const CategoryPage = {
  name: 'CategoryPage',
  template: `
  <div>
  <div v-if="category">
  <h1>{{category.title}}</h1>
  <list-products :products="category.productDetails"></list-products>
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

    }
  },
  computed: {
    ...Vuex.mapGetters([
      'categoryProducts',
      'categoriesExist'
    ]),
    category() {
      if (this.categoriesExist) {
        let category = this.categoryProducts(this.slug);
        if (!category) {
          this.categoryNotFound = true;
        }
        return category;
      }
    },

  },
};