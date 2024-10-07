import { Plugin } from 'vite'
import fs from 'fs/promises';


type ReleaseNote = {
  id: string
  ru?: string
  en?: string
}

export const releaseNotes: ReleaseNote[] = [
  {
    id: '2024-10-05',
    ru: `• Тестовое уведомление`,
  },
  {
    id: '2024-10-06',
    ru: `• В виджет "Оборудование от __NIDIN__" добавлен раздел с <b>полевой модернизацией</b>\n• И ещё одна строчка`,
    en: `• Added section with <b>field modernization</b> to the "Equipment by __NIDIN__" widget\n• And one more line`,
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