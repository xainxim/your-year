<template>
    <div class="bucket">
      <header-view></header-view>
      <h1> {{ motto }} </h1>
      <div class="bucket-lists">
        <div class="life" @click="lifeView()">life</div>
        <div class="year" @click="yearView()">year</div>
        <div class="travel" @click="travelView()">travel</div>
      </div>
      <div></div>

      <life-view v-if="lifeState" v-bind:modalData="dateData"></life-view>
      <year-view v-if="yearState" v-bind:modalData="dateData"></year-view>
      <travel-view v-if="travelState" v-bind:modalData="dateData"></travel-view>
    </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import LifeView from './LifeView.vue';
import YearView from './YearView.vue';
import TravelView from './TravelView.vue';
export default {
  name: 'HomeView',
  props: {
    msg: String
  },
  components: {
    HeaderView,
    LifeView,
    YearView,
    TravelView
  },
  data(){
    return{
      motto: '',
      dateData : []
    }
  },
  methods:{
    selectMotto(){
      this.axios.get("/api/web/motto").then((res) => {
        
        this.motto = res.data.motto;
        console.log(this.motto)
      })
    },
    lifeView(){
      this.lifeState = true;
      this.yearState,this.travelState = false;
      this.dateData = [];
    },
    yearView(){
      this.yearState = true;
      this.lifeState,this.travelState = false;
      this.dateData = [];
    },
    travelView(){
      this.travelState = true;
      this.lifeState,this.yearState = false;
      this.dateData = [];
    }
  },
  created(){
    this.selectMotto();
    this.lifeView();
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
.bucket-lists{
  width: 300px;
  height: 700px;
  text-align: center;
  font-size: 2.7em;
  margin-top: 20px;
  float: left;
}
.life,.year,.travel{
  height: 230px;
  border : 1px solid #333;
  line-height: 230px;
}

</style>
