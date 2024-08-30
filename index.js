import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))


let posts = [
    {
      id: 1,
      title: "Lorem Ipsum",
      date: "02/06/2004",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum tellus quis tortor ullamcorper interdum.`
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      date: "28/11/1998",
      text: `Praesent venenatis lorem vel felis maximus laoreet.s`
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      date: "30/11/1999",
      text: `Nullam lacinia euismod risus vitae dictum. Phasellus finibus commodo risus, et ultrices libero euismod ac.`
    },
  ];


const d = new Date()
const date = d.getDay()

function obterDataAtual() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1; // Lembre-se de adicionar 1 ao índice do mês
  const ano = dataAtual.getFullYear();

  return `${dia}/0${mes}/${ano}`;
}


app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/create", (req, res) => {
  res.render("create.ejs");
})

app.post("/create", (req, res) => {
    const { title, text } = req.body;
    const data = obterDataAtual()
    const newPost = { id: posts.length + 1, title, text, date: data };
    posts.push(newPost);
    res.redirect("/");
})

app.get("/update/:id", (req, res) =>{
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id)
  res.render("edit.ejs", {post});
})

app.post("/update/:id", (req, res) =>{
  const {title, text} = req.body;
  const data = obterDataAtual()
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  post.title = title;
  post.text = text
  post.date = data
  res.redirect("/");
})

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filteredPosts = posts.filter(post => post.id !== id);
  if (filteredPosts.length < posts.length) {
    posts = filteredPosts;
    res.redirect("/");
  }
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
