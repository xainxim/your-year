<template>
    <div class="header">
        <h1>YourYear</h1>
        <ul class="menu">
            <li class="list"><router-link to="/home/:nickname">home</router-link></li>&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list">calendar</li>&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list"><router-link to="/diary">your diary</router-link></li>&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list">bucket list</li>
        </ul>
      </div>
</template>

<script>
export default{
    data(){
        return{
            // nickname : ''
        };
    },
    props:{
        nickname: String
    },
    methods: {
        // selectName(){
        //     this.axios.get("/api/web/"+this.nickname).then((res) => {
        //         console.log(res.data);
        //         this.nickname = res.data.nickname;
        //     })
        // }
    },
    created(){
        // this.selectName();
    }
}
</script>


<style scoped>
* {
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
    color: #333;
}
h1{
    font-size: 6em;
    margin-top: 30px;
    text-align: center;
    font-weight: bold;
    color: palevioletred;
}
.header{
    width: 1300px;
    margin: 0 auto;
}

.menu {
    font-size: 2em;
    list-style: none;
    padding: 0;
    margin-left: 15%;
    margin-top: 30px;
}
.list {
    margin-right: 10px;
    display: inline;
    cursor: pointer;
    position: relative;
}

.list:before {
    width: 0%;
    transition: width 0.3s;
    transform: translateX(-50%);
    position: absolute;
    bottom: -6px;
    left: 50%;
    height: 1px;
    background: #333;
    content: '';
    display: block;
}

.list:hover::before {
    width: 100%;
    transition: width 0.3s;
}
</style>