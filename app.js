if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const ExpressError = require('./utils/ExpressError.js');
const app = express();
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingRouter= require('./routes/listing.js');
const reviewRouter= require('./routes/review.js');
const userRouter= require('./routes/user.js');
const dbUrl = process.env.ATLAS;

main().then((res) => {
    console.log("connection");
})
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on('error', ()=>{
    console.log('Session Store Error',err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true
    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curUser = req.user;
    next();
});

app.get("/",(req,res)=>{
  res.redirect("/listings");
})
// app.get('/demouser', async(req, res) => {
//     let fakeUser = new User({
//         email: 'abx2gmail.com',
//         username: 'abx2'
//     });
//     let newuser=await User.register(fakeUser, 'abx2');
//     res.send(newuser);
// });

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

app.all("*splat", (req, res, next) => {

    next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'somting went wrong' } = err;
    res.status(statusCode).render('error.ejs', { message });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
