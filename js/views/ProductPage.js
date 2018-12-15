const ProductPage = {
  name: 'ProductPage',
  template: `
  <div>
  <div v-if="product">
  <div class="images" v-if="image">
  <div class="main">
  <img :src="image.source"
  :alt="image.alt || product.title" width="300" />
  </div>
  <div class="thumbnails" v-if="product.images.length > 1">
  <template v-for="img in product.images">
<img
:src="img.source"
:alt="img.alt || product.title"
width="100"
@click="updateImage(img)" />
  </template>
  </div>
  </div>
  <h1>{{product.title}} - \${{variation.price}}</h1>
  <div class="meta">
  <span>Manufacturer: <strong>{{product.vendor.title}}</strong></span>
  <span v-if="product.type">
  Category: <strong>{{product.type}}</strong>
  </span>
  <span>
  Quantity: <strong>{{variation.quantity}}</strong>
  </span>
  </div>

  <div class="variations">
  <select v-model="variation" v-if="product.variationProducts.length > 1">
  <option
  v-for="variation in product.variationProducts"
  :key="variation.barcode"
  :value="variation"
  v-html="variantTitle(variation) + ((!variation.quantity) ? ' - out of stock' : '')"></option>
  </select>
  <button @click="addToBasket()"
  :disabled="!variation.quantity">
  {{(variation.quantity) ? 'Add to basket' : 'Out of stock'}}
  </button>

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
      slug: this.$route.params.slug,
      productNotFound: false,
      image: false,
      variation: false
    };
  },
  computed: {
    product() {
      let product;

      if (Object.keys(this.$store.state.products).length) {
        product = this.$store.state.products[this.slug];
        if (product) {
          this.productNotFound = false;
          this.variation = product.variationProducts[0];
          this.image = product.images.length ? product.images[0] : false;
        }

        if (!product) {
          this.productNotFound = true;
        }
      }
      return product;
    }
  },
  methods: {
    updateImage(img) {
      this.image = img;
    },
    variantTitle(variation) {
      let variants = variation.variant;
      let output = [];
      for (let a in variants) {
        output.push(`<b>${variants[a].name}: <b> ${variants[a].value}`);
      }
      return output.join(' / ');
    },
    addToBasket() {
      alert(
        `Added to basket: ${this.product.title} =
         ${this.variantTitle(this.variation)}`
      );
    }
  },
  watch: {
    variation(v) {
      if (v.hasOwnProperty('image')) {
        this.updateImage(v.image);
      }
    },
    $route(to) {
      this.slug = to.params.slug;
    }
  }
};
