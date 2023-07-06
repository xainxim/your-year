<template>
    <header-view></header-view>
    <div class="bucket">
      <h1> {{ motto }} </h1>
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
  },
  data(){
    return{
      motto: ''
    }
  },
  methods:{
    selectMotto(){
      this.axios.get("/api/web/motto").then((res) => {
        
        this.motto = res.data.motto;
        console.log(this.motto)
      })
    }
  },
  created(){
    this.selectMotto();

  }
}
</script>

<style scoped>
.bucket{
    width: 1500px;
    margin: 0 auto;
}
h1{
  text-align: center;
  margin-top: 50px;
}
</style>
