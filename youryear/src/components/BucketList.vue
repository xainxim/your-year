<template>
    <header-view></header-view>
    <div class="bucket">
        bucketList
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

<style scoped>
.bucket{
    width: 1500px;
    margin: 0 auto;
}
</style>
