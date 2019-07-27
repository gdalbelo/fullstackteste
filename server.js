var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./auth');

const port = 3000;

var User = require('./models/user.js');
var Post = require('./models/post.js');

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id', async(req, res) => {
    var author = req.params.id;
    var posts = await Post.find({author});
    res.send(posts);
});

app.put('/post-edit', function (req, res) {
    var mensagem = req.body.msg;
    var id = req.body.id;
    Post.update({_id : id },  { $set: { msg: mensagem } }, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });
    /*post.update(
        {"_id" : id},
        {$set: { "msg" : msg}});*/
    //res.send('Produto atualizado');
  });

app.delete('/post-delete/:id', function (req, res) {
    var id = req.params.id;
    //var post = Post.find({_id : id });
    Post.remove({_id : id }, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
})

app.post('/post', (req, res) => {

    var postData = req.body;
    postData.author = req.body.id;

    var post = new Post(postData);

    post.save((err, result)=>{
        if(err){
            console.log('Saving Post Error');
            return res.status(500).send({message: 'Saving Post Causing an error'});
        }

        res.sendStatus(200);    
    })
})

app.get('/users', async(req, res) => {
    try {
        let users = await User.find({}, '-password -__v');
        res.send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/profile/:id', async(req, res) => {
    try {
        var author = req.params.id;
        var posts = await Post.find({author});
        let user = await User.findById(req.params.id, '-password -__v');
        res.send({user: user, post: posts});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//app.post('/register', auth.register);

//app.post('/login', auth.login);

const config = {
    autoIndex: false,
    useNewUrlParser: true,
};
mongoose.connect('mongodb://gdalbelo:gaBelo1609@ds251804.mlab.com:51804/meanstack', {config}, (err) => {
    if(!err){
        console.log('Connected to mongo Database');
    }
});

app.use('/auth', auth);

app.listen(port);
