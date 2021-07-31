import Vue from 'vue'
import VuePageTitle from 'vue-page-title'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'vue-nprogress'
import wso2 from "@saastec/saastec-wso2-service";
import './registerServiceWorker'
import './global.scss'
import moment from 'moment';
import VueCurrencyFilter from 'vue-currency-filter';
import VueI18n from 'vue-i18n'
import messages from './layouts/locales/messages.js'
import VueCurrencyInput from 'vue-currency-input'
import {
  Avatar, TreeSelect, Rate, Breadcrumb, InputNumber, Steps, Message,
  Upload, Button, Layout, Table, Icon, Progress, Radio, Dropdown, Menu,
  Carousel, Input, Calendar, Badge, Slider, Form, Tooltip, Select, Switch,
  Tag, Affix, Spin, Alert, Checkbox, Tabs, Pagination, notification, Drawer,
  List, Popconfirm, Divider, Card, AutoComplete, Collapse, Row, Col, Modal,
} from 'ant-design-vue'
import 'ant-design-vue/lib/button/style'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import vueScreenSize from 'vue-screen-size'
// import './plugins/corporativo'
import "./plugins/vuetify-money"
import vuetify from'./plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
const pluginOptions = {
  globalOptions: { currency: 'BRL'},
}

Vue.use(vueScreenSize)

Vue.use(Loading, {
  container: null,
  canCancel: false,
  loader: 'bars',
  width: 100,
  height: 100,
  color: '#529CC4',
})

Vue.use(AutoComplete)
Vue.use(VueI18n)
Vue.use(Modal)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(List)
Vue.use(Popconfirm)
Vue.use(Collapse)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Button)
Vue.use(Rate)
Vue.use(TreeSelect)
Vue.use(Breadcrumb)
Vue.use(Layout)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Carousel)
Vue.use(Input)
Vue.use(Calendar)
Vue.use(Badge)
Vue.use(Slider)
Vue.use(Form)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Affix)
Vue.use(Spin)
Vue.use(Alert)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Message)
Vue.use(Steps)
Vue.use(InputNumber)
Vue.use(Drawer)
Vue.use(Switch)
Vue.use(notification)
Vue.use(NProgress)

Vue.use(wso2, {
  router: router,
  tokenEndpoint: process.env.VUE_APP_TOKEN_ENDPOINT,
  serviceUrl: process.env.VUE_APP_SERVICE_URL,
  criptoUrl: process.env.VUE_APP_CRIPTO_URL,
  token: process.env.VUE_APP_TOKEN_AUTH,
  mode: process.env.NODE_ENV,
  app: process.env.VUE_APP_CD_SIST,
});

Vue.use(VuePageTitle, {
  prefix: 'SaaSTec SaaSCom | ',
  router,
})

Vue.prototype.$notification = notification

Vue.config.productionTip = false
const nprogress = new NProgress({ parent: 'body' })
const i18n = new VueI18n({
  locale: 'pt_BR', // set locale
  fallbackLocale: 'pt_BR',
  messages,
})

/**
 * Horário
 */
moment.locale('pt-BR');
Vue.filter('formatDateHour', function (value) {
  if (value) {
    return moment(String(value)).format('H:mm');
  }
});

/**
 * Configuração de moedas
 */
Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
});

new Vue({
  router,
  store,
  i18n,
  nprogress,
  vuetify,
  render: h => h(App),
}).$mount('#app')
