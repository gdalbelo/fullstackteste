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

app.post('/post', (req, res) => {

    var postData = req.body;
    postData.author = '5d39bad89102f34d94c68b38';

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
        let user = await User.findById(req.params.id    , '-password -__v');
        res.send(user);
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