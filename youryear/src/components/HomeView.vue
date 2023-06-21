
<template>
    <div class="homeView">
        

      <div name="weather">
        home view
      </div>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  color: #333;
}
.homeView{
  width: 1300px;
  margin: 0 auto;
}
</style>