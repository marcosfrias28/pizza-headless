export const res = (json: any, status: number, statusText: string) => {
  return new Response(JSON.stringify(json), {
    headers: {
      'content-type': 'application/json'
    },
    status,
    statusText
  })
}
