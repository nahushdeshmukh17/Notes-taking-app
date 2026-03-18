const express = require('express');
const app=  express();
const path = require('path');
const fs= require('fs');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));



app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.log("ERROR:", err);
        } else {
            console.log("FILES:", files);
        }
    res.render('index',{files: files});
    });

});

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err,data)=>{
        res.render('read',{filename: req.params.filename, filedata: data});
    })
});



app.post('/create', (req, res) => {
    

 fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
    if (err) throw err;
    res.redirect('/');
});

});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})