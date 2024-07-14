import type { APIContext, APIRoute } from "astro";
import Stripe from 'stripe'
import useCartStore from "../../../hooks/useCartStore";

// This is your test secret API key.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export const POST: APIRoute = async (context: APIContext) => {
 console.log(context.request.url);
 
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
    success_url: `/success`,
    cancel_url: `/cancelled`,
  })

  Response.redirect(`/`, 303)
  return new Response(
    JSON.stringify('Succesfull'), {
    status: 303,
    statusText: 'OK',
  },
  )
}

