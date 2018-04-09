'use script'
const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view_engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}; ${req.method}; ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+"\n", (err) => {
        (err) ? console.log('Unable to append data') : null ;
    });
    next();
});

// Maintenance Middelware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
app.get('/', (req, res) => {    
    res.render('home.hbs', {
        pageTitle:'Home Page',
        welcomeMessage: "Welcome to my homepage"        
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', 
    {
        pageTitle: 'About Page'
    }); 
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error processing request'
    });
})
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Sever is up in port ${PORT}!`);
});
