const ListCategories = {
  name: 'ListCategories',
  template: `
<div v-if="categories">
<ul class="nav flex-column">
<li class="nav-item" v-for="category in categories">
<router-link
class="nav-link" exact-active-class="active"
:to="{name: 'Category', params:{slug: category.handle}}">
{{category.title}} ({{category.products.length}})
</router-link>
</li>
</ul>
</div>
`,
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
}