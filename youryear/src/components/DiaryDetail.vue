<template>
    <HeaderView></HeaderView>
    <div class="detail">
        
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