<template>
  <div class="wrapper">
    <section class="login-content">
      <div class="container">
        <div
          class="row align-items-center justify-content-center height-self-center"
        >
          <div class="col-lg-8">
            <div class="card auth-card">
              <div class="card-body p-0">
                <div class="d-flex align-items-center auth-content">
                  <div class="col-lg-6 bg-primary content-left">
                    <div class="p-3">
                      <h2 class="mb-2 text-white">Entrar</h2>
                      <p>Faça login para permanecer conectado.</p>
                      <form @submit.prevent="login">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="floating-label form-group">
                              <input
                                v-model="username"
                                class="floating-input form-control"
                                type="email"
                                placeholder=" "
                              />
                              <label>Email</label>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="floating-label form-group">
                              <input
                                v-model="password"
                                class="floating-input form-control"
                                type="password"
                                placeholder=" "
                              />
                              <label>Senha</label>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="custom-control custom-checkbox mb-3">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck1"
                              />
                              <label
                                class="custom-control-label control-label-1 text-white"
                                for="customCheck1"
                                >Lembrar-me</label
                              >
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <a
                              href="auth-recoverpw.html"
                              class="text-white float-right"
                              >Esqueceu a senha?</a
                            >
                          </div>
                        </div>
                        <button type="submit" class="btn btn-white">
                          Entrar
                        </button>
                        <p class="mt-3">
                          Criar uma conta
                          <a
                            href="auth-sign-up.html"
                            class="text-white text-underline"
                            >inscrever-se</a
                          >
                        </p>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 content-right">
                    <img
                      src="/images/login/01.png"
                      class="img-fluid image-right"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  created() {
    if (localStorage.getItem('loggedIn')) {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    login() {
      if (
        this.username === "programador.1979@gmail.com" &&
        this.password === "password"
      ) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", this.username);
        this.$router.push("/dashboard");
      } else {
        alert("Usuário e/ou senha incorretos!");
      }
    },
  },
};
</script>
