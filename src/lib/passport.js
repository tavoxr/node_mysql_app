const passport=require('passport')
const localStrategy=require('passport-local').Strategy

const pool= require('../database')

const helpers= require('../lib/helpers')

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

},async(req,username,password,done)=>{

    const {fullname}=req.body
    
    const new_user={
        username,
        password,
        fullname    
    }
    new_user.password = await helpers.encryptPassword(password)

  

    const result= await pool.query('INSERT INTO users set ?', [new_user])

    new_user.id = result.insertId

   return  done(null, new_user)


}))

passport.serializeUser((user,done)=>{


    done(null,user.id)


})



passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id=?',[id])
    done(null,rows[0])
})
