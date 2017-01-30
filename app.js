var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser=require('body-parser');
var nunjucks= require('nunjucks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true})


app.get('/', (req,res,next)=>{

    res.render('formT.html');

})

app.post('/', (req, res, next)=>{

    var tweet = req.body.name;
    console.log(tweet);


    fs.writeFileSync('./feedertext.txt', tweet);

    res.redirect('https://twitter.com/TesselTweet');

})

app.use( (err,req,res,next)=>{
    res.send(err.message);
})


app.listen(3000, ()=>{
    console.log('listening');
});
