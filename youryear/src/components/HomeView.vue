
<template>
  <HeaderView></HeaderView>

  <div class="homeView">
    <!-- {{ nickname }} -->

    <div name="weather-box">
      <div class="weather-box">
        <div id="weatherIcon"></div>
        <div class="temp">{{ temp }}℃</div>
        <div class="location">{{ location }}
          <div class="weather">{{ weather }}</div>
          
        </div>
      </div>
    </div>
    <div class="saying">
      <p>Today's saying</p>
      {{ saying }}
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

        // if(this.weather == "Clouds"){
        //   this.weatherText= '구름'
        // }
        const weatherTmp = document.createElement("img")  // 날씨 이미지
        weatherTmp.src = require(`../assets/images/${this.iconCode}.png`)
        document.getElementById("weatherIcon").appendChild(weatherTmp)
      })
  },
  methods: {
    getSaying() {
      this.axios.get("http://api.adviceslip.com/advice").then((res) => {
        this.saying = res.data.slip.advice;
        console.log(this.saying);
      })
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
  width: 1300px;
  margin: 0 auto;
}
.weather-box {
  margin-top: 50px;
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
  margin-left: 60%;
  margin-top: -125px;
  font-size: 2em;
}
.saying p{
  font-weight: bold;
  font-size: 1.2em;
  border-bottom: 1px solid palevioletred;
  width:200px;
}
</style>