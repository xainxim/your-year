<template>
  <div class="detail">
    <HeaderView></HeaderView>
    <h2>{{ createdDatetime }}</h2>
    <section>
      <div class="title-box">
        <input type="text" :value="title" class="title" @input="title = $event.target.value">
        <div class="icons">
          <p>이 날 기분은</p>
          <img src="../assets/images/happy.png" alt="" @click="clickImg" class="imgIcon">
          <img src="../assets/images/sad.png" alt="">
          <img src="../assets/images/angry.png" alt="">
          <img src="../assets/images/love.png" alt="">
          <img src="../assets/images/nothing.png" alt="">
        </div>
      </div>
      <div class="contents-box">
        <textarea class="contents" :value="contents" placeholder="입력해주세요 !"
          @input="contents = $event.target.value"></textarea>
      </div>
    </section>
    <div class="btns">
      <button class="updateBtn" v-on:click="updateList()">수정하기</button>
      <button class="deleteBtn" v-on:click="deleteList()">삭제하기</button>
    </div>
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
  data() {
    return {
      idx: this.$route.params.idx,
      title: '',
      contents: '',
      createdDatetime: ''
    }
  },
  methods: {
    getDiaryList() {
      this.axios.get("/api/web/" + this.idx).then((res) => {
        this.title = res.data.title;
        this.contents = res.data.contents;
        this.createdDatetime = res.data.createdDatetime;
      });
    },
    updateList() {
      if (this.title == "" || this.contents == "") {
        alert('제목과 내용을 입력해주세요 !');
        return;
      }
      this.axios.put("/api/web/diaryUpdate", {
        idx: this.idx,
        title: this.title,
        contents: this.contents
      }).then((res) => {
        if (res.status == '200') {
          this.$router.push('/diary');
          alert('수정 완료')
        }
      })
    },
    deleteList() {
      this.axios.delete("/api/web/" + this.idx).then((res) => {
        if (res.status == '200') {
          this.$router.push('/diary');
          alert('삭제 완료')
        }
      })
    }
  },
  created() {
    this.getDiaryList();
  }
}
</script>

<style>
.detail {
  width: 1500px;
  margin: 0 auto;
}

section {
  width: 100%;
  height: 500px;
}

h2 {
  text-align: center;
  margin-top: 70px;
  font-weight: bold;
  font-size: 3em;
}

.title-box {
  display: flex;
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  margin-top: 20px;
}

.title {
  text-align: center;
  width: 500px;
  height: 60px;
  border: 0;
  font-size: 2em;
}

.contents-box {
  vertical-align: middle;
}

.contents {
  text-align: center;
  font-size: 2em;
  border-radius: 30px;
}

.title::placeholder {
  text-align: center;
  font-size: 0.8em;
}

.contents::placeholder {
  text-align: center;
  line-height: 290px;
  font-size: 0.8em;
}

.contents-box>.contents {
  margin: 0 auto;
  width: 1000px;
  height: 400px;
  display: block;
  resize: none;
}

.icons img {
  width: 50px;
  height: 50px;
  float: right;
  opacity: 0.3;
}

.icons>img:hover {
  opacity: 1;
}

.icons>p {
  line-height: 60px;
}

.icons {
  width: 500px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
}

.btns {
  margin: 0 auto;
  width: 200px;
  display: flex;
  
  justify-content: space-evenly;
}
.updateBtn, .deleteBtn{
  box-shadow: 3px 3px 3px black;
  transition-duration: 0.3s;
}
</style>