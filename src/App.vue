<template>
  <div id="app">
    <div
      v-if="showOfflineBanner"
      :style="{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 99999,
        width: '350px',
        height: '150px',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        backgroundColor: '#333'
      }"
    >
      <div
        :style="{ margin: '10px' }"
        class="row"
      >
        <img
          :style="{
            width: '36px',
            margin: '10px'
          }"
          src="favicon.png"
          alt="Logo"
        >
        <h3 :style="{ color: 'white', margin: '15px' }">
          SaaSCom
        </h3>
        <p :style="{ color: 'white', margin: '0 0 0 50px' }">
          Você está offline no momento
        </p>
      </div>
      <div
        :style="{
          color: '#c09c50',
          borderRadius: '4px',
          border: '1px solid #c09c50',
          padding: '2px',
          marginLeft: '20px',
          marginRight: '20px',
          textAlign: 'center',
          cursor: 'pointer'
        }"
        @click.prevent="showOfflineBanner = false"
      >
        Fechar
      </div>
    </div>
    <router-view />
    <div
      v-if="showInstallBanner"
      :style="{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 99999,
        width: '350px',
        height: '150px',
        boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        backgroundColor: '#333'
      }"
    >
      <div>
        <div
          :style="{ margin: '10px' }"
          class="row"
        >
          <img
            :style="{
              width: '36px',
              margin: '10px'
            }"
            src="favicon.png"
            alt="Logo"
          >
          <h3 :style="{ color: 'white', margin: '15px' }">
            SaaSCom
          </h3>
          <p :style="{ color: 'white', margin: '0 0 0 50px' }">
            Deseja adicionar em sua tela inicial?
          </p>
        </div>
      </div>
      <div
        :style="{ margin: '10px 0 0 50px', fontSize: '18px' }"
        class="row"
      >
        <div
          :style="{
            color: '#FFC300',
            borderRadius: '4px',
            border: '1px solid #c09c50',
            padding: '2px',
            marginLeft: '20px',
            cursor: 'pointer'
          }"
          @click.prevent="cancel"
        >
          Cancelar
        </div>
        <div
          :style="{
            color: '#fff',
            borderRadius: '4px',
            backgroundColor: '#FFC300',
            padding: '2px',
            marginLeft: '10px',
            cursor: 'pointer'
          }"
          @click.prevent="install"
        >
          Adicionar
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let installEvent
export default {
  name: 'App',
  data() {
    return {
      showInstallBanner: false,
      showOfflineBanner: false,
    }
  },
  computed: {
    nextRoute() {
      return this.$route.query.redirect || '/'
    },
  },
  watch: {
    user(auth) {
      if (auth) {
        this.$router.replace(this.nextRoute)
      }
    },
    '$route'(to) {
      const query = Object.assign({}, to.query)
      this.$store.commit('SETUP_URL_SETTINGS', query)
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      installEvent = e
      this.showInstallBanner = true
    })
    window.addEventListener('message', msg => {
      if (msg.data.action == 'notifyOffline') {
        this.showOfflineBanner = true
      }
    })
  },
  methods: {
    install() {
      this.showInstallBanner = false
      installEvent.prompt()
      installEvent.userChoice.then(() => {
        installEvent = null
      })
    },
    cancel() {
      this.showInstallBanner = false
    },
  },

}
</script>
<style>
@import "../node_modules/alertifyjs/build/css/alertify.min.css";
@import "../node_modules/alertifyjs/build/css/themes/default.min.css";
.alert {
  margin: 1px;
}

.column-picker {
  columns: 2;
  padding: 12px;
  margin-left: 12px;
  margin-top: 26px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.column-picker-icon {
  cursor: pointer;
  color: #529CC4;
  margin: 3px;
}
</style>
