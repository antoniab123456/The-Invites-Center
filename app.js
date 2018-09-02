const express = require('express');
    http = require('http'),
    WebSocketServer = require('websocket').server,
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    env = require('dotenv/config'),
    Grid = require('gridfs-stream');

/* Server setup */
const app = express();

const server = http.createServer(app);

/* Websocket server setup */
const wss = new WebSocketServer({httpServer: server});

wss.on('request', (req) => {
    console.log(`The user connected ${req.origin}`);
    let conn = req.accept(null, req.origin);
    conn.on('message', (message) => {
        //reecive json data 
        console.log(message.utf8Data);
        // sending back json data
        conn.sendUTF(JSON.stringify('test'));
        if(message.type === 'utf-8'){
        }
        conn.on('close', (conn) => {
            console.log(`disconnected`)
        });
    });
});


server.listen(4000, function(){
    console.log(`Server started on port port 4000 on ${new Date}`);
});



/* Mongoose setup */
mongoose.connect('mongodb://localhost:27017/loginapp');

/* Gfs setup */
new Promise((resolve, reject) => {
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

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

//Cookie Parser
app.use(cookieParser());
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Set favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));


// Set Static Folder
// app.use(express.static('/users', path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
    errorFormatter:(param, msg, value) => {
        const namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


app.use(flash());

// Global Vars
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


// Enable CORS from client-side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.end();
});