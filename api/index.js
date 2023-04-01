/*
  Following are all the libraries and files imported 
  (some were installed using yarn)
*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const app = express();

// salt and secret are used to encrypt password
const salt = bcrypt.genSaltSync(10);
const secret = 'shhhhhitsasecret7893927854hkjhahuiuui8752';

// setting up the imported libraries to our application server
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// connecting the mongodb using uri
mongoose.connect('mongodb+srv://softengkannika:Fr8kcJ0rImzzLjQo@cluster0.mzuk1yj.mongodb.net/?retryWrites=true&w=majority');

// Handling signup request
app.post('/signup', async (req,res) => {
    // req.body contains username, password, and email 
    // which are collected from front-end and sent to back-end
    const {username,password,email} = req.body;
    try{
        // Trying to create node in the UserDB collection
        // with the collected info
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password,salt),
            email,
        });
        // password is stored in UserDB after encrypting it for security

        // Catch an error if it occurs (ie: username is not unique)
        // or else send the inserted document as json object in the response
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    } 
});

// Handling login request
app.post('/login', async (req,res) => {
    const {username,password} = req.body;

    // Try to find a user with the provided username
    // const userDoc = await User.findOne({username:username});
    const userDoc = await User.findOne({username});
    if(!userDoc){
        res.status(400).json('wrong credentials');
    }else{
        // using bcrypt compare if the provided password matches 
        // with the encrypted password stored in the db
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            // logged in - use jwt (json web token to set the token)
            jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
                if (err) throw err;

                // setting cookie with json object containing username & id
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
                });
            });
        }else{
            res.status(400).json('wrong credentials');
        }
    }
});

// Handling profile request
app.get('/profile', (req,res) => {

    // get token info from cookies and verify if user is actually logged in
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if (err) throw err;
        res.json(info);
    });
});

// Handle logout request by setting token to empty string
app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

// Handling post request when user creates and uploads a new post
// using uploadMiddleware to handle file uploads
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {token} = req.cookies;
    if (token){
        let newPath = null;

        // if a file is sent through the request 
        // => set its name with proper extention (ie: jpg, png, ...)
        if (req.file) {
            const {originalname, path} = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path+'.'+ext;
            fs.renameSync(path, newPath);
        }

        //const liked = 0; // Set default likes as 0

        // verify user is logged in correctly and create a document 
        // for the new post and insert it to Posts collection
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const {title,summary,content} = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author:info.id,
            });
            res.json(postDoc);
        });
    }else{
        res.status(400).json('Must be logged in');
    }
});

// Handling update/edit request for a post
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {

    // if a new file is uploaded, set its extention similar to when post was created
    let newPath = null;
    if (req.file) {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    // Verify user is logged in
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            const {id, title,summary,content,likes, tryLike} = req.body;
            const postDoc = await Post.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

            // verify the user can only edit their own post or they can only add a likes to other posts
            if (!isAuthor && !tryLike){
                return res.status(400).json('You are not authorized to update this post');
            }

            // Perform the update to the post document in the db
            await postDoc.updateOne({
                title,
                summary,
                content,
                likes,
                cover: newPath ? newPath : postDoc.cover,
            }); 
            res.json(postDoc);
        }); 
    }else{
        return res.status(400).json('Must be logged in');
    }
});

// Handle get all posts request sorting from recent to oldest
app.get('/post', async (req,res) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1});
    res.json(posts);
});

// Handle get all post by a specific user request
app.get('/profilepost/:id', async (req,res) => {
    // get id of user from the url param
    const {id} = req.params;
    
    // get all posts
    const posts = await Post.find({})
        .populate('author', ['username', '_id'])
        .sort({createdAt: -1});

    // only add a post to profilepost if it's author's id matches the id from url
    const profilepost = [];
    for (let i = 0; i < posts.length; i++) {
        if(posts[i].author._id == id){
            profilepost.push(posts[i]);
        }
    }
    res.json(profilepost); 
});

// Handle get request for a single post so that users can click and view more info about the post
app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username', '_id']);
    res.json(postDoc);
});

// Handle get request of a profile so that users can view profiles of other members
app.get('/profile/:id', async (req, res) => {
    const {id} = req.params;
    const userDoc = await User.findById(id);
    res.json(userDoc);
});

// same as above but for setting info to edit a users own profile
app.get('/editprofile/:id', async (req, res) => {
    const {id} = req.params;
    const userDoc = await User.findById(id);
    res.json(userDoc);
});

// Handling update/edit profile request 
app.put('/editprofile', async (req,res) => {

    const {token} = req.cookies;
    const {id, username, statusMessage, color, locatedAt, lineOfWork, email, interests, oldPswd, newPswd} = req.body;

    if(token){
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
            
            // if user wants to update their password
            // => check if they have entered their current password correctly
            const userDoc = await User.findById(id);
            const passOk = bcrypt.compareSync(oldPswd, userDoc.password);
            if (!passOk && oldPswd){
                res.status(402);
                return;
            }

            // update the User document
            try{
                await userDoc.updateOne({
                    username,
                    statusMessage,
                    color,
                    locatedAt,
                    lineOfWork,
                    email,
                    interests,
                    password: oldPswd ? bcrypt.hashSync(newPswd,salt) : userDoc.password,
                });
            }catch(e){
                res.status(401).json(e);
                return;
            }
            res.json(userDoc);
        });
    }else{
        return res.status(400).json('Must be logged in');
    }
});

app.listen(4000);
//mongo db username: softengkannika
//mongo db password: Fr8kcJ0rImzzLjQo
// mongodb+srv://softengkannika:Fr8kcJ0rImzzLjQo@cluster0.mzuk1yj.mongodb.net/?retryWrites=true&w=majority