import type { APIContext, APIRoute } from "astro";

export const POST : APIRoute = async (context : APIContext) => {
    return new Response(JSON.stringify({success: 'User Logout Succesfully'}), {
        status: 200,
        headers: {
            'Set-Cookie': 'access-token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
          'Content-Type': 'application/json'
        }
      });
}