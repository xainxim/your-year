
<template>
  <HeaderView></HeaderView>

  <div class="homeView">
    <!-- {{ nickname }} -->

    <div name="weather-box">
      <div class="weather-box">
        <div class="temp">{{temp}}℃</div>
        <div class="location">{{location}}
          <div class="weather">{{weather}}</div>
        </div>
    </div>
    <div class="saying">
      
    </div>

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
    };
  },
  mounted(){
    let fetchUrl = `${this.weather_url_base}weather?q=Seoul&appid=${this.weather_api_key}`
    fetch(fetchUrl)
      .then(response => {
        return response.json()
      })
      .then(result => {
        // this.result = result
        this.location = result.name//지역
        this.weather = result.weather[0].main.toString() // 날씨 정보
        this.temp = (result.main.temp - 273.15).toFixed(1) // 기온
      })
  },
  methods: {
    selectName() {
      this.nickname = this.$route.params.nickname;
      this.axios.get("/api/web/" + this.nickname).then((res) => {
        console.log(res.data);
        this.nickname = res.data.nickName;
      })
    }
  },
  created() {
    this.selectName();
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
.weather-box{
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
}.weather-box{
  width: 350px;
  display: flex;
  justify-content: space-between
}
.weather-box .weather {
  color: palevioletred;
  font-size: 50px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>