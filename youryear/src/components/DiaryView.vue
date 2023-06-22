<template>
  <HeaderView></HeaderView>
  <div class="diaryView">
    <h2>일긔</h2>

    <section>
      <div class="diary-box">
        <div v-for="item in DiaryList" :key="item">
          <!-- <div class="idx">{{ item.idx }}</div> -->
          <div class="title">{{ item.title }}</div>
          <div class="date">{{ item.createdDatetime }}</div>
        </div>
      </div>
    </section>
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
  el: '.diary-box',
  data() {
    return {
      DiaryList: [
        { idx: '' },
        { title: '' },
        { createdDatetime: '' }
      ],
      DiaryLength : 0,
    };
  },
  methods: {
    selectDiaryList() {
      this.axios.get("/api/web").then((res) => {
        this.DiaryList = res.data;
        this.DiaryLength = this.DiaryList.length;
        console.log('length :: ' + this.DiaryList.length);
        console.log(this.DiaryList);
      });
    }
  },
  created() {
    this.selectDiaryList();
  }
}
</script>


<style scoped>
.diaryView {
  width: 1300px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin: 40px 0 0 0;
  font-weight: bold;
  font-size: 2.5em;
}

.diary-box >div {
  width: 1000px;
  height: 100px;
  border-bottom : 1px solid palevioletred;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.diary-box > div > div{
color: #333;
  line-height: 100px;
  font-size: 1.5em;
}

</style>