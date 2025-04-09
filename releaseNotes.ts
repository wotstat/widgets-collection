import { Plugin } from 'vite'
import fs from 'fs/promises';

namespace Utils {

  const OPEN_SETTINGS = 'WOTSTAT_WIDGETS_EVENT_NEWS_OPEN_SETTINGS'
  const ADD_WIDGET = 'WOTSTAT_WIDGETS_EVENT_NEWS_ADD_WIDGET:'
  const OPEN_URL = 'WOTSTAT_WIDGETS_EVENT_NEWS_OPEN_URL:'

  export function redString(str: string) {
    return colorString("#ff453a", str)
  }

  export function greenString(str: string) {
    return colorString("#30d158", str)
  }

  export function orangeString(str: string) {
    return colorString("#ff9f0a", str)
  }

  export function colorString(color: string, str: string) {
    return `<font color='${color}'>${str}</font>`
  }

  export function boldString(str: string) {
    return `<b>${str}</b>`
  }

  export function italicString(str: string) {
    return `<i>${str}</i>`
  }

  export function openSettings(str: string, bold: boolean = true) {
    return eventString(OPEN_SETTINGS, str, bold)
  }

  export function addWidget(widgetUrl: string, str: string, bold: boolean = true) {
    return eventString(ADD_WIDGET + widgetUrl, str, bold)
  }

  export function openUrl(url: string, str: string, bold: boolean = true) {
    return eventString(OPEN_URL + url, str, bold)
  }

  export function eventString(event: string, text: string, bold: boolean = true) {
    const target = `<a href='event:${event}'>${text}</a>`
    return bold ? boldString(target) : target
  }

}

type ReleaseNote = {
  id: string
  ru?: string
  en?: string
}

export const releaseNotes: ReleaseNote[] = [
  {
    id: 'init-demo-1',
    ru: 'test'
  },
  {
    id: 'init-demo-2',
    ru: `• Тестовое уведомление
• Пример ${Utils.redString('красного цвета')}
• Пример ${Utils.greenString('зелёного цвета')}
• Пример ${Utils.orangeString('оранжевого цвета')}
• Пример ${Utils.boldString('жирного текста')}
• Пример ${Utils.italicString('курсивного текста')}
• Пример ${Utils.openSettings('открытия настроек')}
• Пример ${Utils.addWidget('https://widgets.wotstat.info/nidin/equipments?show-tank-name=true&variant=compact&hd=true', 'добавления виджета')}
• Пример ${Utils.openUrl('https://wotstat.info', 'открытия ссылки')}
• Пример ${Utils.redString(Utils.boldString('жирного красного текста'))}
• Пример ${Utils.greenString(Utils.italicString('курсивного зелёного текста'))}`
  },
  {
    id: '2024-10-20-nidin-equipments',
    ru: `• В виджет ${Utils.addWidget('https://widgets.wotstat.info/nidin/equipments?show-tank-name=false&variant=compact&hd=true&post-progression=true&post-progression-current=true', 'Оборудование от __NIDIN__')} добавлено отображение рекомендуемой полевой модернизации
• Добавлен виджет ${Utils.addWidget('https://widgets.wotstat.info/efficiency/stats?accent=f044fcff&solo-align=left&anim=false&slots=assist-track,assist-radio,fire-dmg,ammo-bay-destroyed-dmg,ram-dmg,discover', 'Расширенная эффективность')}. Сконфигурируйте под себя до 8 параметров из 18 доступных`
  },
  {
    id: '2024-11-05-rtk',
    ru: `• Добавлен виджет ${Utils.addWidget('https://widgets.wotstat.info/tournament/rtk/random?accent=36ff46ff&background=242424ff&hideL1=false&hideL2=false&hideL3=false', 'Игровой Вызов')} для отображения позиции в турнире Игровой`
  },
  {
    id: '2024-11-16-rtk',
    ru: `• Новый ${Utils.addWidget('https://widgets.wotstat.info/tournament/rtk/random?skin=transparent&accent=7aff8cff', 'прозрачный')} стиль для виджета турнира Игровой Вызов`
  },
  {
    id: '2024-12-08-ny',
    ru: `• Новый виджет ${Utils.addWidget('https://widgets.wotstat.info/hangar/lootbox-lesta-ny25?sync=true', 'статистика новогодних коробок')} для Лесты. На версии wotstat.widgets ${Utils.openUrl('https://github.com/wotstat/wotstat-widgets/releases/tag/2.0.0', '2.0.0')} и новее его можно поместить поверх интерфейса открытия коробок`
  },
  {
    id: '2024-12-13-universal-transparent',
    ru: `• Новый прозрачный стиль виджета ${Utils.openUrl('https://wotstat.info/session/widgets/competitive/universal', 'универсальная прогрессия')}. ${Utils.italicString('Напоминание: виджет адаптирован как для взводной игры так и для одиночной')}
• В виджет ${Utils.addWidget('https://widgets.wotstat.info/hangar/lootbox-lesta-ny25?sync=true', 'статистика новогодних коробок')} добавлена задержка на обновление статистики, чтоб не отображать результаты раньше завершения анимации открытия.`
  },
  {
    id: '2024-12-17-comp7',
    ru: `• Новый виджет ${Utils.openUrl('https://wotstat.info/session/widgets/efficiency/comp7', 'прогрессия Натиска')} для Лесты. Отображает текущий ранг и результаты нескольких прошлых боёв. Есть два стиля.`
  },
  {
    id: '2025-03-31-bongo',
    ru: `• Новый виджет ${Utils.addWidget('https://widgets.wotstat.info/meme/bongo-cat', 'Bongo Cat')}. Поселите в ангар милого котика!`
  },
  {
    id: '2025-04-05-reduction',
    ru: `• Новый виджет ${Utils.openUrl('https://wotstat.info/widgets/shooting/reduction-info', 'Индикатор сведения')}. Шесть стилей, с прогресс-баром, просто числом или графиком за 30 секунд.`
  },
  {
    id: '2025-04-08-lootbox',
    ru: `• Новый виджет ${Utils.addWidget('https://widgets.wotstat.info/hangar/lootbox-universal?sync=true&delay=long', 'Статистика коробок')}. Поддерживает все виды контейнеров и анти-спойлер систему при которой статистика отображается с небольшой задержкой.`
  },
  {
    id: '2025-04-09-lootbox',
    ru: `• В виджет ${Utils.addWidget('https://widgets.wotstat.info/hangar/lootbox-universal?sync=true&delay=long', 'Статистика коробок')} добавлен счётчик учебных пособий и расходников (огнетушитель, аптечка, ремкомплект).`
  },
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