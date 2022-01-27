import fs from 'fs'
import http from 'http'
import {parse} from 'querystring'


http.createServer((req,res)=>{
    if(req.method==="GET"&&req.url === '/'){ 
        let data = fs.readFileSync('Emp.html')
        let list = fs.readFileSync('message.txt').toString().split(`*`)
        let empList = []
        list.map(val=>
            empList.push(JSON.parse(val))
            )
            let body = ''
            empList.map(val=>
                body+=`<tr><td>${val.ename}</td><td>${val.age}</td><td>${val.city}</td><td>${val.sal}</td></tr>`
                )
                res.write(`${data} ${body} 
                </tbody>
                </table>
                </body>
                </html>    
                `)
                res.end()
    } 
        else if(req.method =='GET' && req.url ==='/addemplyoee'){
            res.writeHead(200,{'Content-type':'text/html'});
            let data = fs.readFileSync('EmpFrom.html')
            res.write(data)
            res.end()
        }

     else if(req.method=="POST" ){
        let body='';
        req.on('data',(data)=>{
            body = parse(data.toString())
            fs.appendFile('message.txt',`*${JSON.stringify(body)}`,(err)=>{if (err) throw err;
            console.log(body);
            })
        })

        req.on('end',()=>{
            res.writeHead(301, { "Location": "http://localhost:6677/" });
                res.end()
            })
 
        }
})
.listen(6677,()=>{
    console.log("listening on port 6677");
})