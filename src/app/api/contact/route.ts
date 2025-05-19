export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Проверка honeypot и токена
    if (
      data.hiddenField ||
      typeof data.token !== "string" ||
      data.token.length < 6
    ) {
      return new Response("Bot detected or invalid token", { status: 400 })
    }

    // Проверка имени
    if (typeof data.name !== "string" || data.name.trim().length < 2) {
      return new Response("Invalid name", { status: 400 })
    }

    // Проверка телефона
    if (
      typeof data.phone !== "string" ||
      !data.phone.startsWith("+7") ||
      data.phone.replace(/\D/g, "").length !== 11
    ) {
      return new Response("Invalid phone", { status: 400 })
    }

    const message = `
Бро, заявочка 🚀 подлетела:
Имя: ${data.name}
Телефон: ${data.phone}
`

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!

    const telegramRes = await fetch(
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

    if (!telegramRes.ok) {
      console.error("Ошибка Telegram API", await telegramRes.text())
      return new Response("Ошибка отправки", { status: 500 })
    }

    return new Response("OK", { status: 200 })
  } catch (error) {
    console.error("Ошибка сервера:", error)
    return new Response("Ошибка сервера", { status: 500 })
  }
}
