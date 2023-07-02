//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;



mongoose.connect("mongodb+srv://divyansh30:Div123@div0.yap2rgl.mongodb.net/blogDB");


const postSchema = mongoose.Schema({
  title: String,
  content: String
});
const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Welcome to our vibrant corner of the internet, where ideas come to life and stories unfold. This is your gateway to a world of knowledge, inspiration, and thought-provoking content.You can compose new blogs by clicking on the COMPOSE tab";
const aboutContent = "Just a curious guy.";
const contactContent = "Have a burning question or a topic you'd like me to cover on the blog? Interested in collaborating or sharing your own story?";
const contactContent1 = "Your thoughts and opinions matter to me. Reach out to me through this contact page and let's engage in meaningful discussions. I'm excited to connect with like-minded individuals and hear your unique perspectives."

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  Post.find().then((foundPosts) => {
    res.render("home", {
      startingContent: homeStartingContent,
      newItems: foundPosts
    });
  })

});

app.get("/about", function (req, res) {
  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contact: contactContent,
    contact1: contactContent1
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");

});

app.post("/compose", function (req, res) {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save().then(() => {
    res.redirect("/");
  });
  
});
app.get("/posts/:postId", function (req, res) {
  
  const requestedPost = req.params.postId;
  Post.findById({ _id:requestedPost }).then((post) => {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});




app.listen(port, function() {
  console.log("Server started on port 3000");
});

