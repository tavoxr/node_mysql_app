const express = require('express')

const router= express.Router()

const pool= require('../database')

const passport= require('passport')

router.get('/signup',(req,res)=>{

    res.render('auth/signup')
})

router.post('/signup',passport.authenticate('local.signup',{
            successRedirect:'/profile',
            failureRedirect: '/signup',
            failureFlash:true

    })

   





    // const {fullname, username, password  }=req.body

    // const new_user={
    //     fullname,
    //     username,
    //     password
        
    // }

    // const user= await pool.query('INSERT INTO users set ?',[new_user])

    // req.flash('success','User registered')
    // res.redirect('/links')

)

router.get('/profile',(req,res)=>{

    res.send('This is your profile')
})



module.exports= router