const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')


mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true ,  useUnifiedTopology: true  }).
  catch(error => console.log(error) );

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false}))

app.get('/', async (req, res) =>{
    try{
        const shortUrls = await ShortUrl.find()
        res.render('index', {shortUrls:shortUrls})
    }catch(error){
        Console.log('that was wrong')
        throw error
    }
   
    
})

app.post('/shortUrls', async (req, res) =>{
    try{
        await ShortUrl.create({full:req.body.fullurl})
        res.redirect('/')
    }catch(error){
        Console.log('that was horribly wrong')
        throw error
    }
   

})
app.get('/:shortUrl', async (req,res) =>{
    const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)

})


const port = process.env.PORT || 4000
app.listen(port, console.log(`server is running at ${port}`))