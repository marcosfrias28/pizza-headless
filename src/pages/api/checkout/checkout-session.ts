import type { APIContext, APIRoute } from "astro";
import useCartStore from "../../../stores/CartStore";
import Stripe from 'stripe'

// This is your test secret API key.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const YOUR_DOMAIN = Astro.url;

export const POST: APIRoute = async (context: APIContext) => {

  const { cart } = useCartStore()
  console.log(cart);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1PbfxkBMqLLzMYdCyCqEXMoL',
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancelled`,
  })

  Response.redirect(`${YOUR_DOMAIN}/`, 303)
  return new Response(
    JSON.stringify('Succesfull'), {
    status: 303,
    statusText: 'OK',
  },
  )
}

