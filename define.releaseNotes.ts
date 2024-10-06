
import { Plugin } from 'vite'
import fs from 'fs/promises';


type ReleaseNote = {
  id: string
  ru?: string
  en?: string
}

export const releaseNotes: ReleaseNote[] = [
  {
    id: '2024-10-06',
    ru: `Добавлены уведомления о новых релизах`,
  }
]

export function releaseNotesPlugin(): Plugin {
  return {
    name: 'release-notes-plugin',
    async generateBundle() {
      await fs.writeFile('dist/release-notes.json', JSON.stringify(releaseNotes))
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/release-notes.json') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(releaseNotes))
          return
        }
        next()
      })
    }
  };
}