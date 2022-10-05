import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExternalLink, faCaretDown, faFilter, faArrowRotateRight, faChevronDown, faThumbsUp, faThumbsDown, faBookmark } from '@fortawesome/free-solid-svg-icons'
library.add(faExternalLink, faCaretDown, faArrowRotateRight, faFilter, faChevronDown, faThumbsUp, faThumbsDown, faBookmark)

import './assets/main.scss'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
