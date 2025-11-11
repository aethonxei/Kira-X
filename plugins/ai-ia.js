import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Your name is ${botname} and appears to have been created by ${etiqueta}. Your current version is ${vs}, You use the English language. You will call people by their name ${username}, You like to be strict, and you hate talking too much. Most importantly, you should be quick with the person you're talking to. ${username}`
if (isQuotedImage) {
const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error(`${msm} Error: No image buffer available`)
return conn.reply(m.chat, '✘ ChatGpT was unable to download the image.', m)}
const content = `${emoji} What can be observed in the image?`
try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = `${emoji} Describe the image and explain why they are acting this way. Also, tell me who you are.`
const prompt = `${basePrompt}. The image being analyzed is: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT was unable to analyze the image.', m)}
} else {
if (!text) { return conn.reply(m.chat, `${emoji} Submit a request for ChatGpT to respond to.`, m)}
await m.react(rwait)
try {
const { key } = await conn.sendMessage(m.chat, {text: `${emoji2} ChatGPT is processing your request, please wait a few seconds.`}, {quoted: m})
const query = text
const prompt = `${basePrompt}. Answer the following: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.sendMessage(m.chat, {text: response, edit: key})
await m.react(done)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT cannot answer that question.', m)}}}

handler.help = ['ai', 'chatgpt', 'gpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ai', 'chatgpt', 'luminai', 'gpt']
handler.group = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Function to send an image and obtain the analysis
async function fetchImageBuffer(content, imageBuffer) {
try {
const response = await axios.post('https://Luminai.my.id', {
content: content,
imageBuffer: imageBuffer 
}, {
headers: {
'Content-Type': 'application/json' 
}})
return response.data
} catch (error) {
console.error('Error:', error)
throw error }}
// Function to interact with AI using prompts
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://Luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: false
})
return response.data.result
} catch (error) {
console.error(`${msm} Error obtaining:`, error)
throw error }}
