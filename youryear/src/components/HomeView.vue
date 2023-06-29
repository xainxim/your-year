
<template>
  <HeaderView></HeaderView>

  <div class="homeView">
    <!-- {{ nickname }} -->

    <div name="weather-box">
      <div class="weather-box">
        <div id="weatherIcon"></div>
        <div class="temp">{{ temp }}℃</div>
        <div class="location">{{ location }}
          <div class="weather">{{ weatherText }}</div>
        </div>
      </div>
    </div>
    <div class="saying">
      <p>Today's saying</p>
      {{ saying }}saying
    </div>
    <div class="contents">
      <div class="todo">
        <img src="../assets/images/todo.jpeg" alt="">
        <h1>Today's List</h1>
        <ul>
          <li v-for="data in state.todoData" :key="data">
            <input type="text" :value="data">
          </li>
          <button @click="add()" class="todoBtn">+</button>
        </ul>
        
      </div>
      <div class="memo">
        <img src="../assets/images/memo.png" alt="">
        <h1>memoooo</h1>
        <textarea class="memoText"></textarea>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import { reactive  } from 'vue';
export default {
  setup(){
    const state = reactive({
        todoData: ['data1','data2','data3'],
      });

      const add = () => {
        state.todoData.push("추가 data");
      }
      return { state, add };
  },
  name: 'HomeView',
  props: {
    msg: String
  },
  components: {
    HeaderView
  },
  data() {
    return {
      nickname: '',
      weather_api_key: "f806317ffcb65c6eecd625838e41c2c3",
      weather_url_base: "http://api.openweathermap.org/data/2.5/",
      weather: {},
      code: '',
      temp: 0,
      weatherIcon: '',
      iconCode: '',
      weatherText: ''
    };
  },
  mounted() {
    let fetchUrl = `${this.weather_url_base}weather?q=Seoul&appid=${this.weather_api_key}`
    fetch(fetchUrl)
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.result = result
        this.location = result.name  // 지역
        this.weather = result.weather[0].main.toString()  // 날씨 정보
        this.temp = (result.main.temp - 273.15).toFixed(1) // 기온
        this.iconCode = result.weather[0].icon.toString()

        if(this.weather == "Clouds") this.weatherText= '구름'
        if(this.weather == "Rain") this.weatherText= "비"
        if(this.weather == "Mist") this.weatherText= "안개"
        if(this.weather == "Snow") this.weatherText= "눈"
        if(this.weather == 'Thunderstorm') this.weatherText= "천둥"

        const weatherTmp = document.createElement("img")  // 날씨 이미지
        weatherTmp.src = require(`../assets/images/${this.iconCode}.png`)
        document.getElementById("weatherIcon").appendChild(weatherTmp)
      })
  },
  methods: {
    getSaying() {
      this.axios.get("https://api.adviceslip.com/advice").then((res) => {
        this.saying = res.data.slip.advice;
        console.log(this.saying);
      })
    },
    todo(){

    }
  },
  created() {
    this.getSaying();
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
.homeView {
  width: 1700px;
  margin: 0 auto;
}
.weather-box {
  margin-top: 50px;
  margin-left: 14%;
}
.location {
  width: 100px;
  height: 50px;
  color: pink;
  font-size: 50px;
  font-weight: 500;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.weather-box .temp {
  text-align: center;
  display: inline-block;
  padding: 10px 25px;
  color: pink;
  font-size: 70px;
  font-weight: 1000;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box {
  width: 470px;
  display: flex;
  justify-content: space-between
}
#weatherIcon{
  width: 120px;
}
.weather-box .weather {
  color: palevioletred;
  font-size: 40px;
  font-weight: 700;
}
.saying{
  margin-left: 55%;
  margin-top: -125px;
  font-size: 2em;
}
.saying p{
  font-weight: bold;
  font-size: 1.2em;
  border-bottom: 1px solid palevioletred;
  width:200px;
}
.contents{
  width:1300px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}
.memo, .memo>img{
  width: 520px;
  height: 500px;
}
.memo h1{
  position: absolute;
  top: 100px;
  left: 70%;
  font-size: 3em;
}
.memoText{
  position: absolute;
  display: block;
  resize: none;
  top: 155px;
  left: 59%;
  width:390px;
  height: 290px;
  font-size: 2em;
  border: 0;
}
.todo, .todo>img{
  margin-top: 20px;
  width: 550px;
  height: 450px;
  position: relative;
}
.todo h1{
  position: absolute;
  top: 80px;
  left: 35%;
  font-weight: bold;
}
.todo ul{
  position: absolute;
  top: 125px;
  left: 40px;
  font-size: 2em;
}
.todo ul li{
  border-bottom: 1px solid #333;
  width: 400px;
}
.todo input{
  width: 350px;
  border: 0;
}
.todoBtn{
  margin-top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
}
</style>