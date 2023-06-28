<template>
    <HeaderView></HeaderView>
    <div class="write">
        <h1>오늘 하루는 어땠나요 ?</h1>
        <section>
          <div class="title-box">
            <input type="text" class="title" placeholder="제목을 입력해주세요" v-model="title">
            <div class="icons">
              <p>오늘 기분은</p>
              <img src="../assets/images/happy.png" alt="">
              <img src="../assets/images/sad.png" alt="">
              <img src="../assets/images/angry.png" alt="">
              <img src="../assets/images/love.png" alt="">
              <img src="../assets/images/nothing.png" alt="">
            </div>
          </div>
          <div class="contents-box">
            <textarea name="contents" class="contents" placeholder="입력해주세요 !" v-model="contents"></textarea>
          </div>
        </section>
        <button v-on:click="saveDATA()">등록하기</button>
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
      title : '',
      contents : ''
    }
  },
  methods:{
    saveDATA(){
      if(this.title == "" || this.contents == ""){
        alert('제목과 내용을 입력해주세요');
        return;
      }
      this.axios.post("/api.web/diaryInsert",{
        title : this.title,
        contents : this.contents
      }).then((res) => {
        if(res.status=='200'){
          alert('등록 완료');
          this.$router.push('/diary');
        }
      })
    }
  }
}
</script>

<style>
.write{
    width: 1300px;
    margin: 0 auto;
}
section{
  width: 100%;
  height: 400px;
}
h1{
  text-align: center;
  margin-top: 40px;
}
.title-box{
  display: flex;
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
}
.title{
  width: 500px;
  height: 60px;
  border: 0;
}
.title::placeholder{
  text-align: center;
}
.contents::placeholder{
  text-align: center;
  line-height: 290px;
  font-size: 1.2em;
}

.contents-box > .contents{
  margin: 0 auto;
  width: 1000px;
  height: 300px;
  display: block;
  resize: none;
}
.icons>img{
  width: 50px;
  height: 50px;
  float: right;
  opacity: 0.3;
}
.icons>img:hover{
  opacity: 1;
}
.icons > p{
  line-height: 60px;
}
.icons{
  width: 500px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
}
button{
  margin-left: 150px;
  border : 1px solid #333;
  border-radius: 30px;
}
</style>