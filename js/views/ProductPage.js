const ProductPage = {
  name: 'ProductPage',
  template: `
  <div>
  <div v-if="product">
  <div class="images" v-if="product.images.length">
  <template v-for="img in product.images">
<img
:src="img.source"
:alt="img.alt || product.title"
width="100">
  </template>
  </div>
  <h1>{{product.title}}</h1>
  <div class="meta">
  <span>Manufacturer: <strong>{{product.vendor.title}}</strong></span>
  <span v-if="product.type">
  Category: <strong>{{product.type}}</strong>
  </span>
  </div>
 <div v-html="product.body"></div>
  </div>
  <page-not-found v-if="productNotFound"></page-not-found>
  </div>
  `,
  components: {
    PageNotFound
  },
  data() {
    return {
      productNotFound: false
    }
  },
  computed: {
    product() {
      let product;
      if (Object.keys(this.$store.state.products).length) {
        product = this.$store.state.products[this.$route.params.slug];
        if (!product) {
          this.productNotFound = true;
        }
        console.log(product);
      }
      return product;
    }
  }
};