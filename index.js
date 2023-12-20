import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { URLSearchParams, fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public/'));
var posts = [
    "'Animal' box office Day 18: Ranbir Kapoor's film sees drastic drop on Monday",
    "Dawood Ibrahim, India's most wanted, in Karachi hospital, floor sealed: Sources",
    "Apple's 2024 iPad Pro May Support MagSafe Charging",
    "10 Incredible Benefits Of Consuming Dark Chocolate"
];
app.get('/',(req,res)=>{
    res.render("index.ejs",{
        post : posts
    });
});
app.get('/create',(req,res)=>{
    res.render("create.ejs");
});
app.get('/viewall',(req,res)=>{
    res.render("viewall.ejs",{
        post:posts
    });
});
app.post('/submit',(req,res)=>{
    posts.push(req.body['title']);
    res.redirect("/");
});

app.post("/modify",(req,res)=>{
    var index = req.body["modify"];
    var titleValue = posts[index];
    res.render("modify.ejs",{
        title:titleValue,
        index:index,
    })
})
app.post("/delete",(req,res)=>{
    var index = req.body["delete"];
    // console.log(req.body);
    posts.splice(index,1);
    res.send("Deleted");
})


app.post("/submitmodification",(req,res)=>{
    var index = req.body["previoustitle"];
    var newTitle = req.body['title'];
    posts[index] = newTitle;
    res.redirect("/");
})

app.listen(port,()=>{
    console.log("Server is running on "  + port);
});