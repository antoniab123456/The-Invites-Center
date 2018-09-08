'use strict';

const express = require('express'),
    http = require('http'),
    WebSocketServer = require('websocket').server,
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    env = require('dotenv/config'),
    Grid = require('gridfs-stream'),
    uuidv4 = require('uuid/v4');


/* Server setup */
const app = express();

const server = http.createServer(app);

/* Websocket server setup */
const wss = new WebSocketServer({
    httpServer: server, 
    autoAcceptConnections: false
});

/* Mongoose setup */
mongoose.connect('mongodb://localhost:27017/loginapp');

/* Init all client connections */
let clients = [];
let Chat = require('./models/chat');

/* On request from the client  */
wss.on('request', (req) => {
    /* Only accept the origin */
    let conn = req.accept(null, req.origin);

    /* Assign  each socket an id and push it into clients*/
    let socket = {
        conn: conn,
        socket_id: uuidv4()
    }

    clients.push(socket) - 1;
            
    /* Send the socket id to the client  */
    conn.sendUTF(JSON.stringify({init_socket: socket.socket_id}));

    conn.on('message', (message) => {
        if(message.type == 'utf8'){
            let data = JSON.parse(message.utf8Data)
        /* Receive the user id sent from the client, and add it to the client obj */
            if(data.socket_user_id){
                socket.socket_user_id = data.socket_user_id;
            } else{ 
                /* Receive the messages a client sends and write to the db */
                let msg = JSON.parse(message.utf8Data);
                let chat = new Chat({
                    conversation: msg.convo_id,
                    content: msg.message,
                    time: {
                        hours: msg.hours,
                        mins: msg.mins,
                        date: msg.date, 
                        month: msg.month,
                        year: msg.year
                    },
                    createdBy: msg.createdBy,
                    createdFor: msg.receiver
                });

                chat.save((err, chat) => {
                    if(err) throw err;
                    clients.forEach(client => {
                        /* If the client is the receiver or/and the sender, send the message back to the client*/
                        if(client.socket_user_id == msg.receiver){
                            client.conn.sendUTF(JSON.stringify({chat: chat, who: 'receiver'}));
                        } else {
                            if(client.socket_user_id == msg.sender.user_id){
                                client.conn.sendUTF(JSON.stringify({chat: chat, who: 'sender'}));
                            }
                        }
                    })
                });
            }    
        }
    });

    /* On connection close, delete the client from clients */
    conn.on('close', () => {
        console.log(`disconnected`)
        clients.splice(socket, 1);
    });
});


server.listen(4000, function(){
    console.log(`Server started on port port 4000 on ${new Date}`);
});

/* Gfs setup */
new Promise((resolve, reject) => {

    mongoose.connection.on('error', () => {
        console.error.bind(console, 'connection error:')
    });

    mongoose.connection.once('open', () => {
        let gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        resolve(gfs);
    });
})
.then((gfs) => {
    module.exports.getFile = (q, cb) =>{
        gfs.files.findOne(q, cb);
    }
    module.exports.removeFile = (q, cb) =>{
        gfs.files.remove(q, cb);
    }
    module.exports.readStream = (file, res) =>{
        let readstream = gfs.createReadStream(file);
        readstream.pipe(res);
    }
});

mongoose.set('debug', true);

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

/* Cookie Parser */
app.use(cookieParser());

/* BodyParser Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


/* Set favicon*/
app.use(favicon(__dirname + '/public/images/favicon.ico'));


/* Set Static Folder */
// app.use(express.static('/users', path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


/*  Passport init */
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/*  Global Vars */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


const routes = require('./routes/index');
const users = require('./routes/users');
const notfound = require('./routes/notfound');

app.use('/', routes);
app.use('/users', users);
app.use('/*', notfound);


/* Enable CORS from client-side */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.end();
});



