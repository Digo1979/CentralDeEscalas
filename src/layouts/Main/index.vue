<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      mini-variant-width="80"
      width="250"
      app
    >
      <v-list-item class="px-2">
        <v-list-item>
          <v-img
            v-show="mini"
            contain
            max-width="80"
            max-height="50"
            src="../../../public/resources/images/log_SaaSCom_icon.png"
          />
          <v-img
            v-show="!mini"
            contain
            max-width="180"
            max-height="50"
            src="../../../public/resources/images/SaasComercial.png"
          />
        </v-list-item>
      </v-list-item>

      <v-list shaped>
        <v-list-item-group
          v-model="selectedItem"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            color="#FCD028"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            elevation="0"
            block
            color="#FCD028"
            @click.stop="mini = !mini">
            <v-icon color="#FFFFFF">{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      flat
      app>
      <v-app-bar-nav-icon @click="(drawer = !drawer) && (mini = !drawer) "/>
      <v-toolbar-title class="text-h5 font-weight-medium text-secondary d-none d-sm-block">
        Bem-vindo, {{ nomeUsuarioCapitalizado }}
      </v-toolbar-title>
      <v-toolbar-title class="text-h5 font-weight-medium text-secondary d-sm-none">
        {{ nomeUsuarioCapitalizado }}
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
        class="mr-2"
        color="#FCD028"
        fab
        elevation="0"
        dark
        small
        @click="alternaChat()">
        <v-icon dark>
          support_agent
        </v-icon>
      </v-btn>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-bind="attrs"
            :color="corUsuario"
            size="38"
            class="font-weight-bold text-h6 white--text"
            v-on="on">
            {{ nomeAbreviacao }}
          </v-avatar>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar
                  :color="corUsuario"
                  class="font-weight-bold text-h6 white--text"

                  size="38">
                  {{ nomeAbreviacao }}
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ nomeUsuarioCapitalizado }}</v-list-item-title>
                <v-list-item-subtitle>
                  Perfil {{ usuario && usuario.base && usuario.base.perfil ? usuario.base.perfil : "desconhecido" }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider/>

          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#FCD028">
                  phone
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{
                    usuario && usuario.base && usuario.base.us01_nr_ddd && usuario.base.us01_nr_tel
                      ? usuario.base.us01_nr_ddd + " " + usuario.base.us01_nr_tel
                      : "desconhecido"
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#FCD028">
                  email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{
                    usuario && usuario.base && usuario.base.us01_nm_email
                      ? usuario.base.us01_nm_email
                      : "desconhecido"
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer/>

            <v-btn
              text
              @click="menu = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="logout()"
            >
              Sair
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main
      class="blue-grey lighten-5" >
      <div class="grey lighten-5 mt-0 mb-6">
        <v-breadcrumbs
          :items="[{title: 'Home', disabled: true, url:'/home'}, ...breadcrumb]"
          class="py-2 ml-2">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item>
              <router-link
                :disabled="item.disabled"
                :event="!item.disabled ? 'click' : ''"
                :to="item.url">
                {{ item.title }}
              </router-link>
            </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import router from "@/router";
import { MovideskChat } from "@/services/movidesk";
import { reduce } from 'lodash'
import { getLeftMenuData } from '@/services/menu'

export default {
  name: 'MainLayout',
  data: function () {
    return {
      breadcrumb: [],
      drawer: true,
      movideskChat: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      usuario: null,
      corUsuario: "#fff",
      mapStatedrawer: true,
      selectedItem: 0,
      items: [
        { title: 'Empresa', icon: 'business' },
      ],
      mini: true,
    }
  },
  computed: {
    ...mapState(['settings']),
    nomeUsuarioCapitalizado: function() {
      let usuarioCaixaAlta = [""]
      if(this.usuario != null) {
        usuarioCaixaAlta = this.usuario.base.us01_nm_usr.split(' ')
      }
      let usuarioCapitalizado = ""
      usuarioCaixaAlta.forEach(nome => {
        let nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase()
        usuarioCapitalizado += (" " + nomeCapitalizado)
      })
      return usuarioCapitalizado.slice(1)
    },
    nomeAbreviacao : function () {
      let usuarioCaixaAlta = [""]
      if(this.usuario != null) {
        usuarioCaixaAlta = this.usuario.base.us01_nm_usr.split(' ')
      } else {
        return ""
      }
      let usuarioCapitalizado = ""
      usuarioCaixaAlta.forEach(nome => {
        let primeiraLetra = nome.charAt(0).toUpperCase()
        usuarioCapitalizado += primeiraLetra
      })
      return usuarioCapitalizado[0] + (usuarioCapitalizado[1] || "")
    },
  },
  watch: {
    $route(to) {
      this.breadcrumb = this.getPath(getLeftMenuData, to.path)
    },
  },
  async created() {
    this.usuario = await this.$wso2.getUserData();
    this.corUsuario = this.corPara(this.usuario.base.us01_nm_usr);

  },
  mounted() {
    this.breadcrumb = this.getPath(getLeftMenuData, this.$route.path)
  },
  methods: {
    getPath(data, url, parents = []) {
      if (url === '/') {
        url = '/dashboard/alpha'
      }
      const items = reduce(
        data,
        (result, entry) => {
          if (result.length) {
            return result
          }
          if (entry.children) {
            const nested = this.getPath(entry.children, url, [entry].concat(parents))
            return (result || []).concat(nested.filter(e => !!e))
          }
          if (entry.url === url) {
            return [entry].concat(parents)
          }
          return result
        },
        [],
      )
      this.activeItem = items[0]
      return items
    },
    alternaChat() {
      if(!this.movideskChat) {
        MovideskChat.maximize()
      } else {
        MovideskChat.minimize()
      }

      this.movideskChat = !this.movideskChat
    },
    async logout() {
      try {
        await this.$wso2.logout();
        router.push("/user/login");
      } catch (err) {
        this.$notification["error"]({
          message: "Logout",
          description: err,
        });
      }
    },
    corPara(nome) {
      let nomeMaiusculo = nome.toUpperCase().replace(/\s/g, "")
      const normalizacao = (n) => {
        return Math.floor((255 * ((n - 65) / (90 - 65))))
      }

      let rgba = `rgba(${normalizacao(nomeMaiusculo.charCodeAt(Math.floor(nomeMaiusculo.length / 2)))},
                      ${normalizacao(nomeMaiusculo.charCodeAt(0))},
                      ${normalizacao(nomeMaiusculo.charCodeAt(nomeMaiusculo.length - 1))},
                      0.8)`

      return rgba
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";

*, input, select, textarea, option, button {
    outline: none!important;
}

</style>
