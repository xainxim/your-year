const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // port: 8080,
    headers:{
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Contents' : 'Content-Type',
    },
    proxy: {
      //프록시 요청을 보낼 api 시작 부분
      '/': {      
        target: 'http://localhost:8050',
        changeOrigin: true,
        ws:false
      }
    }
  }
})
