export async function POST(req: Request) {
  const data = await req.json()

  const message = `
  Бро, заявочка 🚀 подлетела:
  Имя: ${data.name}
  Телефон: ${data.phone}
  `

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!

  const send = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    }
  )

  if (!send.ok) {
    return new Response("Ошибка отправки", { status: 500 })
  }

  return new Response("OK", { status: 200 })
}
