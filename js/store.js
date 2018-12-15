const store = new Vuex.Store({
  state: {
    products: {},
    categories: {},
  },
  mutations: {
    products(state, payload) {
      state.products = payload;
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
  },
  actions: {
    initializeShop({ commit }, products) {
      commit('products', products);
      commit('categories', products);
    }
  }
});