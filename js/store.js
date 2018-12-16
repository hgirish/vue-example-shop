const store = new Vuex.Store({
  state: {
    products: {},
    categories: {},
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
    basket: [],
  },
  getters: {
    categoriesExist: (state) => {
      return Object.keys(state.categories).length;
    },
    categoryProducts: (state, getters) => (slug) => {
      if (getters.categoriesExist) {
        let category = false;
        let products = [];
        if (slug) {
          category = state.categories[slug];
        } else {
          category = this.categoryHome;
        }

        if (category) {
          for (let featured of category.products) {
            products.push(state.products[featured]);
          }
          category.productDetails = products;
        }
        return category;
      }
    },
    cartQuantity: (state) => {
      let quantity = 0;
      for (let item of state.basket) {
        quantity += item.quantity;
      }
      return quantity;
    }
  },
  mutations: {
    products(state, payload) {
      let products = {}
      Object.keys(payload).forEach(key => {
        let product = payload[key];
        let prices = [];
        for (let variation of product.variationProducts) {
          if (!prices.includes(variation.price)) {
            prices.push(variation.price);
          }
        }

        product.price = Math.min(...prices);
        product.hasManyPrices = prices.length > 1;
        products[key] = product;
      })
      state.products = products;
    },
    categories(state, payload) {
      let categories = {};
      let other = {
        title: 'Miscellaneous',
        handle: 'other'
      };
      Object.keys(payload).forEach(key => {
        let product = payload[key];
        let type = product.hasOwnProperty('type') ? product.type : other;


        if (type && type.handle) {
          if (!categories.hasOwnProperty(type.handle)) {
            categories[type.handle] = {
              title: type.title, handle: type.handle, products: []
            }
          }

          categories[type.handle].products.push(product.handle);
        }

      });
      Object.keys(categories).forEach(key => {
        let category = categories[key];

        if (category.products.length < 3) {
          categories.other.products =
            categories.other.products.concat(category.products);
          delete categories[key];
        }
      });
      let categoriesSorted = {};
      Object.keys(categories).sort().forEach(key => {
        categoriesSorted[key] = categories[key]
      });
      state.categories = categoriesSorted

    },
    addToBasket(state, item) {
      let product = state.basket.find(p => {
        if (p.sku == item.variation.sku) {
          p.quantity++;
          return p;
        }
      })
      if (!product) {
        state.basket.push({
          sku: item.variation.sku,
          title: item.product.title,
          handle: item.slug,
          image: item.image,
          variationTitle: item.variantTitle(item.variation),
          variation: item.variation,
          quantity: 1
        });
      }
    },
  },
  actions: {
    initializeShop({ commit }, products) {
      commit('products', products);
      commit('categories', products);
    }
  }
});