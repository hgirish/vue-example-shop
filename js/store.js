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
    basket: [{ "sku": "Fender - Ass Saver - Crazy Black", "title": "Ass Savers", "handle": "ass-savers", "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/ass-saver-web_0005_Ass_Saver_Black_FULL.jpeg?v=1438626119", "alt": "Ass Savers" }, "variationTitle": "<b>Color: <b> Black", "variation": { "comaprePrice": 14.99, "grams": 45, "quantity": 571, "price": 14, "shipping": "true", "sku": "Fender - Ass Saver - Crazy Black", "taxable": "true", "variant": { "color": { "name": "Color", "value": "Black", "handle": "black", "title": "Black" } }, "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/ass-saver-web_0005_Ass_Saver_Black_FULL.jpeg?v=1438626119", "alt": "Ass Savers" } }, "quantity": 1 }, { "sku": "Bottom Bracket - 68x110.5", "title": "Sealed Cartridge Bottom Bracket", "handle": "neco-bottom-bracket", "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/Bottom-Bracket_68-x-110_Front_WEB.jpeg?v=1438625963", "alt": null }, "variationTitle": "<b>Size: <b> 68x110.5", "variation": { "barcode": "'741360638457", "grams": 454, "quantity": 8, "price": 20, "shipping": "true", "sku": "Bottom Bracket - 68x110.5", "taxable": "true", "variant": { "size": { "name": "Size", "value": "68x110.5", "handle": "68x1105", "title": "68x110.5" } } }, "quantity": 1 }, { "sku": "Helmet - Giro Savant Black - S", "title": "Savant Helmet", "handle": "savant-helmet", "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/giro-savant-black-white-WEB.jpeg?v=1438625414", "alt": "Savant Helmet" }, "variationTitle": "<b>Size: <b> Small / <b>Color: <b> Black", "variation": { "grams": 907, "quantity": 9, "price": 79, "shipping": "true", "sku": "Helmet - Giro Savant Black - S", "taxable": "true", "variant": { "size": { "name": "Size", "value": "Small", "handle": "small" }, "color": { "name": "Color", "value": "Black", "handle": "black", "title": "Black" } }, "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/giro-savant-black-white-WEB.jpeg?v=1438625414", "alt": "Savant Helmet" } }, "quantity": 1 }, { "sku": "Shoes - DZR - Minna - 41", "title": "DZR Minna", "handle": "dzr-minna", "image": { "source": "https://cdn.shopify.com/s/files/1/0923/8062/products/DZR_MINNA_PAIR_FRONT_WEB.jpeg?v=1438624403", "alt": null }, "variationTitle": "<b>Size: <b> 41", "variation": { "barcode": "", "grams": 907, "quantity": 1, "price": 105, "shipping": "true", "sku": "Shoes - DZR - Minna - 41", "taxable": "true", "variant": { "size": { "name": "Size", "value": 41, "handle": "41" } } }, "quantity": 1 }],
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
          category = state.categoryHome;
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