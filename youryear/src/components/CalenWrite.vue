<template>
    <div id="calenWrite">
        <h1>popup</h1>
        <input type="text" placeholder="할 일을 입력해주세요">
        
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        popup(year,month,day){
            alert(year+"년"+month+"월"+day+"일")
        }
    }
}
</script>

<style scoped>
.calenWrite{
    width: 500px;
    height: 500px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>