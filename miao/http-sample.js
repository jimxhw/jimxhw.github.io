var net = require("net") 
var queryParse = require('querystring')
let server = net.createServer()
let port = 8088
let mesgs = [{'name':"Bob",'mes':"rap",'timeNode':1567513033501},{'name':"Merry",'mes':"basketball",'timeNode':1567513003501}]
server.on("connection",socket=>{
  socket.on('data',data=>{
    let dataRequire = data.toString()   //data是buffer类型，将其转化为字符串
    let [header,body]=dataRequire.split("\r\n\r\n")  //将请求分为请求体和消息体 
    let [fistLine,...other] = header.split('\r\n') //拿到第一行请求体
    let [method,path] = fistLine.split(' ') //拿到请求方法
    if(method === "POST"){
      let temp = queryParse.parse(body) //解析填写的字符串
      temp.timeNode = Date.now() //为解析结果添加时间属性
      mesgs.unshift(temp) //将该解析结果添加到mesgs中
      socket.write('HTTP/1.1 302 Moved\r\n') 
      socket.write('Location: /\r\n') //刷新浏览器会导致浏览器执行最后一次的请求，这里告诉浏览器地址跳转了，浏览器会自动发出新的请求，此时是get，然后会执行get方法的代码
      socket.end()
      return
    }
    socket.write('HTTP/1.1 200 OK\r\n')
    socket.write('Content-Type:text/html;charset=UTF-8\r\n\r\n')
    socket.write(`
      <style>
        .box{
          border:1px solid;
          margin:5px;
          padding:5px;
        }
      </style>
      <form action = '/' method = 'POST'>
      Name:<br>
      <input name="name" /> <br>
      Message:<br>
      <textarea name="mes"></textarea> <br>
      <button>提交</button>
      </form>
      <hr>
    `)
    mesgs.forEach(x=>{
      var html =`
        <div class="box">
          <h3>${x.name}---------<small>${new Date(x.timeNode).toLocaleTimeString()}</small></h3>
          <pre>${x.mes}</pre>
        </div>
      `
      socket.write(html)
    })
    socket.end()
  })
})
server.listen(port, () => {
    console.log('server listening on port', port)
  })