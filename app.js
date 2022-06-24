const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
let ejs = require('ejs')

const app = express();
const port = 3000;
//using body-parser and ejs
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//enable css on the public file
app.use(express.static("public"))

//Starting the arrays of tasks
let items = [];
let workItems = []; //test

//Calling the date of the day calling to the getDate function imported above
app.get('/', (req, res) =>{
 let day = date.getDate()
    //sending the vars of the date and the array of tasks
    res.render("list", { listTitle: day, newListItems: items})
});

//asking if the task is from the main form or the test form
app.post('/', (req, res) =>{
    let item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === 'Work List'){ //if the item is from the test form then the items go to the workItems array
        workItems.push(item);
        res.redirect('/work')
    }else{
        items.push(item) //else the items go to the main form
        res.redirect('/')
    } 
})
//delete endpoint
app.post("/deleteItem", (req, res) => {
    let item = req.body.button;
    items.splice(items.indexOf(item), 1); //showing the position of the actual item and just deleting one item
    res.redirect("/");
})

//showing the work test task array
app.get('/work', (req, res) =>{
    res.render("list", {listTitle: 'Work List', newListItems: workItems})
})
//test of other page on the project
app.get('/about', (req, res) =>{
    res.render('about')
})

//if the server is running the it will running in the const port
app.listen(port, () =>{
    console.log("Port listen");
})

