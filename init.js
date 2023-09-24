const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(()=>{
    console.log("Connection succesful")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats=[
    {
        from:"TRS",
    to:"Radhika",
    msg:"Come to our podcast",
    created_at: new Date()
    },{
        from:"Mithpat",
    to:"Mithila",
    msg:"Hello",
    created_at: new Date()
    },{
        from:"Thugesh",
    to:"carryMinati",
    msg:"send me your roast",
    created_at: new Date()
    },{
        from:"Manish",
    to:"Techguruji",
    msg:"will work together",
    created_at: new Date()
    },{
        from:"AbhijeetChadva",
    to:"Abhi_niyu",
    msg:"Will do podcast",
    created_at: new Date()
    }];
    Chat.insertMany(allChats);