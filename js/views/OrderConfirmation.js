import ListPurchases from '../components/ListPurchases.js';

export default {
  name: 'OrderConfirmation',
  template: `<div>
  <h1>Order Complete</h1>
  <p>Thanks for shopping with us - you can expect your products
  within 2-3 working days</p>
  <list-purchases />
  </div>`,
  components: {
    ListPurchases
  }
};
