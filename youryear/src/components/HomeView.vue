
<template>
  <div class="homeView">
    <HeaderView></HeaderView>
    
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
      {{ saying }}
    </div>
    <div class="contents">

      <div class="todo">
        <img src="../assets/images/todo.jpeg" alt="">
        <div class="todo-box">
          <input type="text" v-model="todoList" placeholder="Today's List" class="todoInput">
          <button @click.prevent="addTodo" class="addTodo">할일 추가</button>

          
          <div class="todo-list" v-for="item in tasks" :key="item">
            <input id="checkboxCss" type="checkbox" :checked="item.done == 'true'" @change="checkBox(item)">
            <div class="todoList" :style="item.done == 'true'? 'text-decoration:line-through':''"> {{ item.todoList }} </div>
          </div>
        </div>
        <button @click.prevent="deleteTodo" class="deleteTodo">초기화</button>
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
      tasks: '',
      done: '',
      todoList: '',
      nickname: '',
      weather_api_key: "f806317ffcb65c6eecd625838e41c2c3",
      weather_url_base: "http://api.openweathermap.org/data/2.5/",
      saying_api_key: "guest",
      saying_url_base: "https://api.qwer.pw/request/helpful_text",
      saying: '',
      weather: {},
      code: '',
      temp: 0,
      weatherIcon: '',
      iconCode: '',
      weatherText: ''
    };
  },
  mounted() {  // 화면에 처음 보여지는
    let fetchUrl = `${this.weather_url_base}weather?q=Seoul&appid=${this.weather_api_key}`
    let sayingUrl = `${this.saying_url_base}?apikey=guest`
    fetch(sayingUrl)
      .then(response => {
        return response.json()
      })
      .then(result2 => {
        this.result2 = result2
        this.saying = result2[1].respond
      })
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

        if (this.weather == "Clouds") this.weatherText = '구름'
        if (this.weather == "Rain") this.weatherText = "비"
        if (this.weather == "Drizzle") this.weatherText = "이슬비"
        if (this.weather == "Mist") this.weatherText = "안개"
        if (this.weather == "Snow") this.weatherText = "눈"
        if (this.weather == 'Thunderstorm') this.weatherText = "천둥"
        if (this.weather == 'Clear') this.weatherText = "맑음"
        if (this.weather == 'Dust') this.weatherText = "먼지"

        const weatherTmp = document.createElement("img")  // 날씨 이미지
        weatherTmp.src = require(`../assets/images/${this.iconCode}.png`)
        document.getElementById("weatherIcon").appendChild(weatherTmp)
      })
    this.selectTodo();
  },
  methods: {
    addTodo() {
      if (this.todoList == "") {
        alert('내용을 입력해주세요')
        return;
      }
      console.log(this.todoList)
      console.log(this.done)
      this.axios.post("/api/web/todoList", {
        todoList: this.todoList 
      }).then((res) => {
        if (res.status == '200') {
          console.log(this.todo)
          // this.tasks.push({ words: this.todoList });
          this.todoList = "";
          this.selectTodo()
        }
      })
    },
    selectTodo() {
      this.axios.get('/api/web/selectTodo').then((res) => {
        this.tasks = res.data;
        this.done = res.data;
        console.log(this.done);
      })
    },
    checkBox(param){
      if(param.done == 'true'){
        param.done = 'false'
      }else{
        param.done = 'true'
      }

      this.axios.put('/api/web/updateTodoDone',param).then((res) =>{
        if (res.status == '200') {
          console.log(this.done)
        }
      })
    },
    deleteTodo(){
      this.axios.delete('/api/web/deleteTodoList').then((res) =>{
        if (res.status == '200'){
          this.selectTodo()
        }
      })
  },
  created() {
    
  }
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
  margin-left: 18%;
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

#weatherIcon {
  width: 120px;
}

.weather-box .weather {
  color: palevioletred;
  font-size: 40px;
  font-weight: 700;
}

.saying {
  margin-left: 50%;
  margin-top: -125px;
  font-size: 1.7em;
}

.saying p {
  font-weight: bold;
  font-size: 1.5em;
  border-bottom: 1px solid palevioletred;
  width: 200px;
}

.contents {
  width: 1300px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}

.todo-box {
  position: absolute;
  top: 80px;
  left: 10%;
}

.addTodo {
  width: 120px;
  height: 50px;
  font-size: 30px;
}

.todoInput {
  width: 100px;
}

.todo-list {
  margin-top: 20px;
}

.todoList {
  text-align: left;
  width: 430px;
  height: 30px;
  line-height: 30px;
  font-size: 30px;
}

.deleteTodo {
  position: absolute;
  margin-top: 420px;
  left: 80%;
  width: 80px;
  height: 30px;
  font-size: 20px;
}

.memo,
.memo>img {
  width: 520px;
  height: 500px;
  position: relative;
}

.memo h1 {
  position: absolute;
  top: 100px;
  left: 40%;
  font-weight: bold;
  font-size: 40px;
}

.memoText {
  position: absolute;
  display: block;
  resize: none;
  top: 155px;
  left: 13%;
  width: 390px;
  height: 290px;
  font-size: 2em;
  border: 0;
}

.todo,
.todo>img {
  margin-top: 20px;
  width: 550px;
  height: 450px;
  position: relative;
}

.todo h1 {
  position: absolute;
  top: 80px;
  left: 35%;
  font-weight: bold;
}

.todo ul {
  position: absolute;
  top: 125px;
  left: 40px;
}

.todo ul li {
  border-bottom: 1px solid #333;
  width: 400px;
}

.todo input {
  width: 350px;
  border: 0;
  font-size: 32px;

}

.todoBtn {
  margin-top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
}
input[type="checkbox"]{
  margin-right: 30px;
  display: inline-block;
  width: 30px;
  height: 30px;
  border:3px solid #707070;
  cursor: pointer;
}

</style>