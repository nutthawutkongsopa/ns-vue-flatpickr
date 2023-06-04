import { createApp } from 'vue'
import App from './App.vue'
import 'ns-flatpickr/dist/flatpickr.css'
import "ns-flatpickr/dist/l10n/th"

import flatpickr from 'ns-flatpickr'

flatpickr.setDefaults({ dateFormat: "d/m/Y" })

createApp(App).mount('#app')
