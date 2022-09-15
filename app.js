const express=require('express');
const mysql=require('mysql');
const bcrypt=require("bcrypt");

const app=express()
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login'
})

db.connect(function(error){
    if(error){
        console.log('error')
    }else{
        console.log('connected')
    }
})

const bodyParser = require('body-parser')
app.use(bodyParser.json())


// app.put('/register', (req, res)=>{
//     console.log(req.body)
// })

app.post('/register', async (req, res) => {
    // console.log(req.body);
    try {
        let {username, password} = req.body;
        const salt = await  bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);

        db.query(`INSERT INTO users(username, password) VALUES ('${username}', '${password}')`, (err, result)=>{
            if(err){
                return res.status(404).json({text:"Oops", err:true})
            }else{
                return res.status(200).json({text:"Completed", data:result, err:false})
            }
        })
        res.status(200).json('working well')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/login', async (req, res) => {
    try {
        let {username, password} = req.body;
        db.query(`SELECT * FROM users WHERE username='${username}' LIMIT 1`, (error,result)=>{
            // if (users){
                const valid = bcrypt.compare (password, username)
                if (valid){
               res.status(200).json({text:'valid password' , data:result})
                }else{
                    res.send('wrong password')
                }
            // } else{
            //     res.status(400).json('not found')
            // }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

// app.post('/login', async (req, res) =>{
//     try {
//         db.query("SELECT * FROM users",function(error,result)
//     } catch (error) {
        
//     }


    // try {
    //     const {username, password} = req.body;
    //     db.query("SELECT * FROM users",function(error,result)
    
        // const user = await db ('users').first('*').where ({username: username})
//          if (user){
//             const valid = await bcrypt.compare (password, user.password)
//             if (valid){
//                 res.status(200).json('valid password and error')
//             }else{
//                 res.json('wrong password')
//             } 
//         }else{
//             res.status(400).json('not found')
//             }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send('Internal Server Error')
// }







exports.something = () =>{

}
// app.get('/login', async(req,res) =>{
    
//        try  {   
//     console.log('connected')
//     db.query("SELECT * FROM users",function(error,rows){
//     }   
//         catch(error){
//             console.log('query error')
//         }
//             res.send(rows)
//         }
//     });   

//    }
// ); 

// app.post

// app.post('/login',(req,res)=>{
//     const params=req.body;
//     db.query("INSERT INTO users Set password=?",[password,username],(error,rows)=>{
//         if(error){
//             console.log('error insert')
//         }else{
//             return res.json(params)
//         }
//     })
//     // console.log(params)
// })
// )
// app.post("/login",function(req,res){
//     const {name,password}=req.body
//    db.query("UPDATE users SET password=? WHERE username = ?",[password,username],function(error,rows){
           
//            if(error){
//                console.log('update error')
//            }else{
//                res.send(req.body)
//            }
//        });
//     })




app.listen(3000, function(req, res){
    console.log("server is up and running on port 3000")
})
