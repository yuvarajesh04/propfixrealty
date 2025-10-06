import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*all', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'), // NOT just 'index.html'
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // Inject helmet data into the head
      const { html, helmet, initialData } = await render(url)

      let finalHtml = template.replace(`<!--ssr-outlet-->`, html)

      finalHtml = finalHtml.replace(
        '</head>',
        `
          ${helmet?.title || ''}
          ${helmet?.meta || ''}
          ${helmet?.link || ''}
          <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>
        </head>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      next(e)
    }
  })
    
  const port = 5173

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()