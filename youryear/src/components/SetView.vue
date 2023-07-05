<template>
  <div class="setView">

    <div>
      <h1></h1>
      <input type="text" class="set-input" placeholder="닉네임" v-model="nickName"><br><br><br>

      <input type="text" class="set-input" placeholder="당신의 좌우명은 ?" v-model="motto"><br><br><br>

      <button v-on:click="insertSetting()" ><a href="#">시작하기</a></button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'SetView',
  props: {
  },
  data(){
    return{
      nickName : '',
      motto : ''
    }
  },
  methods: {
    insertSetting(){
      this.axios.post("/api/web/setting",{
        nickName : this.nickName,
        motto: this.motto
      }).then((res) => {
        if(res.status== '200'){
          // console.log(this.nickName);
          alert('등록 완료');
          this.$router.push('/diary');
        }
        
      });
    },
    // setNickname(nickName){
      
    // }
  },
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
.setView{
  width: 1200px;
  margin: 0 auto;
}
.setView > div{
  margin-left: 30%;
  margin-top: 20%;
}
.set-input{
  width: 400px;
  height: 50px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
button {
  cursor: pointer;
  border-width: 1px;
  border-color: #d8d4cf;
  border-style: solid;
  color: #000;
  background: #d8d4cf;
  border-radius: 7px;
  min-width: 7rem;
  height: 3rem;
  font-size: 1.1rem;
}
button a{
  color: #333;
  text-decoration: none;
  display: block;
}
</style>