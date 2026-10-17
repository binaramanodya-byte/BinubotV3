const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const pino = require('pino')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function startPair() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ logger: pino({ level: 'silent' }), auth: state, browser: ['King Binu Boy','Chrome','1.0'] })
    sock.ev.on('creds.update', saveCreds)
    if (!sock.authState.creds.registered) {
        console.log('👑 King Binu Boy Pairing 👑')
        let number = await question('Number (9477...): ')
        number = number.replace(/[^0-9]/g, '')
        const code = await sock.requestPairingCode(number)
        console.log(`\n👑 PAIRING CODE: ${code} - BinubotV2 ✨\n`)
    }
    sock.ev.on('connection.update', ({ connection }) => {
        if (connection === 'open') { console.log('✅ Connected!'); rl.close() }
    })
}
startPair()
