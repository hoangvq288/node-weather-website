const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
const partialsPath = path.join(__dirname, './templates/partials')
//Set up handlersbars engine and views locations
const viewsPath = path.join(__dirname, './templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static file
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Eric Vu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Eric Vu'
  })
})


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Eric Vu',
    message: 'Help Page'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if(error) return res.send({ error})

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) return res.send({ error })

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })

  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article cannot be found',
    name: 'Eric Vu'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: 'My 404 page',
    name: 'Eric Vu'
  })
})


app.listen(port, () => {
  console.log("Server is up on port " + port)
})

