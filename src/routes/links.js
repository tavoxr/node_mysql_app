const express = require('express')

const router= express.Router()

const pool = require('../database')


router.get('/add',(req,res)=>{

    res.render('links/add')

})

router.post('/add',async (req,res)=>{

    const {title,url, description } = req.body
    const new_link = {
        title,
        url,
        description
    }
   await pool.query('INSERT INTO links set ?', [new_link])

   req.flash('success', 'Link saved successfuly')
    console.log(new_link)

    res.redirect('/links')
})

router.get('/',async(req,res)=>{

    const links = await pool.query('SELECT * FROM links')

    
    res.render('links/list',{links: links})
    
    // console.log(links)

})

router.get('/delete/:id',async(req,res)=>{

        const {id}= req.params
         await pool.query('DELETE FROM links WHERE id=?',[id])
    
        req.flash('success','Link Removed successfully')
        
        res.redirect('/links')
        res.send('Deleted')

})

router.get('/edit/:id',async(req,res)=>{

    const {id}= req.params

    const link = await pool.query('SELECT * FROM links WHERE id=?',[id])


    // console.log(link[0])
    res.render('links/edit',{link: link[0]})
   
    // res.send('Editado')


})

router.post('/edit/:id',async(req,res)=>{

    const {id} = req.params
    const {title, url, description}= req.body
    const new_link={
        title,
        url,
        description
    }
    

    const update_link= await  pool.query('UPDATE links set ? WHERE id=?',[new_link, id])

    req.flash('success','Link Updated successfully')

    res.redirect('/links')



})









module.exports= router



