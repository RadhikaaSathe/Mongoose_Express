const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


main().then(()=>{
    console.log("Connection succesful")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//.............................//
//create model
// let chat1 = new Chat({
//     from:"Aman",
//     to:"Shraddha",
//     msg:"send me your schedule",
//     created_at: new Date()
// })
// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//-------------------------------//
app.get("/",(req,res)=>{
    res.send("Root is working");
});

//----------------------------------------------------
//all chats
app.get("/chats",async(req,res)=> {
    let chats =  await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});


//---------------------------------------------------------------------
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//insert data create route
app.post("/chats",(req,res)=>{
    let{ from ,to ,msg}= req.body;
    let newChat= new Chat({
        from: from,
        to:to,
        msg:msg,
        created_at: new Date()

    })
    newChat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
})

//-------------------------------------------
//Edit route Update data
app.get("/chats/:id/edit",async(req,res)=>{
    
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});

})
//update after edit
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}= req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,
        new: true
    });
    console.log(updatedChat);
    res.redirect("/chats");
})


//--------------------------------------------------------------------------------------------------
//Delete
app.delete("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let deletedChat=await Chat.findIdAndDelete(id);
   res.redirect("/chats");
})


app.listen(8080,()=>{
    console.log("App listing on 8080");
})