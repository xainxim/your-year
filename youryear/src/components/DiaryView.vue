<template>
  <HeaderView></HeaderView>
  <div class="diaryView">
    <h2>일긔</h2>

    <section>
      <div class="diary-box">
        <div v-for="item in paginatedData" :key="item">
          <div class="myfeeling"><img :src="item.path"></div> 
          
                   
          <div class="title" v-on:click="getDiaryDetail(item.idx)" style="cursor:pointer">{{ item.title }}</div>
          <div class="date">{{ item.createdDatetime }}</div>
        </div>
      </div>
    </section>
    <router-link to="/write"><div class="writeBtn">
      <img src="../assets/images/write.png" alt="">
    </div></router-link>
      <div class="btn-cover">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
          이전
        </button> 
        &emsp;<span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>&emsp;
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
          다음
        </button>
      </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
export default {
  name: 'HomeView',
  props: {
    msg: String,
    pageSize : {
      type : Number,
      required : false,
      default : 5
    }
  },
  components: {
    HeaderView
  },
  el: '.diary-box',
  data() {
    return {
      pageNum : 0,
      DiaryList: [
        { idx: '' },
        { myfeeling: ''},
        { title: '' },
        { createdDatetime: '' },
        { path : ''}
      ],
      imgPath : [
        {path : require("../assets/images/happy.png")},
        {path : require("../assets/images/sad.png")},
        {path : require("../assets/images/angry.png")},
        {path : require("../assets/images/love.png")},
        {path : require("../assets/images/nothing.png")},
      ],
      DiaryLength : 0,
    };
  },
  methods: {
    nextPage(){
      this.pageNum += 1;
    },
    prevPage(){
      this.pageNum -= 1;
    },
    
    selectDiaryList() {
      this.axios.get("/api/web").then((res) => {
        this.DiaryList = res.data;
        this.DiaryLength = this.DiaryList.length;
        for(var i =0;i<this.DiaryLength;i++){
          switch (this.DiaryList[i].myfeeling) {
            case 'happy': this.DiaryList[i].path = this.imgPath[0].path; break;
            case 'sad': this.DiaryList[i].path = this.imgPath[1].path; break;
            case 'angry': this.DiaryList[i].path = this.imgPath[2].path; break;
            case 'love': this.DiaryList[i].path = this.imgPath[3].path; break;
            case 'nothing': this.DiaryList[i].path = this.imgPath[4].path; break;
          }
        }
      });
    },
    getDiaryDetail(idx){
      this.$router.push('/detail/'+idx);
    }
  },
  created() {
    this.selectDiaryList();
  },
  computed: {
    pageCount(){
      let listLeng = this.DiaryLength,
          listSize = this.pageSize,
          page = Math.floor((listLeng - 1) / listSize) + 1;
          return page;
    },
    paginatedData(){
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.DiaryList.slice(start, end);
    }
  }
}
</script>


<style scoped>
*{
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.diaryView {
  width: 1300px;
  margin: 0 auto;
}
.title{
  width: 300px;
}
h2 {
  text-align: center;
  margin: 40px 0 0 0;
  font-weight: bold;
  font-size: 2.5em;
}
section{
  width: 100%;
  height: 500px;
}
.diary-box >div {
  width: 1000px;
  height: 70px;
  border-bottom : 1px dotted #333;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}
.diary-box > div > div{
color: #333;
  line-height: 100px;
  font-size: 1.9em;
}
.writeBtn > img{
  width:50px;
  height: 45px;
  border: 1px solid #333;
  border-radius: 100px;
  float: right;
  margin-right: 145px;
  cursor: pointer;
}
.myfeeling > img{
  width: 90px;
  margin-bottom: 40px;
  padding-right: 30px;
}
.btn-cover{
  width: 250px;
  margin: 0 auto;
  margin-top: 10px;
}
.page-btn{
  width: 70px;
  text-align: center;
  box-shadow: 3px 3px 3px black;
  transition-duration: 0.3s;
}
.page-btn:active{
  margin-left: 5px;
  margin-top: 5px;
  box-shadow: none;
}

</style>