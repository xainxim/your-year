<template>
    <div class="write">
      <HeaderView></HeaderView>
        <h2>오늘 하루는 어땠나요 ?</h2>
        <section>
          <div class="title-box">
            <input type="text" class="title" placeholder="제목을 입력해주세요" v-model="title">
            <div class="icons">
              <p>오늘 기분은</p>
              <a href="#" class="feelingIcon"><img src="../assets/images/happy.png"  @click="clickImg('happy')"></a>
              <a href="#" class="feelingIcon"><img src="../assets/images/sad.png" @click="clickImg('sad')"></a>
              <a href="#" class="feelingIcon"><img src="../assets/images/angry.png" @click="clickImg('angry')"></a>
              <a href="#" class="feelingIcon"><img src="../assets/images/love.png" @click="clickImg('love')"></a>
              <a href="#" class="feelingIcon"><img src="../assets/images/nothing.png" @click="clickImg('nothing')"></a>
            </div>
          </div>
          <div class="contents-box">
            <textarea name="contents" class="contents" placeholder="입력해주세요 !" v-model="contents"></textarea>
          </div>
        </section>
        <button v-on:click="saveDATA()" class="Btn">등록하기</button>
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
      contents : '',
      myfeeling : ''
    } 
  },
  methods:{
    saveDATA(){
      if(this.title == "" || this.contents == ""){
        alert('제목과 내용을 입력해주세요');
        return;
      }
      if(this.myfeeling == ""){
        alert('오늘의 기분을 선택해주세요');
        return;
      }
      this.axios.post("/api/web/diaryInsert",{
        title : this.title,
        contents : this.contents,
        myfeeling : this.myfeeling
      }).then((res) => {
        if(res.status=='200'){
          alert('등록 완료');
          this.$router.push('/diary');
        }
      })
    },
    clickImg(text){
        this.myfeeling = text
        console.log(text)
    }
  }
}
</script>

<style>
.write{
    width: 1500px;
    margin: 0 auto;
}
section{
  width: 100%;
  height: 600px;
}
h2{
  text-align: center;
  margin-top: 70px;
  font-weight: bold;
  font-size: 2.5em;
}
.title-box{
  display: flex;
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
}
.title{
  text-align: center;
  width: 500px;
  height: 60px;
  border: 0;
  font-size: 2em;
}
.contents{
  text-align: center;
  font-size: 2em;
  border-radius: 30px;
}
.title::placeholder{
  text-align: center;
  font-size: 0.8em;
}
.contents::placeholder{
  text-align: center;
  line-height: 380px;
  font-size: 0.8em;
}

.contents-box > .contents{
  margin: 0 auto;
  width: 1000px;
  height: 400px;
  display: block;
  resize: none;
}
.icons a img{
  width: 55px;
  height: 55px;
  float: right;
}
.feelingIcon{
  opacity: 0.3;
}
.feelingIcon:active{
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

.Btn{
  margin-left: 150px;
  border : 1px solid #333;
  border-radius: 30px;
  box-shadow: 3px 3px 3px palevioletred;
  transition-duration: 0.3s;
}
.Btn:active{
  margin-left: 5px;
  margin-top: 5px;
  box-shadow: none;
}
</style>
