import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// Serves api/ai.ts during `npm run dev`; Vercel serves it in production.
const devApi = (): Plugin => ({
  name: 'dev-api',
  apply: 'serve',
  configureServer(server) {
    const key = loadEnv(server.config.mode, __dirname, '').GEMINI_API_KEY
    if (key) process.env.GEMINI_API_KEY ||= key
    server.middlewares.use('/api/ai', async (req, res, next) => {
      if (req.method !== 'POST') return next()
      try {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk)
        const { POST } = await server.ssrLoadModule('/api/ai.ts')
        const response: Response = await POST(
          new Request('http://localhost/api/ai', {
            method: 'POST',
            headers: { authorization: req.headers.authorization ?? '' },
            body: Buffer.concat(chunks).toString(),
          }),
        )
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      } catch (error) {
        next(error)
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(), devApi()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
