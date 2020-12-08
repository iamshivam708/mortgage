<template>
  <div id="app">
  <header-component></header-component>
  <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
export default {
  components: { HeaderComponent },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

