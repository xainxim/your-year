<template>
    <div class="popup">
      <h2>팝업창</h2>
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
.closePopUp{
    position: fixed;
    right: 20px;
    bottom: 20px;
}
</style>