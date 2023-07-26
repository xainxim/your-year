<template>
    <div class="TravelView">
        <h1>여 행</h1>

    </div>
</template>

<script>
export default{
    name: "TravelView",
    props : ['modalData'],
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.TravelView{
    width: 1200px;
    position: fixed;
    height: 690px;
    background-color: #fff;
    border: 1px solid #333;
    float: left;
    margin-left: 300px;
    margin-top: 20px;
    z-index: 999;
}
h1{
    text-align: center;
    margin-top: 20px;
}
</style>