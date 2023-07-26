<template>
    <div class="popup">
      <h1>{{modalData[0]}}년 {{modalData[1]}}월 {{modalData[2]}}일</h1>
      
      
      <button @click="closePopUp()" class="closePopUp">닫기</button>

    </div>
</template>

<script>
export default{
    name: "PopUp",
    props : ['modalData'],
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
    closePopUp(){
        this.$emit('close')
      }
    }
}
</script>

<style scoped>
.popup{
    width: 500px;
    position: fixed;
    height: 500px;
    background-color: #fff;
    border: 1px solid #333;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
}
h1{
    text-align: center;
    margin-top: 20px;
}
.closePopUp{
    position: fixed;
    right: 20px;
    bottom: 20px;
}
</style>