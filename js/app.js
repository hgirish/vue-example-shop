
new Vue({
  el: '#app',
  store,
  router,
  created() {
    d3.csv('./data/csv-files/bicycles.csv', (error, data) => {
      console.log(data);
    })
  }
})