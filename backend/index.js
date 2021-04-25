
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

 router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      console.log("Login: ", req.body, user, err, info);
      if (err) return next(err);
      if (user) {
          if (req.body.remember == true) {
            time_exp = "7d";
          } else time_exp = "1d";
          const token = jwt.sign(user, db.SECRET, {
            expiresIn: time_exp,
          });
          var decoded = jwt.decode(token);
          let time = new Date(decoded.exp * 1000);
          console.log(new Date(decoded.exp * 1000));
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200;
        return res.json({ user, token });
      } else return res.status(422).json(info);
    })(req, res, next);
  });

router.get('/logout', (req, res) => { 
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send('Foo');
    });

router.get('/editProfile',
    passport.authenticate('jwt', { session: false }),
     (req, res, next) => {
         res.send(req.user)
     });

router.get('/home',
    passport.authenticate('jwt', { session: false }),
     (req, res, next) => {
         res.send(req.user)
     });

//Books
const dbBook = require('./dbBook.js')
let books = dbBook.books
let infos = dbBook.infos
 
router.route('/books')
    .get((req, res) => res.json(books))
 
    .post((req, res) => {
        console.log(req.body)
        let newBook = {}
        newBook.id = (books.list.length)?books.list[books.list.length - 1].id + 1:1
        newBook.bookName = req.body.bookName
        books = { "list": [...books.list, newBook] }
        res.json(books)
    })

router.route('/books/:book_id')
    .get((req, res) => {
        let id = books.list.findIndex( (item) => (item.id === +req.params.book_id) )
        if(id == -1){
            res.send('Not Found')
        }
        res.json(books.list[id])
    })
    .put((req,res) => {
        let id = books.list.findIndex( (item) => (item.id === +req.params.book_id) )
        if(id == -1){
            res.send('Not Found')
        }
        books.list[id].bookName = req.body.bookName
        res.json(books.list)
    })
    .delete( (req, res) => {
        books.list = books.list.filter( item => item.id !== +req.params.book_id )
        let id = books.list.findIndex( (item) => (item.id === +req.params.book_id) )
        if(id == -1){
            res.send('Not Found')
        }
        res.json(books.list)
    })

router.route('/infos')
    .get((req, res) => res.json(infos))
 
    .post((req, res) => {
        console.log(req.body)
        let newInfo = {}
        newInfo.id = (infos.list.length)?infos.list[infos.list.length - 1].id + 1:1
        newInfo.name = req.body.name
        newInfo.phone = req.body.phone
        newInfo.day = req.body.day
        infos = { "list": [...infos.list, newInfo] }
        res.json(infos)
    })

router.route('/infos/:info_id')
    .get((req, res) => {
        let id = infos.list.findIndex( (item) => (item.id === +req.params.info_id) )
        if(id == -1){
            res.send('Not Found')
        }
        res.json(infos.list[id])
    })
    .put((req,res) => {
        let id = infos.list.findIndex( (item) => (item.id === +req.params.info_id) )
        if(id == -1){
            res.send('Not Found')
        }
        infos.list[id].name = req.body.name
        infos.list[id].phone = req.body.phone
        infos.list[id].day = req.body.day
        res.json(infos.list)
    })
    .delete( (req, res) => {
        infos.list = infos.list.filter( item => item.id !== +req.params.info_id )
        let id = infos.list.findIndex( (item) => (item.id === +req.params.info_id) )
        if(id == -1){
            res.send('Not Found')
        }
        res.json(infos.list)
    })

router.get('/total',
    passport.authenticate('jwt', { session: false }),
     (req, res, next) => {
         res.send(req.user)
     });
router.get('/showdata',
     passport.authenticate('jwt', { session: false }),
      (req, res, next) => {
          res.send(req.user)
      });

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))