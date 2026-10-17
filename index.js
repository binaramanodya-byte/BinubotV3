const makeWASocket = require("@whiskeysockets/baileys").default
const { useMultiFileAuthState } = require("@whiskeysockets/baileys")
const P = require("pino")

const BOT_NAME = "BinubotV3 ✨"

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const sock = makeWASocket({ logger: P({ level: "silent" }), auth: state, browser: ['King Binu Boy','Chrome','1.0'] })
  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (u) => { 
    if(u.connection === "open") { 
      console.log(`✅ ${BOT_NAME} Connected! 👑`) 
    } 
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
    const jid = msg.key.remoteJid
    const lower = text.toLowerCase()

    if (lower === ".menu" || lower === ".hi" || lower === ".king") {
      await sock.sendMessage(jid, { text: `👑 *${BOT_NAME}* 👑\n✨🥹 MD Version 2 ✨\n\n*Commands:*\n🎵 *.song [name]*\n🎥 *.tiktok [link]*\n_© Powered by King Binu Boy_ 👑` })
    }
  })
}
startBot()
