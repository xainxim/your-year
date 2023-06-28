<template>
    <HeaderView></HeaderView>
    <div class="detail">
        detail
    </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
export default {
  name: 'HomeView',
  props: {
    msg: String
  },
  components: {
    HeaderView
  }
}
</script>

<style>
.detail{
    width: 1300px;
    margin: 0 auto;
}
</style>