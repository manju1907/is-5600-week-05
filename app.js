const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')
const orders = require('./orders')


// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)
app.get('/orders', api.listOrders)
app.post('/orders/', api.createOrder)
app.put('/orders/:id', async (req, res, next) => {
  try {
    const updated = await orders.edit(req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
app.delete('/orders/:id', async (req, res, next) => {
  try {
    await orders.destroy(req.params.id)
    res.status(204).send()   // no content
  } catch (err) {
    next(err)
  }
})


// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

