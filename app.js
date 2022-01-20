const express = require("express");
const path = require("path");
const app = express();
const moongoose = require('mongoose');
const bodyparser =require("body-parser");
moongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});
const port = 8000;


//Define mongoose schema
var contactSchema = new moongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});

var contact = moongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/index', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/About', (req, res)=>{
    const params = { }
    res.status(200).render('About.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This is item has been save to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});