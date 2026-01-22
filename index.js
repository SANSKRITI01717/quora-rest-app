const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const  methodOverride = require('method-override');
app.use(methodOverride('_method'))

const { v4: uuidv4 } = require('uuid');
const { appendFile } = require("fs");


app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
  let {username,content}=req.body;
  let id=uuidv4();;
  posts.push({id,username,content});
  res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=> id === p.id);
 res.render("show.ejs",{post});
 
})
app.patch("/posts/:id",(req,res)=>{
     let {id}=req.params;
     let newcontent=req.body.content;
      let post=posts.find((p)=> id === p.id);
     post.content=newcontent;
   
    res.redirect("/posts");

})
app.delete("/posts/:id",(req,res)=>{
     let {id}=req.params;
      posts=posts.filter((p)=> id !== p.id);
      res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
     let {id}=req.params;
     let post=posts.find((p)=> id === p.id);
     res.render("edit.ejs",{post});
    
})
let posts=[
    {   id:uuidv4(),
        username:"Sanskriti",
        content:"i am learning coading!"
    },
    
     {    id:uuidv4(),
        username:"fackbook",
        content:"just launched a new feature!"
    },
     {   id: uuidv4(),
        username:"twitter",
        content:"i am an app!"
    },
     {    id: uuidv4(),
        username:"apple",
        content:"sanskriti got selected"
    },

]

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
    console.log("listing to port");
})