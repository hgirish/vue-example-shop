export default {
  name: 'ListPurchases',
  template: `<table class="table">
  <thead>
<tr>
<th></th>
<th>Title</th>
<th>Unit price</th>
<th>Quantity</th>
<th>Price</th>
</tr>
</thead>
<tbody>
<tr v-for="product in products">
<td>
<img :src="product.image.source"
:alt="product.image.alt || product.variationTitle"
width="80" />
</td>
<td>
<router-link :to="{name:'Product',params:{slug:product.handle}}">
{{product.title}}
</router-link>
<br /><span v-html="product.variationTitle"></span>
</td>
<td>{{product.variation.price | currency}}</td>
<td v-if="!editable">{{product.quantity}}</td>
<td v-if="editable">
<input type="number" step="1" :value="product.quantity"
@blur="updateQuantity($event,product.sku)" />
</td>
<td>{{product.variation.price * product.quantity | currency}}</td>
<td v-if="editable">
<button @click="removeItem(product.sku)">Remove Item</button>
</td>
</tr>
</tbody>
<tfoot>
<td colspan="4" class="text-right px-3">
<strong>Total:</strong>
</td>
<td>{{ totalPrice | currency }}</td>
</tfoot>
  </table>`,
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    products() {
      return this.$store.state.basket;
    },
    totalPrice() {
      let total = 0;
      for (let p of this.products) {
        total += p.variation.price * p.quantity;
      }
      return total;
    }
  },
  filters: {
    currency(val) {
      return '$' + val.toFixed(2);
    }
  },
  methods: {
    updateQuantity(e, sku) {
      if (!parseInt(e.target.value)) {
        this.removeItem(sku);
      } else {
        let products = this.products.map(p => {
          if (p.sku == sku) {
            p.quantity = parseInt(e.target.value);
          }
          return p;
        });
        this.$store.commit('updatePurchases', products);
      }
    },
    removeItem(sku) {
      let products = this.products.filter(p => {
        if (p.sku != sku) {
          return p;
        }
      });
      this.$store.commit('updatePurchases', products);
    }
  }
};
