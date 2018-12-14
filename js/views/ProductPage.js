const ProductPage = {
  name: 'ProductPage',
  template: `
  <div v-if="product">{{product.title}}</div>
  `,
  computed: {
    product() {
      let product;
      if (Object.keys(this.$store.state.products).length) {
        product = this.$store.state.products[this.$route.params.slug];
      }
      return product;
    }
  }
};