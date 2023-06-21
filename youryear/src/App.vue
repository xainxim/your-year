<template>
  <header-view/>
  <!-- <MainView msg="YY"/> -->
  <router-view/>
</template>

<script>
//import MainView from './components/MainView.vue'
import HeaderView from './components/HeaderView.vue'

export default {
  name: 'App',
  components: {
    //MainView
    HeaderView
  }
}
</script>

<style>
#app {

}
</style>
