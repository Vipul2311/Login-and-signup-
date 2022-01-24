const express = require('express');
const authController = require('../controllers/auth');


const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    res.render('index', {
      user: req.user
    });
  });

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    if(req.user) {
      res.render('profile', {
        user: req.user
      });
    } else {
      res.redirect("/Login");
    }
    
  });


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/Login', (req, res) => {
    res.render('Login');
});


 

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;