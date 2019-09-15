let http = require('http')
let fs = require('fs')
let fsp=fs.promises
let path = require('path')
let mime = require("mime")
let urlDefault = __dirname
let port = 8090
let server = http.createServer(async (request, response) => {
    let fullPath = decodeURIComponent(path.join(urlDefault, request.url))
    try{
        let stat = await fsp.stat(fullPath)
        if (stat.isFile()) {
            let Type = mime.getType(fullPath)
            let data = await fsp.readFile(fullPath)
            response.writeHead(200, { 'Content-Type': `${Type}; charset=UTF-8` })
            response.end(data)
        } else {
            let files = await fsp.readdir(fullPath)
            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
            files.forEach(file => {
                response.write(`
                <a href="${file}">${file}</a><br>`)
            })
            response.end()
        }
    }catch(e){
        response.writeHead(404, { 'Content-Type': `text/html; charset=UTF-8` })
        response.end(e)
    }
    
})
server.listen(port, () => { console.log(port) })