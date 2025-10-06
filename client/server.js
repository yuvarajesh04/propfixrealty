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
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )

      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      const { html, helmet } = render(url)

      // Inject helmet data into the head
      let finalHtml = template.replace(`<!--ssr-outlet-->`, html)
      
      if (helmet) {
        // Insert helmet tags before closing </head>
        finalHtml = finalHtml.replace(
          '</head>',
          `${helmet.title}${helmet.meta}${helmet.link}</head>`
        )
      }

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