const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
let ejs = require('ejs')

const app = express();
const port = 3000;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let items = [];
let workItems = [];

app.get('/', (req, res) =>{
 let day = date.getDate()
    res.render("list", { listTitle: day, newListItems: items})
});

app.post('/', (req, res) =>{
    let item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === 'Work List'){
        workItems.push(item);
        res.redirect('/work')
    }else{
        items.push(item)
        res.redirect('/')
    } 
})
app.post("/deleteItem", (req, res) => {
    let item = req.body.button;
    items.splice(items.indexOf(item), 1);
    res.redirect("/");
})

app.get('/work', (req, res) =>{
    res.render("list", {listTitle: 'Work List', newListItems: workItems})
})

app.get('/about', (req, res) =>{
    res.render('about')
})
app.listen(port, () =>{
    console.log("Port listen");
})

