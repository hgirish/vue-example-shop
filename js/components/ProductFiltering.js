import ListCategories from './ListCategories.js';

export default {
  name: 'ProductFiltering',
  template: `
  <div>
  <div class="filters">
  <div class="filterGroup" v-for="filter in filters">
  <h3>{{filter.title}}</h3>
  <label class="filter" v-for="value in filter.values">
<input type="checkbox" :value="value.handle"
v-model="filter.checked" @click="updateFilters" />
{{value.title}} ({{ value.count.length }})
  </label>
  </div>
  </div>
  <list-categories />
  </div>
  `,
  components: {
    ListCategories
  },
  props: {
    slug: String
  },
  data() {
    return {
      topics: this.defaultTopics
    };
  },
  computed: {
    ...Vuex.mapGetters(['categoryProducts', 'categoriesExist']),
    filters() {
      if (this.categoriesExist) {
        let category = this.categoryProducts(this.slug);
        //let vendors = this.topics.vendor;
        for (let product of category.productDetails) {
          if (product.hasOwnProperty('vendor')) {
            this.addTopic(this.topics.vendor, product.vendor, product.handle);
          }

          if (product.hasOwnProperty('tags')) {
            for (let tag of product.tags) {
              this.addTopic(this.topics.tags, tag, product.handle);
            }
          }

          Object.keys(product.variationTypes).forEach(vkey => {
            let variation = product.variationTypes[vkey];

            if (!this.topics.hasOwnProperty(variation.handle)) {
              this.topics[variation.handle] = {
                ...variation,
                checked: [],
                values: {}
              };
            }

            Object.keys(product.variationProducts).forEach(pkey => {
              let vp = product.variationProducts[pkey];

              this.addTopic(
                this.topics[variation.handle],
                vp.variant[variation.handle],
                product.handle
              );
            });
          });
        }

        Object.keys(this.$route.query).forEach(key => {
          if (Object.keys(this.topics).includes(key)) {
            let query = this.$route.query[key];
            this.topics[key].checked = Array.isArray(query) ? query : [query];
          }
        });
      }
      return this.topics;
    }
  },
  methods: {
    defaultTopics() {
      return {
        vendor: {
          title: 'Manufacturer',
          handle: 'vendor',
          checked: [],
          values: {}
        },
        tags: {
          title: 'Tags',
          handle: 'tags',
          checked: [],
          values: {}
        }
      };
    },

    addTopic(category, item, handle) {
      if (item.handle && category && category.values) {
        if (category.values[item.handle]) {
          if (!category.values[item.handle].count.includes(handle)) {
            category.values[item.handle].count.push(handle);
          }
        } else {
          if (item.hasOwnProperty('value')) {
            item.title = item.value;
          }
          category.values[item.handle] = {
            ...item,
            count: [handle]
          };
        }
      }
    },
    updateFilters() {
      let filters = {};
      Object.keys(this.topics).forEach(key => {
        let topic = this.topics[key];
        if (topic.checked.length) {
          filters[key] = topic.checked;
        }
      });
      this.$router.push({ query: filters });
    }
  },
  watch: {
    slug() {
      this.topics = this.defaultTopics();
    }
  }
};
