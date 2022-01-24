const mysql = require("mysql");
const express = require("express");
var router = express.Router();
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');



exports.signup = (req, res) => {
    console.log(req.body);


    const { Name, MobileNumber, Emailid, Password, Age, Address, gender } = req.body;

    db.query('SELECT Emailid from user WHERE Emailid= ?', [Emailid], (error, results) =>{
        if(error) {
            console.log(error);
        }

        if( results.length > 0 ){
            return res.render('signup', {
                message: 'That email is already in use'
            })
        } else if( Password !== Password) {
            return res.render('signup', {
                message: 'password do  not match'
            });
        }

        db.query('INSERT INTO user SET ?', { Name: Name, MobileNumber: MobileNumber, Emailid: Emailid,  Password: Password, Age: Age, Address:
             Address, gender: gender  }, (error, results) => {
             if(error) {
                 console.log(error);
             } else {
                 console.log(results);
                return res.render('signup', {
                    message: 'user registered'
                });   
             }
             })

    });


   }
   exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        console.log("decoded");
        console.log(decoded);
  
        // 2) Check if user still exists
        db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          console.log(result)
          if(!result) {
            return next();
          }
          // THERE IS A LOGGED IN USER
          req.user = result[0];
          // res.locals.user = result[0];
          console.log("next")
          return next();
        });
      } catch (err) {
        return next();
      }
    } else {
      next();
    }
  };

   exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).redirect("/");
  };

