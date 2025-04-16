const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY')

const app = express()
app.use(cors({ origin: 'https://localhost:3000', credentials: true }))
app.use(express.json())

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    mode: 'payment',
    line_items: [
      {
        price: 'price_1R6hzdB3ds8m2oajdcxAhxTH',
        quantity: 1,
      },
    ],
    return_url: 'https://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}',
  })

  res.send({ clientSecret: session.client_secret })
})

app.listen(3003, () => console.log('Server running on https://localhost:3003'))