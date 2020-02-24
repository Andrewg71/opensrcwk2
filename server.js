const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));


hbs.registerHelper('ptag', (num, words)=>{
    var str='';
    for(let i=0; i < num; i++){
        str+='<p>';
            str+=words;
        str+='</p>';
    }

    return new hbs.handlebars.SafeString(str);

})

function rando(req, res, next) {
    req.num = Math.round(Math.random()*25);
    next();//must put the next to go to the next function (won't run thru data if data is not found first)
}

app.get('/index', (req, res)=> {
    res.render('index', {name:"index"});
})

app.get('/about', (req, res)=> {
    res.render('about', {name:"about"});
})

app.get('/form', (req, res)=> {
    res.render('form', {name:"form"});
})

app.post('/results', (req, res)=> {
    let name = req.body.name;
    let email = req.body.email;
    let comments = req.body.comments;
    
    res.render('results', {name:name, email:email, comments:comments});
})

app.use((req, res, next)=>{
    req.error = new Error('Page not found!');
    req.error.status = 404;
    next();
})

/*app.use((req, res, next)=>{
    res.status(req.error.status || 500);
    next();
})*/

app.get("/*", (req, res)=>{
    res.render('error')
})

app.listen(3000, ()=> {
    console.log('Server is running at localhost:3000');
});




