import express from "express"
import mysql from "mysql"
import cors from "cors"
// // const express=require("express");
// // const mysql=require("mysql");
// // const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


const db=mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"password",  //default password by mysql.To change password run the below command on mysql workbench
   // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Jakasada@2002'
   database:"login_page"
})


// // Serve the login and registration HTML files
// app.get('/login', (req, res) => {
//    res.sendFile('C:\\Users\\dharn\\Desktop\\sem-5\\DBMS\\project\\backend'+ '/public/login.html');
//  });
 
//  app.get('/register', (req, res) => {
//    res.sendFile('C:\\Users\\dharn\\Desktop\\sem-5\\DBMS\\project\\backend'+ '/public/register.html');
//  });
 
//  // Handle registration and login routes
//  app.post('/register', (req, res) => {
//    // Add your registration logic here
//    res.send('Registration successful');
//  });
 
//  app.post('/login', (req, res) => {
//    // Add your login logic here
//    res.send('Login successful');
//  });
 
//  app.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
//  });
 
app.post("/register",(req,res)=>{

  const username=req.body.username;
  const password=req.body.password;
  // console.log("inside post");
  
  db.query("INSERT INTO details(email,password) VALUES(?,?)",
  [username,password],
  (err,result)=>{
      console.log(err);
  });

  // db.query(`
  //   CREATE TRIGGER increment_user_id BEFORE INSERT ON details
  //   FOR EACH ROW
  //   SET NEW.user_id = IFNULL((SELECT MAX(user_id) FROM details), 0) + 1;
  // `, (triggerErr, triggerResult) => {
  //   if (triggerErr) {
  //     console.error('Error creating trigger:', triggerErr);
  //   } else {
  //     // Insert the new user with the incremented user_id
  //     db.query(
  //       "INSERT INTO details(username, password) VALUES(?, ?)",
  //       [username, password],
  //       (err, result) => {
  //         if (err) {
  //           console.error('Error inserting user:', err);
  //           res.send({ success: false, message: 'Registration failed' });
  //         } else {
  //           res.send({ success: true, message: 'Registration successful' });
  //         }
  //       }
  //     );
  //   }
  // });
});

app.post("/login",(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;

  db.query("SELECT * FROM details WHERE email = ? AND password = ?",
  [username,password],
  (err,result)=>{
    if(err){
    res.send({err:err})
    }

    if(result.length > 0){
      res.send(result);
    }else{
      res.send({message:"Wrong username/password!"});
      }
    }
  );
});



app.listen(1200,()=>{
  console.log("connected to back end!!!!")
});


// app.get("/",(req,res)=>{
//    res.json("hello this is backend")
// });

// app.get("/books",(req,res)=>{
//    const q="select * from BOOks"
//    db.query(q,(err,data)=>{
//       if(err) return res.json(err)
//       return res.json(data)
//    })
// });

// app.post("/books",(req,res)=>{
//    const q="insert into books(id,title,description,cover) values(?)"
//    const values =[6,'idk','mystery','z.png']

//    db.query(q,[values],(err,data)=>{
//       if(err) return res.json(err);
//       return  res.json("book has been created successfully");
//    })
// })

