<template>
    <div class="header">
        <h3> {{ nickname }} </h3>
        <ul class="menu">
            <li class="list"><router-link to="/home">home</router-link></li>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list">calendar</li>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list"><router-link to="/diary">your diary</router-link></li>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <li class="list">bucket list</li>
        </ul>
      </div>
</template>

<script>
export default{
    data(){
        return{
            nickname : ''
        };
    },
    methods: {
        selectName(){
            this.axios.get("api/web/"+this.nickname).then((res) => {
                console.log(res.data);
                this.nickname = res.data.nickname;
            })
        }
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
.header{
    width: 1300px;
    margin: 0 auto;
}

.menu {
    list-style: none;
    padding: 0;
    margin-left: 26%;
    margin-top: 40px;
}
h3{
    margin-left: 45%;
    margin-top: 100px;
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