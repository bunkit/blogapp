const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// conecting to DB
mongoose.connect('mongodb://localhost/blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//SCHEMA SETUP
const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created:  {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs}); 
        }
    });
});

app.get('/blogs/new', function(req, res){
    res.render('new');
});

app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err,blog){
    if(err){
        res.render('new');
    } else {
        res.redirect('/blogs');
    }
    })
});

// Blog.create({
//     title: 'The AI monitor ',
//     body: 'The AI monitor is down, generate the open-source circuit so we can program the THX protocol!',
//     image: 'https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
// }, function(err,blog){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(blog);

//     }
// })

app.listen(process.env.PORT || 3000, process.env.IP);
