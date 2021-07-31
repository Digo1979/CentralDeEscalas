<template>
  <v-app>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Central de Plantões</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="wrap">
              <div
                class="img"
                style="background-image: url(images/bg-2.jpg);"/>
              <div class="login-wrap p-4 p-md-5">

                <form
                  action="#"
                  class="signin-form">
                  <div class="form-group mt-3">
                    <input
                      type="text"
                      class="form-control"
                      required>
                    <label
                      class="form-control-placeholder"
                      for="username">Usuário</label>
                  </div>
                  <div class="form-group">
                    <input
                      id="password-field"
                      type="password"
                      class="form-control"
                      required>
                    <label
                      class="form-control-placeholder"
                      for="password">Senha</label>
                    <span
                      toggle="#password-field"
                      class="fa fa-fw fa-eye field-icon toggle-password"/>
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      class="form-control btn btn-primary rounded submit px-3">Acessar</button>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                      <label class="checkbox-wrap checkbox-primary mb-0">Lembrar-me
                        <input
                          type="checkbox"
                          checked>
                        <span class="checkmark"/>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </v-app>
</template>

<script>
import {version} from '../../../../package.json'
export default {

  data: function () {
    return {
      version,
      mostrarSenha: false,
      loginForm: {
        usuario: "",
        senha: "",
      },
    }
  },
  async mounted() {
    this.version = this.version.replace("-SNAPSHOT", "")
  },
  methods: {
    async servicoLogar() {
      const loader = this.$loading.show()
      try {
        await this.$wso2.login(this.loginForm.usuario, this.loginForm.senha)
        this.$router.push("/")
      } catch (error) {
        console.log(error)
        this.exibeConsulta = false
        let description = 'Problema para realizar a autenticação'

        if (error.response.status == 400){
          description = 'Usuário ou Senha incorreto(s)'
        }
        this.$notification['error']({
          message: 'Login',
          description: description ,
        })
      }
      finally {
        loader.hide()
      }
    },
  },
}
</script>

<style lang="scss" module>
  // @import "./style.module.scss";
  @import "./style.css";
</style>

<style scoped>
.no-autofill >>> input:-webkit-autofill,
.no-autofill >>> input:-webkit-autofill:hover,
.no-autofill >>> input:-webkit-autofill:focus {
  -webkit-text-fill-color: #fff;
  -webkit-box-shadow: 0 0 0px 1000px #ffc800 inset !important;
  box-shadow: 0 0 0px 1000px #ffc800 inset !important;
}

</style>
