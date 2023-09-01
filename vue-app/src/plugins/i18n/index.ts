import { createI18n } from 'vue-i18n'
import zh_TW from './locales/zh-TW.json'
import en_US from './locales/en-US.json'

const i18n = createI18n({
  legacy: false, // for composition api
  locale: 'zh-TW',
  fallbackLocale: 'en-US',
  messages: {
    'zh-TW': zh_TW,
    'en-US': en_US
  }
})

export default i18n
