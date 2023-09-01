import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  defaults: {
    global: {
      ripple: false
    },
    VBtn: {
      flat: true
    }
  }
})

export default vuetify
