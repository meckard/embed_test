import React, { useEffect, useState } from 'react'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY')

export default function TrialForm() {
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('https://localhost:3003/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      setClientSecret(data.clientSecret)
    }

    fetchSession()
  }, [])

  const appearance = { theme: 'stripe' }
  const options = { clientSecret, appearance }

  if (!clientSecret) return <div>Loading Checkout...</div>

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}