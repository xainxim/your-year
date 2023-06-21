<template>
  <div class="mainView">

    <button><router-link to="/setView">시작하기</router-link></button>
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
* {
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  color: #333;
}
button {
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
  cursor: pointer;
  border-width: 1px;
  border-color: #d8d4cf;
  border-style: solid;
  color: #000;
  background: #d8d4cf;
  border-radius: 7px;
  min-width: 12rem;
  height: 5rem;
  font-size: 1.5rem;
}
</style>