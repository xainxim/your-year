<template>
  <div class="mainView">
    <h1><router-link to="/setView">시작하기</router-link></h1>

  </div>
</template>

<script>
export default {
  name: 'MainView',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  color: #333;
}
.mainView{
  width : 1200px;
  margin : 0 auto;
}
h1{
  margin-top: 300px;
  text-align: center;
}
</style>