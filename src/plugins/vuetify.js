import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {pt} from 'vuetify/lib/locale'
import "vuetify/dist/vuetify.min.css";


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
})
