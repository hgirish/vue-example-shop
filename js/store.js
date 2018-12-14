const store = new Vuex.Store({
  state: {
    products: {},
  },
  mutations: {
    products(state, payload) {
      state.products = payload;
    },
  }
});